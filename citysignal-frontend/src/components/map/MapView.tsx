'use client';

import { useEffect, useRef, useCallback } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { Report } from '@/lib/types';
import { categoryColors, getCategoryById } from '@/lib/categories';
import { useLocale } from '@/hooks/useLocale';
import styles from './MapView.module.css';

const ARGO_MAPS_KEY = 'argo_live_x1li5q_pk_64';
const ARGO_STYLE_URL = `https://argo-maps.vercel.app/style.json?key=${ARGO_MAPS_KEY}`;

const REPORTS_SOURCE = 'reports-source';
const REPORTS_CIRCLE_LAYER = 'reports-circles';
const REPORTS_GLOW_LAYER = 'reports-glow';
const SELECTED_SOURCE = 'selected-source';
const SELECTED_CIRCLE_LAYER = 'selected-circle';
const SELECTED_PULSE_LAYER = 'selected-pulse';

interface MapViewProps {
  reports?: Report[];
  center?: [number, number];
  zoom?: number;
  onMarkerClick?: (report: Report) => void;
  interactive?: boolean;
  onMapClick?: (lat: number, lng: number) => void;
  selectedPosition?: [number, number] | null;
  selectionMode?: boolean;
  onMapMove?: (lat: number, lng: number) => void;
  height?: string;
  className?: string;
}

/**
 * Build a color match expression for MapLibre based on category colors.
 * Maps report categoryId -> hex color. Falls back to gray.
 */
function buildColorExpression(): any {
  const stops: (string)[] = [];
  for (const [catId, color] of Object.entries(categoryColors)) {
    stops.push(catId, color);
  }
  return ['match', ['get', 'categoryId'], ...stops, '#6B7280'] as any;
}

/**
 * Convert reports to GeoJSON FeatureCollection
 */
function reportsToGeoJSON(reports: Report[]): GeoJSON.FeatureCollection {
  return {
    type: 'FeatureCollection',
    features: reports.map((r) => ({
      type: 'Feature' as const,
      geometry: { type: 'Point' as const, coordinates: [r.longitude, r.latitude] },
      properties: {
        id: r.id,
        categoryId: r.categoryId,
        trackingId: r.trackingId,
        address: r.address || '',
        status: r.status,
        description: r.description?.substring(0, 100) || '',
      },
    })),
  };
}

/**
 * Apply dark theme to the Argo Maps base style layers
 */
function applyDarkTheme(map: maplibregl.Map) {
  const style = map.getStyle();
  if (!style?.layers) return;

  // Warm, visible amber/stone dark theme
  for (const layer of style.layers) {
    try {
      switch (layer.type) {
        case 'background':
          map.setPaintProperty(layer.id, 'background-color', '#1c1917');
          break;
        case 'fill':
          if (layer.id.includes('water')) {
            map.setPaintProperty(layer.id, 'fill-color', '#0c0a09');
          } else if (layer.id.includes('building')) {
            map.setPaintProperty(layer.id, 'fill-color', '#292524');
            map.setPaintProperty(layer.id, 'fill-outline-color', '#44403c');
          } else if (layer.id.includes('park') || layer.id.includes('green') || layer.id.includes('forest') || layer.id.includes('grass')) {
            map.setPaintProperty(layer.id, 'fill-color', '#171c14');
          } else if (layer.id.includes('land')) {
            map.setPaintProperty(layer.id, 'fill-color', '#1c1917');
          } else {
            map.setPaintProperty(layer.id, 'fill-color', '#1c1917');
          }
          break;
        case 'line':
          if (layer.id.includes('motorway') || layer.id.includes('trunk') || layer.id.includes('primary')) {
            map.setPaintProperty(layer.id, 'line-color', '#92400e'); // amber-800
          } else if (layer.id.includes('road') || layer.id.includes('highway') || layer.id.includes('street') || layer.id.includes('secondary') || layer.id.includes('tertiary')) {
            map.setPaintProperty(layer.id, 'line-color', '#44403c'); // stone-700
          } else if (layer.id.includes('rail') || layer.id.includes('transit')) {
            map.setPaintProperty(layer.id, 'line-color', '#292524');
          } else if (layer.id.includes('boundary') || layer.id.includes('border') || layer.id.includes('admin')) {
            map.setPaintProperty(layer.id, 'line-color', '#78350f'); // amber-900
          } else if (layer.id.includes('bridge')) {
            map.setPaintProperty(layer.id, 'line-color', '#44403c');
          } else if (layer.id.includes('tunnel')) {
            map.setPaintProperty(layer.id, 'line-color', '#0c0a09');
          } else {
            map.setPaintProperty(layer.id, 'line-color', '#292524');
          }
          break;
        case 'symbol':
          map.setPaintProperty(layer.id, 'text-color', '#d6d3d1'); // stone-300
          map.setPaintProperty(layer.id, 'text-halo-color', '#1c1917');
          map.setPaintProperty(layer.id, 'text-halo-width', 1.5);
          break;
        case 'fill-extrusion':
          map.setPaintProperty(layer.id, 'fill-extrusion-color', '#292524');
          break;
      }
    } catch {
      // Some layers don't support certain paint properties
    }
  }
}

export default function MapView({
  reports = [],
  center = [40.1872, 44.5152],
  zoom = 13,
  onMarkerClick,
  interactive = true,
  onMapClick,
  selectedPosition,
  selectionMode = false,
  onMapMove,
  height = '500px',
  className = '',
}: MapViewProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<maplibregl.Map | null>(null);
  const popupRef = useRef<maplibregl.Popup | null>(null);
  const reportsDataRef = useRef<Report[]>(reports);
  const onMapMoveRef = useRef(onMapMove);
  const { locale } = useLocale();

  // Keep refs in sync
  reportsDataRef.current = reports;
  onMapMoveRef.current = onMapMove;

  // Initialize map
  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    const map = new maplibregl.Map({
      container: mapRef.current,
      style: ARGO_STYLE_URL,
      center: [center[1], center[0]], // MapLibre uses [lng, lat]
      zoom,
      interactive,
      attributionControl: {},
    });

    // Handle missing images (POI sprites) silently by providing an empty 1x1 image
    map.on('styleimagemissing', (e) => {
      const id = e.id;
      const canvas = document.createElement('canvas');
      canvas.width = 1;
      canvas.height = 1;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        map.addImage(id, ctx.getImageData(0, 0, 1, 1));
      }
    });

    if (interactive) {
      map.addControl(new maplibregl.NavigationControl({ showCompass: false }), 'top-right');
      map.addControl(
        new maplibregl.GeolocateControl({
          positionOptions: { enableHighAccuracy: true },
          trackUserLocation: true,
          showUserLocation: true,
        }),
        'top-right'
      );
    }

    // Create persistent popup
    popupRef.current = new maplibregl.Popup({ offset: 14, closeButton: false, maxWidth: '240px' });

    map.on('style.load', () => {
      // Apply dark theme
      applyDarkTheme(map);

      // Add reports GeoJSON source
      map.addSource(REPORTS_SOURCE, {
        type: 'geojson',
        data: reportsToGeoJSON(reportsDataRef.current),
      });

      // Glow layer (behind circles)
      map.addLayer({
        id: REPORTS_GLOW_LAYER,
        type: 'circle',
        source: REPORTS_SOURCE,
        paint: {
          'circle-radius': 18,
          'circle-color': buildColorExpression(),
          'circle-opacity': 0.15,
          'circle-blur': 1,
        },
      });

      // Main circle layer
      map.addLayer({
        id: REPORTS_CIRCLE_LAYER,
        type: 'circle',
        source: REPORTS_SOURCE,
        paint: {
          'circle-radius': 8,
          'circle-color': buildColorExpression(),
          'circle-opacity': 0.9,
          'circle-stroke-width': 2.5,
          'circle-stroke-color': '#ffffff',
          'circle-stroke-opacity': 0.4,
        },
      });

      // Selected position source + layers
      map.addSource(SELECTED_SOURCE, {
        type: 'geojson',
        data: { type: 'FeatureCollection', features: [] },
      });

      map.addLayer({
        id: SELECTED_PULSE_LAYER,
        type: 'circle',
        source: SELECTED_SOURCE,
        paint: {
          'circle-radius': 22,
          'circle-color': '#F59E0B',
          'circle-opacity': 0.2,
          'circle-blur': 0.8,
        },
      });

      map.addLayer({
        id: SELECTED_CIRCLE_LAYER,
        type: 'circle',
        source: SELECTED_SOURCE,
        paint: {
          'circle-radius': 10,
          'circle-color': '#F59E0B',
          'circle-opacity': 1,
          'circle-stroke-width': 3,
          'circle-stroke-color': '#ffffff',
          'circle-stroke-opacity': 0.8,
        },
      });
    });

    // Hover cursor
    map.on('mouseenter', REPORTS_CIRCLE_LAYER, () => {
      map.getCanvas().style.cursor = 'pointer';
    });
    map.on('mouseleave', REPORTS_CIRCLE_LAYER, () => {
      map.getCanvas().style.cursor = '';
    });

    // Click → popup + callback
    map.on('click', REPORTS_CIRCLE_LAYER, (e) => {
      if (!e.features?.length) return;
      const f = e.features[0];
      const coords = (f.geometry as GeoJSON.Point).coordinates.slice() as [number, number];
      const props = f.properties!;
      const color = categoryColors[props.categoryId] || '#6B7280';
      const cat = getCategoryById(props.categoryId);

      popupRef.current
        ?.setLngLat(coords)
        .setHTML(`
          <div class="${styles.popupContent}">
            <strong>${cat?.name[locale] || props.categoryId}</strong>
            <p>${props.address}</p>
            <span style="background:${color}22;color:${color};">${props.status.replace('_', ' ')}</span>
          </div>
        `)
        .addTo(map);

      // Find the full report object and call back
      if (onMarkerClick) {
        const report = reportsDataRef.current.find((r) => r.id === props.id);
        if (report) onMarkerClick(report);
      }
    });

    // General map click (for pin drop on report form)
    if (onMapClick && !selectionMode) {
      map.on('click', (e) => {
        // Don't fire if we clicked on a report marker
        const features = map.queryRenderedFeatures(e.point, { layers: [REPORTS_CIRCLE_LAYER] });
        if (features.length > 0) return;
        onMapClick(e.lngLat.lat, e.lngLat.lng);
      });
    }

    // Map move (for selection mode)
    map.on('moveend', () => {
      if (onMapMoveRef.current) {
        const c = map.getCenter();
        onMapMoveRef.current(c.lat, c.lng);
      }
    });

    mapInstanceRef.current = map;

    // Handle resize
    const resizeObserver = new ResizeObserver(() => {
      map.resize();
    });
    resizeObserver.observe(mapRef.current);

    // Cleanup
    return () => {
      resizeObserver.disconnect();
      popupRef.current?.remove();
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Update report markers data
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    const updateSource = () => {
      const source = map.getSource(REPORTS_SOURCE) as maplibregl.GeoJSONSource | undefined;
      if (source) {
        source.setData(reportsToGeoJSON(reports));
      }
    };

    if (map.isStyleLoaded()) {
      updateSource();
    } else {
      map.once('style.load', updateSource);
    }
  }, [reports, locale]);

  // Update selected position (only if not in selection mode)
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || selectionMode) return;

    const updateSelected = () => {
      const source = map.getSource(SELECTED_SOURCE) as maplibregl.GeoJSONSource | undefined;
      if (!source) return;

      if (selectedPosition) {
        source.setData({
          type: 'FeatureCollection',
          features: [{
            type: 'Feature',
            geometry: { type: 'Point', coordinates: [selectedPosition[1], selectedPosition[0]] },
            properties: {},
          }],
        });
        map.flyTo({ center: [selectedPosition[1], selectedPosition[0]], duration: 500 });
      } else {
        source.setData({ type: 'FeatureCollection', features: [] });
      }
    };

    if (map.isStyleLoaded()) {
      updateSelected();
    } else {
      map.once('style.load', updateSelected);
    }
  }, [selectedPosition]);

  return (
    <div className={`${styles.mapWrapper} ${className}`} style={{ height }}>
      <div ref={mapRef} className={styles.map} />
      {selectionMode && (
        <div className={styles.crosshair}>
          <div className={styles.pinIcon}>📍</div>
          <div className={styles.pinShadow} />
        </div>
      )}
    </div>
  );
}

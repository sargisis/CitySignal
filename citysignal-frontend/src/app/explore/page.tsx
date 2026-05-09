'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { Filter, X } from 'lucide-react';
import { useLocale } from '@/hooks/useLocale';
import { mockReports } from '@/lib/mock-data';
import { categories, categoryColors } from '@/lib/categories';
import { Report, ReportStatus } from '@/lib/types';
import styles from './page.module.css';

const MapView = dynamic(() => import('@/components/map/MapView'), { ssr: false, loading: () => <div className={styles.mapLoading}>Loading map...</div> });

export default function ExplorePage() {
  const { t, locale } = useLocale();
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<ReportStatus | ''>('');
  const [showFilters, setShowFilters] = useState(true);

  const filtered = mockReports.filter((r) => {
    if (selectedCategory && r.categoryId !== selectedCategory) return false;
    if (selectedStatus && r.status !== selectedStatus) return false;
    return true;
  });

  const handleMarkerClick = (report: Report) => {
    router.push(`/track/${report.trackingId}`);
  };

  const statuses: ReportStatus[] = ['submitted', 'under_review', 'in_progress', 'resolved'];

  return (
    <div className={styles.page}>
      <div className={styles.toolbar}>
        <div className={styles.toolbarLeft}>
          <h1 className={styles.title}>{t('explore.title')}</h1>
          <span className={styles.count}>{filtered.length} {t('explore.issues')}</span>
        </div>
        <button className="btn btn-ghost btn-sm" onClick={() => setShowFilters(!showFilters)}>
          <Filter size={16} /> {showFilters ? <X size={14} /> : 'Filter'}
        </button>
      </div>

      {showFilters && (
        <div className={styles.filters}>
          <div className={styles.filterGroup}>
            <button className={`${styles.filterChip} ${!selectedCategory ? styles.filterActive : ''}`} onClick={() => setSelectedCategory('')}>
              {t('explore.filter.all')}
            </button>
            {categories.map((cat) => (
              <button key={cat.id}
                className={`${styles.filterChip} ${selectedCategory === cat.id ? styles.filterActive : ''}`}
                style={selectedCategory === cat.id ? { borderColor: categoryColors[cat.id], color: categoryColors[cat.id] } : {}}
                onClick={() => setSelectedCategory(cat.id === selectedCategory ? '' : cat.id)}>
                {cat.name[locale]}
              </button>
            ))}
          </div>
          <div className={styles.filterGroup}>
            {statuses.map((status) => (
              <button key={status}
                className={`${styles.filterChip} ${selectedStatus === status ? styles.filterActive : ''}`}
                onClick={() => setSelectedStatus(status === selectedStatus ? '' : status)}>
                {t(`status.${status}` as any)}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className={styles.mapContainer}>
        <div style={{ position: 'absolute', inset: 0 }}>
          <MapView reports={filtered} height="100%" onMarkerClick={handleMarkerClick} zoom={13} />
        </div>
      </div>
    </div>
  );
}

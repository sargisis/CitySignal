'use client';

import { use } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { ArrowLeft, MapPin, Clock, ThumbsUp, Building2 } from 'lucide-react';
import { useLocale } from '@/hooks/useLocale';
import { getReportByTrackingId } from '@/lib/mock-data';
import { categories, categoryColors } from '@/lib/categories';
import { formatDate } from '@/lib/utils';
import StatusTimeline from '@/components/report/StatusTimeline';
import styles from './page.module.css';

const MapView = dynamic(() => import('@/components/map/MapView'), { ssr: false });


// Track Detail Page
export default function TrackDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { t, locale } = useLocale();
  const report = getReportByTrackingId(id);

  if (!report) {
    return (
      <div className={styles.page}>
        <div className="container">
          <div className={styles.notFound}>
            <h1>{t('track.notfound')}</h1>
            <Link href="/track" className="btn btn-primary">{t('report.back')}</Link>
          </div>
        </div>
      </div>
    );
  }

  const cat = categories.find((c) => c.id === report.categoryId);

  return (
    <div className={styles.page}>
      <div className="container">
        <Link href="/track" className={styles.backLink}><ArrowLeft size={16} /> {t('report.back')}</Link>

        <div className={styles.header}>
          <div>
            <div className={styles.trackingBadge}>
              <code>{report.trackingId}</code>
            </div>
            <h1 className={styles.title}>{cat?.name[locale]}</h1>
            <span className={`badge badge-${report.status}`} style={{ fontSize: '0.85rem', padding: '6px 16px' }}>
              {t(`status.${report.status}` as any)}
            </span>
          </div>
          <div className={styles.meta}>
            <div className={styles.metaItem}><Clock size={16} /> {formatDate(report.createdAt, locale)}</div>
            <div className={styles.metaItem}><ThumbsUp size={16} /> {report.upvotes}</div>
            {report.department && <div className={styles.metaItem}><Building2 size={16} /> {report.department}</div>}
          </div>
        </div>

        <div className={styles.grid}>
          <div className={styles.main}>
            <div className="card">
              <h3 className={styles.sectionTitle}>{t('report.details.description')}</h3>
              <p className={styles.description}>{report.description}</p>
            </div>

            <div className="card" style={{ marginTop: 20 }}>
              <h3 className={styles.sectionTitle}>{t('report.step.location')}</h3>
              <div className={styles.address}><MapPin size={16} /> {report.address}</div>
              <MapView
                reports={[report]}
                center={[report.latitude, report.longitude]}
                zoom={16}
                height="300px"
                interactive={true}
              />
            </div>
          </div>

          <div className={styles.sidebar}>
            <div className="card">
              <h3 className={styles.sectionTitle}>Status Timeline</h3>
              <StatusTimeline history={report.statusHistory} currentStatus={report.status} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

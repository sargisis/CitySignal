'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, ArrowRight } from 'lucide-react';
import { useLocale } from '@/hooks/useLocale';
import { getReportByTrackingId } from '@/lib/mock-data';
import styles from './page.module.css';

export default function TrackPage() {
  const { t } = useLocale();
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [error, setError] = useState(false);

  const handleSearch = () => {
    const report = getReportByTrackingId(query.trim());
    if (report) {
      router.push(`/track/${report.trackingId}`);
    } else {
      setError(true);
    }
  };

  return (
    <div className={styles.page}>
      <div className="container">
        <div className={styles.centered}>
          <div className={styles.searchIcon}><Search size={40} /></div>
          <h1 className={styles.title}>{t('track.title')}</h1>
          <p className={styles.subtitle}>{t('track.subtitle')}</p>

          <div className={styles.searchBox}>
            <input
              className={`input ${styles.searchInput}`}
              type="text"
              value={query}
              onChange={(e) => { setQuery(e.target.value); setError(false); }}
              placeholder={t('track.placeholder')}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
            <button className="btn btn-primary" onClick={handleSearch} disabled={!query.trim()}>
              {t('track.search')} <ArrowRight size={16} />
            </button>
          </div>

          {error && <p className={styles.error}>{t('track.notfound')}</p>}

          <div className={styles.examples}>
            <p className={styles.examplesLabel}>Try these demo IDs:</p>
            <div className={styles.exampleChips}>
              {['CS-2026-A3K7P', 'CS-2026-D7K3W', 'CS-2026-H5R2X'].map((id) => (
                <button key={id} className={styles.chip} onClick={() => { setQuery(id); setError(false); }}>
                  {id}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

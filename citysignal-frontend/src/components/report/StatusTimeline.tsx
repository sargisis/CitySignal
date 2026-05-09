'use client';

import { StatusUpdate } from '@/lib/types';
import { useLocale } from '@/hooks/useLocale';
import { formatDate, getStatusColor } from '@/lib/utils';
import { Check, Clock, Search, Wrench, X } from 'lucide-react';
import styles from './StatusTimeline.module.css';

const statusIcons: Record<string, React.ReactNode> = {
  submitted: <Clock size={16} />,
  under_review: <Search size={16} />,
  in_progress: <Wrench size={16} />,
  resolved: <Check size={16} />,
  closed: <X size={16} />,
};

interface StatusTimelineProps {
  history: StatusUpdate[];
  currentStatus: string;
}

export default function StatusTimeline({ history, currentStatus }: StatusTimelineProps) {
  const { locale, t } = useLocale();
  const allStatuses = ['submitted', 'under_review', 'in_progress', 'resolved'] as const;
  const currentIdx = allStatuses.indexOf(currentStatus as typeof allStatuses[number]);

  return (
    <div className={styles.timeline}>
      {allStatuses.map((status, idx) => {
        const update = history.find((h) => h.status === status);
        const isActive = idx <= currentIdx;
        const isCurrent = status === currentStatus;

        return (
          <div key={status} className={`${styles.step} ${isActive ? styles.active : ''} ${isCurrent ? styles.current : ''}`}>
            <div className={styles.connector}>
              <div className={styles.dot} style={{ background: isActive ? getStatusColor(status) : 'var(--border)' }}>
                {statusIcons[status]}
              </div>
              {idx < allStatuses.length - 1 && (
                <div className={styles.line} style={{ background: idx < currentIdx ? getStatusColor(allStatuses[idx + 1]) : 'var(--border)' }} />
              )}
            </div>
            <div className={styles.content}>
              <p className={styles.statusLabel} style={{ color: isActive ? getStatusColor(status) : 'var(--text-muted)' }}>
                {t(`status.${status}` as any)}
              </p>
              {update && (
                <>
                  <p className={styles.time}>{formatDate(update.timestamp, locale)}</p>
                  {update.note && <p className={styles.note}>{update.note}</p>}
                </>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

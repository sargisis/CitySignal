'use client';

import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { ArrowRight, Send, Route, Eye, CheckCircle, Construction, LightbulbOff, Droplets, Trash2, Trees, Building2, Zap, HardHat, TrafficCone, Flag } from 'lucide-react';
import { useLocale } from '@/hooks/useLocale';
import { mockReports, mockStats } from '@/lib/mock-data';
import { categories, categoryColors } from '@/lib/categories';
import { formatRelativeTime, getStatusColor } from '@/lib/utils';
import styles from './page.module.css';

const MapView = dynamic(() => import('@/components/map/MapView'), { ssr: false, loading: () => <div className={styles.mapPlaceholder} /> });

const iconMap: Record<string, React.ReactNode> = {
  construction: <Construction size={24} />, 'lightbulb-off': <LightbulbOff size={24} />,
  droplets: <Droplets size={24} />, 'trash-2': <Trash2 size={24} />,
  trees: <Trees size={24} />, 'building-2': <Building2 size={24} />,
  zap: <Zap size={24} />, 'hard-hat': <HardHat size={24} />,
  'traffic-cone': <TrafficCone size={24} />, flag: <Flag size={24} />,
};

function AnimatedCounter({ end, duration = 2000 }: { end: number; duration?: number }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = end / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) { setCount(end); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [end, duration]);
  return <>{count.toLocaleString()}</>;
}

export default function HomePage() {
  const { t, locale } = useLocale();
  const recentReports = mockReports.slice(0, 4);

  return (
    <div className={styles.page}>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroBg} />
        <div className={`container ${styles.heroContent}`}>
          <div className={styles.heroText}>
            <div className={styles.heroBadge}>
              <span className={styles.heroBadgeDot} /> CitySignal Armenia
            </div>
            <h1 className={styles.heroTitle}>{t('hero.title')}</h1>
            <p className={styles.heroSubtitle}>{t('hero.subtitle')}</p>
            <div className={styles.heroCtas}>
              <Link href="/report" className="btn btn-primary btn-lg">
                {t('hero.cta.report')} <ArrowRight size={18} />
              </Link>
              <Link href="/track" className="btn btn-secondary btn-lg">
                {t('hero.cta.track')}
              </Link>
            </div>
          </div>
          <div className={styles.heroMap}>
            <MapView reports={mockReports} height="380px" interactive={true} zoom={12} />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className={styles.stats}>
        <div className="container">
          <div className={styles.statsGrid}>
            {[
              { value: mockStats.totalReported, label: t('stats.reported'), color: 'var(--accent-secondary)' },
              { value: mockStats.totalResolved, label: t('stats.resolved'), color: 'var(--accent-success)' },
              { value: mockStats.avgResponseHours, label: t('stats.avgTime'), color: 'var(--accent-primary)', suffix: ` ${t('stats.hours')}` },
              { value: mockStats.departments, label: t('stats.departments'), color: 'var(--accent-warning)' },
            ].map((stat, i) => (
              <div key={i} className={styles.statCard}>
                <span className={styles.statValue} style={{ color: stat.color }}>
                  <AnimatedCounter end={stat.value} />{stat.suffix || ''}
                </span>
                <span className={styles.statLabel}>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">{t('how.title')}</h2>
          <div className={styles.stepsGrid}>
            {[
              { icon: <Send size={28} />, title: t('how.step1.title'), desc: t('how.step1.desc'), num: '01' },
              { icon: <Route size={28} />, title: t('how.step2.title'), desc: t('how.step2.desc'), num: '02' },
              { icon: <Eye size={28} />, title: t('how.step3.title'), desc: t('how.step3.desc'), num: '03' },
              { icon: <CheckCircle size={28} />, title: t('how.step4.title'), desc: t('how.step4.desc'), num: '04' },
            ].map((step, i) => (
              <div key={i} className={styles.stepCard}>
                <div className={styles.stepNum}>{step.num}</div>
                <div className={styles.stepIcon}>{step.icon}</div>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepDesc}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">{t('categories.title')}</h2>
          <p className="section-subtitle">{t('categories.subtitle')}</p>
          <div className={styles.catGrid}>
            {categories.map((cat) => (
              <Link key={cat.id} href={`/report?category=${cat.id}`} className={styles.catCard}>
                <div className={styles.catIcon} style={{ color: categoryColors[cat.id] }}>
                  {iconMap[cat.icon] || <Flag size={24} />}
                </div>
                <span className={styles.catName}>{cat.name[locale]}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Recent reports */}
      <section className="section">
        <div className="container">
          <div className={styles.recentHeader}>
            <div>
              <h2 className="section-title">{t('recent.title')}</h2>
              <p className="section-subtitle" style={{ marginBottom: 0 }}>{t('recent.subtitle')}</p>
            </div>
            <Link href="/explore" className="btn btn-secondary">{t('recent.viewAll')} <ArrowRight size={16} /></Link>
          </div>
          <div className={`grid grid-2 ${styles.recentGrid}`}>
            {recentReports.map((report) => {
              const cat = categories.find((c) => c.id === report.categoryId);
              return (
                <Link key={report.id} href={`/track/${report.trackingId}`} className={`card card-hover ${styles.reportCard}`}>
                  <div className={styles.reportHeader}>
                    <div className={styles.reportCatIcon} style={{ color: categoryColors[report.categoryId] }}>
                      {iconMap[cat?.icon || 'flag'] || <Flag size={18} />}
                    </div>
                    <span className={styles.reportCat}>{cat?.name[locale]}</span>
                    <span className={`badge badge-${report.status}`}>{t(`status.${report.status}` as any)}</span>
                  </div>
                  <p className={styles.reportDesc}>{report.description}</p>
                  <div className={styles.reportFooter}>
                    <span className={styles.reportAddr}>{report.address}</span>
                    <span className={styles.reportTime}>{formatRelativeTime(report.createdAt)}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

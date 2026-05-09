'use client';

import { useState, useCallback, Suspense } from 'react';
import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation';
import { ArrowLeft, ArrowRight, MapPin, Camera, CheckCircle, Copy, Construction, LightbulbOff, Droplets, Trash2, Trees, Building2, Zap, HardHat, TrafficCone, Flag } from 'lucide-react';
import { useLocale } from '@/hooks/useLocale';
import { useGeolocation } from '@/hooks/useGeolocation';
import { categories, categoryColors } from '@/lib/categories';
import { generateTrackingId } from '@/lib/utils';
import styles from './page.module.css';

const MapView = dynamic(() => import('@/components/map/MapView'), { ssr: false });

const iconMap: Record<string, React.ReactNode> = {
  construction: <Construction size={28} />, 'lightbulb-off': <LightbulbOff size={28} />,
  droplets: <Droplets size={28} />, 'trash-2': <Trash2 size={28} />,
  trees: <Trees size={28} />, 'building-2': <Building2 size={28} />,
  zap: <Zap size={28} />, 'hard-hat': <HardHat size={28} />,
  'traffic-cone': <TrafficCone size={28} />, flag: <Flag size={28} />,
};

type Step = 'category' | 'location' | 'details' | 'contact' | 'confirm' | 'success';
const steps: Step[] = ['category', 'location', 'details', 'contact', 'confirm'];

export default function ReportPage() {
  return (
    <Suspense fallback={<div className={styles.page}><div className="container"><p>Loading...</p></div></div>}>
      <ReportPageInner />
    </Suspense>
  );
}

function ReportPageInner() {
  const { t, locale } = useLocale();
  const searchParams = useSearchParams();
  const geo = useGeolocation();

  const [step, setStep] = useState<Step>(searchParams.get('category') ? 'location' : 'category');
  const [categoryId, setCategoryId] = useState(searchParams.get('category') || '');
  const [position, setPosition] = useState<[number, number]>([40.1872, 44.5152]);
  const [description, setDescription] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [trackingId, setTrackingId] = useState('');
  const [copied, setCopied] = useState(false);

  const currentStepIdx = steps.indexOf(step);
  const canGoNext = () => {
    switch (step) {
      case 'category': return !!categoryId;
      case 'location': return !!position;
      case 'details': return description.trim().length > 10;
      case 'contact': return true;
      case 'confirm': return true;
      default: return false;
    }
  };

  const goNext = () => {
    if (step === 'confirm') {
      setTrackingId(generateTrackingId());
      setStep('success');
      return;
    }
    const next = steps[currentStepIdx + 1];
    if (next) setStep(next);
  };
  const goBack = () => {
    const prev = steps[currentStepIdx - 1];
    if (prev) setStep(prev);
  };

  const handleMapClick = useCallback((lat: number, lng: number) => {
    setPosition([lat, lng]);
  }, []);

  const handleDetectLocation = () => {
    geo.requestLocation();
    if (geo.latitude && geo.longitude) {
      setPosition([geo.latitude, geo.longitude]);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(trackingId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const selectedCat = categories.find((c) => c.id === categoryId);

  return (
    <div className={styles.page}>
      <div className="container">
        <h1 className={styles.title}>{t('report.title')}</h1>

        {/* Progress bar */}
        {step !== 'success' && (
          <div className={styles.progress}>
            {steps.map((s, i) => (
              <div key={s} className={`${styles.progressStep} ${i <= currentStepIdx ? styles.progressActive : ''} ${s === step ? styles.progressCurrent : ''}`}>
                <div className={styles.progressDot}>{i + 1}</div>
                <span className={styles.progressLabel}>{t(`report.step.${s}` as any)}</span>
              </div>
            ))}
          </div>
        )}

        {/* Step content */}
        <div className={styles.stepContent}>
          {step === 'category' && (
            <div className={styles.catGrid}>
              {categories.map((cat) => (
                <button key={cat.id}
                  className={`${styles.catCard} ${categoryId === cat.id ? styles.catSelected : ''}`}
                  style={{ '--cat-color': categoryColors[cat.id] } as React.CSSProperties}
                  onClick={() => setCategoryId(cat.id)}>
                  <div className={styles.catIcon}>{iconMap[cat.icon] || <Flag size={28} />}</div>
                  <span className={styles.catName}>{cat.name[locale]}</span>
                </button>
              ))}
            </div>
          )}

          {step === 'location' && (
            <div className={styles.locationStep}>
              <p className={styles.stepSubtitle}>{t('report.location.subtitle')}</p>
              <button className="btn btn-secondary btn-sm" onClick={handleDetectLocation} style={{ marginBottom: 16 }}>
                <MapPin size={16} /> {t('report.location.detect')}
              </button>
              <MapView
                height="400px"
                selectionMode={true}
                onMapMove={handleMapClick}
                zoom={14}
                center={position || [40.1872, 44.5152]}
              />
              {position && (
                <p className={styles.coords}>📍 {position[0].toFixed(5)}, {position[1].toFixed(5)}</p>
              )}
            </div>
          )}

          {step === 'details' && (
            <div className={styles.detailsStep}>
              <label className={styles.label}>{t('report.details.description')}</label>
              <textarea className="input" value={description} onChange={(e) => setDescription(e.target.value)} placeholder={t('report.details.placeholder')} rows={5} />
              <label className={styles.label} style={{ marginTop: 24 }}>{t('report.details.photos')}</label>
              <div className={styles.photoUpload}>
                <Camera size={32} />
                <p>{t('report.details.dragdrop')}</p>
              </div>
            </div>
          )}

          {step === 'contact' && (
            <div className={styles.contactStep}>
              <p className={styles.stepSubtitle}>{t('report.contact.subtitle')}</p>
              <label className={styles.label}>{t('report.contact.phone')}</label>
              <input className="input" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+374 XX XXX XXX" />
              <label className={styles.label} style={{ marginTop: 20 }}>{t('report.contact.email')}</label>
              <input className="input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email@example.com" />
            </div>
          )}

          {step === 'confirm' && (
            <div className={styles.confirmStep}>
              <div className={`card ${styles.reviewCard}`}>
                <div className={styles.reviewRow}><span>{t('report.step.category')}</span><strong style={{ color: categoryColors[categoryId] }}>{selectedCat?.name[locale]}</strong></div>
                <div className={styles.reviewRow}><span>{t('report.step.location')}</span><strong>{position?.[0].toFixed(4)}, {position?.[1].toFixed(4)}</strong></div>
                <div className={styles.reviewRow}><span>{t('report.step.details')}</span><strong>{description.substring(0, 80)}...</strong></div>
                {phone && <div className={styles.reviewRow}><span>{t('report.contact.phone')}</span><strong>{phone}</strong></div>}
              </div>
            </div>
          )}

          {step === 'success' && (
            <div className={styles.successStep}>
              <div className={styles.successIcon}><CheckCircle size={64} /></div>
              <h2 className={styles.successTitle}>{t('report.success.title')}</h2>
              <p className={styles.successMsg}>{t('report.success.message')}</p>
              <div className={styles.trackingBox}>
                <span className={styles.trackingLabel}>{t('report.success.tracking')}</span>
                <div className={styles.trackingId}>
                  <code>{trackingId}</code>
                  <button className="btn btn-ghost btn-sm" onClick={handleCopy}>
                    <Copy size={16} /> {copied ? '✓' : t('report.success.copy')}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        {step !== 'success' && (
          <div className={styles.nav}>
            {currentStepIdx > 0 && (
              <button className="btn btn-secondary" onClick={goBack}><ArrowLeft size={16} /> {t('report.back')}</button>
            )}
            <div style={{ flex: 1 }} />
            <button className="btn btn-primary" onClick={goNext} disabled={!canGoNext()}>
              {step === 'confirm' ? t('report.confirm.submit') : t('report.next')} <ArrowRight size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

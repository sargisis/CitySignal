'use client';

import Link from 'next/link';
import { MapPin } from 'lucide-react';
import { useLocale } from '@/hooks/useLocale';
import styles from './Footer.module.css';

export default function Footer() {
  const { t } = useLocale();

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.brand}>
          <Link href="/" className={styles.logo}>
            <div className={styles.logoIcon}><MapPin size={18} /></div>
            <span className={styles.logoText}>City<span className={styles.logoAccent}>Signal</span></span>
          </Link>
          <p className={styles.tagline}>{t('footer.tagline')}</p>
        </div>

        <div className={styles.links}>
          <h4 className={styles.linksTitle}>{t('footer.links')}</h4>
          <Link href="/report">{t('nav.report')}</Link>
          <Link href="/track">{t('nav.track')}</Link>
          <Link href="/explore">{t('nav.explore')}</Link>
        </div>

        <div className={styles.links}>
          <h4 className={styles.linksTitle}>{t('footer.contact')}</h4>
          <a href="mailto:[EMAIL_ADDRESS]">[EMAIL_ADDRESS]</a>
          <a href="tel:+37499327007">+374 99 327 007</a>
        </div>
      </div>

      <div className={`container ${styles.bottom}`}>
        <p>&copy; {new Date().getFullYear()} CitySignal. {t('footer.rights')}</p>
      </div>
    </footer>
  );
}

'use client';

import Link from 'next/link';
import { useState } from 'react';
import { MapPin, Menu, X, ChevronDown } from 'lucide-react';
import { useLocale } from '@/hooks/useLocale';
import { localeFlags, localeNames } from '@/lib/i18n';
import { Locale } from '@/lib/types';
import styles from './Header.module.css';

export default function Header() {
  const { locale, setLocale, t } = useLocale();
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  const locales: Locale[] = ['en', 'hy', 'ru'];

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <Link href="/" className={styles.logo}>
          <div className={styles.logoIcon}><MapPin size={22} /></div>
          <span className={styles.logoText}>City<span className={styles.logoAccent}>Signal</span></span>
        </Link>

        <nav className={`${styles.nav} ${menuOpen ? styles.navOpen : ''}`}>
          <Link href="/" className={styles.navLink} onClick={() => setMenuOpen(false)}>{t('nav.home')}</Link>
          <Link href="/report" className={styles.navLink} onClick={() => setMenuOpen(false)}>{t('nav.report')}</Link>
          <Link href="/track" className={styles.navLink} onClick={() => setMenuOpen(false)}>{t('nav.track')}</Link>
          <Link href="/explore" className={styles.navLink} onClick={() => setMenuOpen(false)}>{t('nav.explore')}</Link>
        </nav>

        <div className={styles.actions}>
          <div className={styles.langSwitcher}>
            <button className={styles.langBtn} onClick={() => setLangOpen(!langOpen)}>
              <span>{localeFlags[locale]}</span>
              <ChevronDown size={14} />
            </button>
            {langOpen && (
              <div className={styles.langDropdown}>
                {locales.map((l) => (
                  <button key={l} className={`${styles.langOption} ${l === locale ? styles.langActive : ''}`}
                    onClick={() => { setLocale(l); setLangOpen(false); }}>
                    <span>{localeFlags[l]}</span> {localeNames[l]}
                  </button>
                ))}
              </div>
            )}
          </div>

          <Link href="/report" className={`btn btn-primary btn-sm ${styles.ctaBtn}`}>
            {t('hero.cta.report')}
          </Link>

          <button className={`${styles.menuBtn}`} onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </header>
  );
}

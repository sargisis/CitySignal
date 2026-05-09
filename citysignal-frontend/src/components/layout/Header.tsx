'use client';

import Link from 'next/link';
import { useState } from 'react';
import { MapPin, Menu, X, ChevronDown, User as UserIcon, LogOut } from 'lucide-react';
import { useLocale } from '@/hooks/useLocale';
import { useAuth } from '@/hooks/useAuth';
import { localeFlags, localeNames } from '@/lib/i18n';
import { Locale } from '@/lib/types';
import styles from './Header.module.css';

export default function Header() {
  const { locale, setLocale, t } = useLocale();
  const { user, setAuthModalOpen, signOut } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

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

          {user ? (
            <div className={styles.userMenuWrapper}>
              <button className={styles.userBtn} onClick={() => setUserMenuOpen(!userMenuOpen)}>
                {user.photoURL ? (
                  <img src={user.photoURL} alt="User" className={styles.avatar} />
                ) : (
                  <div className={styles.avatarFallback}>
                    <UserIcon size={16} />
                  </div>
                )}
                <span className={styles.userName}>{user.displayName || user.email?.split('@')[0]}</span>
                <ChevronDown size={14} />
              </button>
              {userMenuOpen && (
                <div className={styles.userDropdown}>
                  <button className={styles.dropdownItem} onClick={() => { signOut(); setUserMenuOpen(false); }}>
                    <LogOut size={16} /> Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button className="btn btn-secondary btn-sm" onClick={() => setAuthModalOpen(true)}>
              Sign In
            </button>
          )}

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

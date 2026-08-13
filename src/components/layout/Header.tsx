'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Link, useRouter } from '@/i18n/routing';
import { useSession, signOut } from 'next-auth/react';
import { useState } from 'react';
import Image from 'next/image';
import LanguageSwitcher from './LanguageSwitcher';

export default function Header() {
  const t = useTranslations('common');
  const locale = useLocale();
  const router = useRouter();
  const { data: session } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push('/');
  };

  return (
    <header className="header">
      <div className="header-inner">
        <Link href="/" className="header-logo" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 6px rgba(0,0,0,0.08)'
          }}>
            <Image 
              src="/img/turkishglobal.webp" 
              alt="TurkishGlobal" 
              width={76}
              height={76}
              priority
              style={{ 
                objectFit: 'cover',
              }} 
            />
          </div>
          <span style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)' }}>Turkish Global</span>
        </Link>

        <button
          className="mobile-menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          {menuOpen ? '✕' : '☰'}
        </button>

        <nav className={`header-nav ${menuOpen ? 'open' : ''}`}>
          <Link href="/" className="nav-link" onClick={() => setMenuOpen(false)}>
            {t('home')}
          </Link>
          <Link href="/jobs" className="nav-link" onClick={() => setMenuOpen(false)}>
            {t('jobs')}
          </Link>
          <Link href="/contact" className="nav-link" onClick={() => setMenuOpen(false)}>
            {t('contact')}
          </Link>

          {session?.user ? (
            <>
              <Link href="/dashboard" className="nav-link" onClick={() => setMenuOpen(false)}>
                {t('dashboard')}
              </Link>
              <button className="logout-btn" onClick={handleLogout}>
                {t('logout')}
              </button>
            </>
          ) : (
            <>
              <Link href="/auth/login" className="nav-link" onClick={() => setMenuOpen(false)}>
                {t('login')}
              </Link>
              <Link href="/auth/register" className="btn btn-primary btn-sm" style={{borderRadius: '100px'}} onClick={() => setMenuOpen(false)}>
                {t('register')}
              </Link>
            </>
          )}

          <LanguageSwitcher />
        </nav>
      </div>
    </header>
  );
}

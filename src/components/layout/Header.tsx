'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import LanguageSwitcher from './LanguageSwitcher';

export default function Header() {
  const t = useTranslations('common');
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { href: '/',                  labelKey: 'home' },
    { href: '/jobs',              labelKey: 'germanyJobs' },
    { href: '/opportunity-card',  labelKey: 'opportunityCard' },
    { href: '/education',         labelKey: 'germanyEducation' },
    { href: '/hakkimizda',        labelKey: 'aboutUs' },
    { href: '/almanya-rehberi',   labelKey: 'germanyGuide' },
  ] as const;

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        transition: 'background 0.3s ease, box-shadow 0.3s ease',
        background: scrolled ? 'rgba(10, 18, 40, 0.97)' : 'rgba(10, 18, 40, 0.72)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        boxShadow: scrolled ? '0 4px 32px rgba(0,0,0,0.35)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.07)' : 'none',
      }}
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 16px',
          height: '72px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '8px',
        }}
      >
        {/* ─── Logo ─── */}
        <Link
          href="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            textDecoration: 'none',
            flexShrink: 0,
          }}
        >
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              overflow: 'hidden',
              boxShadow: '0 2px 12px rgba(59,130,246,0.4)',
              flexShrink: 0,
            }}
          >
            <Image
              src="/img/turkishglobal.webp"
              alt="TurkishGlobal"
              width={40}
              height={40}
              priority
              style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            />
          </div>
          <span className="hdr-logo-text">
            Turkish<span style={{ color: '#60a5fa' }}>Global</span>
          </span>
        </Link>

        {/* ─── Desktop Nav (≥1024px) ─── */}
        <nav className="hdr-desktop-nav">
          {navLinks.map(({ href, labelKey }) => (
            <Link
              key={href}
              href={href}
              style={{
                fontSize: '0.82rem',
                fontWeight: 500,
                color: 'rgba(255,255,255,0.82)',
                padding: '6px 10px',
                borderRadius: '8px',
                textDecoration: 'none',
                whiteSpace: 'nowrap',
                transition: 'color 0.2s, background 0.2s',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.color = '#ffffff';
                (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.08)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.82)';
                (e.currentTarget as HTMLElement).style.background = 'transparent';
              }}
            >
              {t(labelKey)}
            </Link>
          ))}
        </nav>

        {/* ─── Desktop Right: Lang + CTA (≥1024px) ─── */}
        <div className="hdr-desktop-right">
          <LanguageSwitcher />
          <Link
            href="/pre-application"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.8rem',
              fontWeight: 600,
              color: '#ffffff',
              background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
              padding: '9px 16px',
              borderRadius: '10px',
              textDecoration: 'none',
              whiteSpace: 'nowrap',
              boxShadow: '0 4px 14px rgba(37,99,235,0.45)',
              transition: 'transform 0.2s, box-shadow 0.2s',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)';
              (e.currentTarget as HTMLElement).style.boxShadow = '0 6px 20px rgba(37,99,235,0.6)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
              (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 14px rgba(37,99,235,0.45)';
            }}
          >
            {t('ctaContact')}
          </Link>
        </div>

        {/* ─── Mobile Right: Flags + Hamburger (<1024px) ─── */}
        <div className="hdr-mobile-right">
          <LanguageSwitcher />
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Menüyü kapat' : 'Menüyü aç'}
            style={{
              background: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.2)',
              color: '#fff',
              width: '38px',
              height: '38px',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              fontSize: '1.15rem',
              flexShrink: 0,
              lineHeight: 1,
            }}
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* ─── Mobile Fullscreen Menu ─── */}
      {menuOpen && (
        <div
          style={{
            position: 'fixed',
            top: '72px',
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(10,18,40,0.99)',
            display: 'flex',
            flexDirection: 'column',
            padding: '16px',
            gap: '4px',
            overflowY: 'auto',
            zIndex: 999,
          }}
        >
          {navLinks.map(({ href, labelKey }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              style={{
                fontSize: '1rem',
                fontWeight: 500,
                color: 'rgba(255,255,255,0.85)',
                padding: '14px 16px',
                borderRadius: '10px',
                textDecoration: 'none',
                borderBottom: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              {t(labelKey)}
            </Link>
          ))}
          <Link
            href="/pre-application"
            onClick={() => setMenuOpen(false)}
            style={{
              marginTop: '12px',
              fontSize: '1rem',
              fontWeight: 600,
              color: '#ffffff',
              background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
              padding: '16px 24px',
              borderRadius: '12px',
              textDecoration: 'none',
              textAlign: 'center',
              display: 'block',
            }}
          >
            {t('ctaContact')}
          </Link>
          <div style={{ marginTop: '12px', display: 'flex', justifyContent: 'center' }}>
            <LanguageSwitcher />
          </div>
        </div>
      )}

      <style>{`
        .hdr-logo-text {
          font-size: 1rem;
          font-weight: 700;
          color: #ffffff;
          letter-spacing: -0.02em;
          line-height: 1.2;
        }
        .hdr-desktop-nav {
          display: flex;
          align-items: center;
          gap: 2px;
          flex: 1;
          justify-content: center;
        }
        .hdr-desktop-right {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-shrink: 0;
        }
        .hdr-mobile-right {
          display: none;
          align-items: center;
          gap: 8px;
          flex-shrink: 0;
        }
        @media (max-width: 1023px) {
          .hdr-desktop-nav { display: none !important; }
          .hdr-desktop-right { display: none !important; }
          .hdr-mobile-right { display: flex !important; }
          .hdr-logo-text { display: none; }
        }
      `}</style>
    </header>
  );
}

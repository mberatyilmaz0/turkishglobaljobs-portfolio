'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import TrustSection from '@/components/TrustSection';

export default function HomeClient() {
  const t = useTranslations('home');
  const locale = useLocale();

  const services = [
    {
      icon: '🔵',
      titleKey: 'service1Title',
      descKey: 'service1Desc',
    },
    {
      icon: '🎓',
      titleKey: 'service2Title',
      descKey: 'service2Desc',
    },
    {
      icon: '📋',
      titleKey: 'service3Title',
      descKey: 'service3Desc',
    },
    {
      icon: '💼',
      titleKey: 'service4Title',
      descKey: 'service4Desc',
    },
  ] as const;

  const stats = [
    { value: '500+', labelKey: 'stat1' },
    { value: '98%',  labelKey: 'stat2' },
    { value: '7+',   labelKey: 'stat3' },
    { value: '3',    labelKey: 'stat4' },
  ] as const;

  return (
    <>
      {/* ════════════════════════════════════════
          HERO
      ════════════════════════════════════════ */}
      <section
        id="hero"
        style={{
          position: 'relative',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          background: 'linear-gradient(135deg, #0a1228 0%, #0f1e45 40%, #0d2257 70%, #0a1228 100%)',
          paddingTop: '72px',
        }}
      >
        {/* Animated background blobs */}
        <div
          aria-hidden
          style={{
            position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none',
          }}
        >
          <div style={{
            position: 'absolute',
            top: '10%', left: '5%',
            width: '520px', height: '520px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(37,99,235,0.18) 0%, transparent 70%)',
            filter: 'blur(40px)',
            animation: 'blobFloat 8s ease-in-out infinite',
          }} />
          <div style={{
            position: 'absolute',
            bottom: '5%', right: '5%',
            width: '400px', height: '400px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(96,165,250,0.12) 0%, transparent 70%)',
            filter: 'blur(50px)',
            animation: 'blobFloat 11s ease-in-out infinite reverse',
          }} />
          <div style={{
            position: 'absolute',
            top: '50%', left: '50%',
            transform: 'translate(-50%,-50%)',
            width: '700px', height: '700px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(16,34,80,0.6) 0%, transparent 65%)',
            filter: 'blur(60px)',
          }} />
        </div>

        {/* Grid overlay */}
        <div
          aria-hidden
          style={{
            position: 'absolute', inset: 0,
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
            pointerEvents: 'none',
          }}
        />

        {/* Hero content */}
        <div
          style={{
            position: 'relative',
            zIndex: 2,
            textAlign: 'center',
            maxWidth: '860px',
            margin: '0 auto',
            padding: '80px 24px',
          }}
        >
          {/* Badge */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(37,99,235,0.15)',
              border: '1px solid rgba(96,165,250,0.3)',
              borderRadius: '100px',
              padding: '8px 20px',
              marginBottom: '36px',
              backdropFilter: 'blur(10px)',
            }}
          >
            <span style={{ fontSize: '0.75rem', color: '#93c5fd', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              {t('heroBadge')}
            </span>
          </div>

          {/* Main heading */}
          <h1
            style={{
              fontSize: 'clamp(2.2rem, 5.5vw, 3.75rem)',
              fontWeight: 800,
              lineHeight: 1.12,
              letterSpacing: '-0.03em',
              color: '#ffffff',
              marginBottom: '24px',
            }}
          >
            {t('heroTitle')}{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #60a5fa, #3b82f6)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {t('heroTitleHighlight')}
            </span>
          </h1>

          {/* Subtitle */}
          <p
            style={{
              fontSize: 'clamp(1rem, 2vw, 1.25rem)',
              color: 'rgba(255,255,255,0.7)',
              lineHeight: 1.7,
              maxWidth: '640px',
              margin: '0 auto 48px',
            }}
          >
            {t('heroSubtitle')}
          </p>

          {/* CTA Buttons */}
          <div
            style={{
              display: 'flex',
              gap: '16px',
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            <Link
              href="/pre-application"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '1rem',
                fontWeight: 700,
                color: '#ffffff',
                background: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
                padding: '16px 36px',
                borderRadius: '12px',
                textDecoration: 'none',
                boxShadow: '0 8px 32px rgba(37,99,235,0.5)',
                transition: 'transform 0.2s, box-shadow 0.2s',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
                (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 40px rgba(37,99,235,0.65)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 32px rgba(37,99,235,0.5)';
              }}
            >
              {t('heroCta')} →
            </Link>
            <Link
              href="/jobs"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '1rem',
                fontWeight: 600,
                color: 'rgba(255,255,255,0.85)',
                background: 'rgba(255,255,255,0.07)',
                border: '1px solid rgba(255,255,255,0.18)',
                padding: '16px 36px',
                borderRadius: '12px',
                textDecoration: 'none',
                backdropFilter: 'blur(8px)',
                transition: 'background 0.2s, color 0.2s',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.13)';
                (e.currentTarget as HTMLElement).style.color = '#fff';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.07)';
                (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.85)';
              }}
            >
              {t('heroSecondary')}
            </Link>
          </div>

          {/* Trust badges */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '24px',
              marginTop: '56px',
              flexWrap: 'wrap',
            }}
          >
            {[t('trust1'), t('trust2'), t('trust3')].map((label, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: 'rgba(255,255,255,0.55)',
                  fontSize: '0.85rem',
                }}
              >
                <span style={{ color: '#34d399', fontSize: '1rem' }}>✓</span>
                {label}
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          aria-hidden
          style={{
            position: 'absolute', bottom: '32px', left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px',
          }}
        >
          <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>scroll</span>
          <div style={{
            width: '1px', height: '40px',
            background: 'linear-gradient(to bottom, rgba(255,255,255,0.3), transparent)',
            animation: 'scrollPulse 2s ease-in-out infinite',
          }} />
        </div>
      </section>

      {/* ════════════════════════════════════════
          STATS BAR
      ════════════════════════════════════════ */}
      <section style={{
        background: 'linear-gradient(135deg, #1e3a8a, #1d4ed8)',
        padding: '48px 24px',
      }}>
        <div style={{
          maxWidth: '1100px', margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '32px',
          textAlign: 'center',
        }}>
          {stats.map(({ value, labelKey }, i) => (
            <div key={i}>
              <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#ffffff', lineHeight: 1 }}>
                {value}
              </div>
              <div style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.75)', marginTop: '8px', fontWeight: 500 }}>
                {t(labelKey)}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════
          SERVICES
      ════════════════════════════════════════ */}
      <section style={{ background: '#f8fafc', padding: '100px 24px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <p style={{
              fontSize: '0.8rem', fontWeight: 700, color: '#2563eb',
              letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '12px',
            }}>
              {t('servicesLabel')}
            </p>
            <h2 style={{
              fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
              fontWeight: 800, color: '#0f172a',
              letterSpacing: '-0.02em', lineHeight: 1.2, marginBottom: '16px',
            }}>
              {t('servicesTitle')}
            </h2>
            <p style={{ color: '#64748b', maxWidth: '540px', margin: '0 auto', lineHeight: 1.7, fontSize: '1.05rem' }}>
              {t('servicesSubtitle')}
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '28px',
          }}>
            {services.map(({ icon, titleKey, descKey }, i) => (
              <div
                key={i}
                style={{
                  background: '#ffffff',
                  borderRadius: '20px',
                  padding: '36px 28px',
                  boxShadow: '0 4px 24px rgba(15,23,42,0.07)',
                  border: '1px solid rgba(15,23,42,0.06)',
                  transition: 'transform 0.25s, box-shadow 0.25s',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(-6px)';
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 16px 48px rgba(37,99,235,0.13)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 24px rgba(15,23,42,0.07)';
                }}
              >
                <div style={{
                  width: '56px', height: '56px', borderRadius: '16px',
                  background: 'linear-gradient(135deg, #eff6ff, #dbeafe)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.6rem', marginBottom: '20px',
                }}>
                  {icon}
                </div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a', marginBottom: '10px', lineHeight: 1.3 }}>
                  {t(titleKey)}
                </h3>
                <p style={{ color: '#64748b', lineHeight: 1.65, fontSize: '0.925rem' }}>
                  {t(descKey)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          TRUST / FAQ / METRICS
      ════════════════════════════════════════ */}
      <TrustSection />

      {/* ════════════════════════════════════════
          CTA BANNER
      ════════════════════════════════════════ */}
      <section style={{
        background: 'linear-gradient(135deg, #0a1228 0%, #0f2060 50%, #0a1228 100%)',
        padding: '100px 24px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div aria-hidden style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(37,99,235,0.15) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(96,165,250,0.1) 0%, transparent 50%)',
          pointerEvents: 'none',
        }} />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '700px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)',
            fontWeight: 800, color: '#ffffff',
            lineHeight: 1.2, marginBottom: '20px', letterSpacing: '-0.02em',
          }}>
            {t('ctaTitle')}
          </h2>
          <p style={{
            fontSize: '1.1rem', color: 'rgba(255,255,255,0.7)',
            lineHeight: 1.7, marginBottom: '40px',
          }}>
            {t('ctaDesc')}
          </p>
          <Link
            href="/pre-application"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '1.05rem',
              fontWeight: 700,
              color: '#ffffff',
              background: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
              padding: '18px 44px',
              borderRadius: '14px',
              textDecoration: 'none',
              boxShadow: '0 8px 32px rgba(37,99,235,0.55)',
              transition: 'transform 0.2s, box-shadow 0.2s',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
              (e.currentTarget as HTMLElement).style.boxShadow = '0 14px 48px rgba(37,99,235,0.7)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
              (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 32px rgba(37,99,235,0.55)';
            }}
          >
            {t('ctaButton')} →
          </Link>
        </div>
      </section>

      {/* Keyframe styles */}
      <style>{`
        @keyframes blobFloat {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(20px, -20px) scale(1.04); }
          66% { transform: translate(-15px, 15px) scale(0.97); }
        }
        @keyframes scrollPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
      `}</style>
    </>
  );
}

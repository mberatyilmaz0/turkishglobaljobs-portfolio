'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import type {
  HomeStatsContent,
  HomeServicesContent,
  HomeProcessContent,
  HomeFaqContent,
} from '@/lib/contentDefaults';

const PROCESS_STEPS = [
  { icon: '📋', colorFrom: '#2563eb', colorTo: '#1d4ed8' },
  { icon: '🔍', colorFrom: '#0891b2', colorTo: '#0e7490' },
  { icon: '📑', colorFrom: '#7c3aed', colorTo: '#6d28d9' },
  { icon: '✈️', colorFrom: '#059669', colorTo: '#047857' },
] as const;

const METRICS = [
  { value: '500+', icon: '👤' },
  { value: '98%', icon: '⭐' },
  { value: '7+', icon: '📅' },
  { value: '3', icon: '🌐' },
] as const;

type Props = {
  stats: HomeStatsContent;
  services: HomeServicesContent;
  process: HomeProcessContent;
  faq: HomeFaqContent;
};

export default function HomeClient({ stats, services, process, faq }: Props) {
  const t = useTranslations('home');
  const tTrust = useTranslations('trust');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // İstatistik şeridini gizle: tüm değerler boşsa
const allStatsEmpty = Array.isArray(stats?.items) ? stats.items.every((s) => !s.value && !s.label) : true;
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
            width: '100%',
            margin: '0 auto',
            padding: '80px 16px 60px',
            boxSizing: 'border-box',
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
              fontSize: 'clamp(1.8rem, 5.5vw, 3.75rem)',
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
              fontSize: 'clamp(0.95rem, 2vw, 1.25rem)',
              color: 'rgba(255,255,255,0.7)',
              lineHeight: 1.7,
              maxWidth: '640px',
              margin: '0 auto 48px',
            }}
          >
            {t('heroSubtitle')}
          </p>

          {/* CTA Buttons */}
          <div className="hero-cta-row">
            <Link
              href="/pre-application"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
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
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
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
          STATS BAR — boşsa gizle
      ════════════════════════════════════════ */}
      {!allStatsEmpty && (
        <section style={{
          background: 'linear-gradient(135deg, #1e3a8a, #1d4ed8)',
          padding: '48px 16px',
        }}>
          <div style={{
            maxWidth: '1100px', margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            gap: '32px',
            textAlign: 'center',
          }}>
            {stats.items.map(({ value, label }, i) => (
              <div key={i}>
                <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#ffffff', lineHeight: 1 }}>
                  {value}
                </div>
                <div style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.75)', marginTop: '8px', fontWeight: 500 }}>
                  {label}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ════════════════════════════════════════
          SERVICES
      ════════════════════════════════════════ */}
      <section style={{ background: '#f8fafc', padding: '80px 16px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <p style={{
              fontSize: '0.8rem', fontWeight: 700, color: '#2563eb',
              letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '12px',
            }}>
              {services.label}
            </p>
            <h2 style={{
              fontSize: 'clamp(1.5rem, 3.5vw, 2.5rem)',
              fontWeight: 800, color: '#0f172a',
              letterSpacing: '-0.02em', lineHeight: 1.2, marginBottom: '16px',
            }}>
              {services.title}
            </h2>
            <p style={{ color: '#64748b', maxWidth: '540px', margin: '0 auto', lineHeight: 1.7, fontSize: '1.05rem' }}>
              {services.subtitle}
            </p>
          </div>

          <div className="home-cards-grid">
            {services.cards.map(({ icon, title, desc }, i) => (
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
                  {title}
                </h3>
                <p style={{ color: '#64748b', lineHeight: 1.65, fontSize: '0.925rem' }}>
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          HOW IT WORKS (PROCESS)
      ════════════════════════════════════════ */}
      <section
        id="how-it-works"
        style={{ background: '#f8fafc', padding: '80px 16px' }}
      >
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          {/* Heading */}
          <div style={{ textAlign: 'center', marginBottom: '72px' }}>
            <p style={{
              fontSize: '0.78rem', fontWeight: 700, color: '#2563eb',
              letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '12px',
            }}>
              {process.label}
            </p>
            <h2 style={{
              fontSize: 'clamp(1.5rem, 3.5vw, 2.5rem)',
              fontWeight: 800, color: '#0f172a',
              letterSpacing: '-0.02em', lineHeight: 1.2, marginBottom: '16px',
            }}>
              {process.title}
            </h2>
            <p style={{ color: '#64748b', maxWidth: '520px', margin: '0 auto', lineHeight: 1.7 }}>
              {process.subtitle}
            </p>
          </div>

          {/* Steps grid */}
          <div className="home-cards-grid">
            {PROCESS_STEPS.map(({ icon, colorFrom, colorTo }, i) => {
              const step = process.steps[i];
              if (!step) return null;
              return (
                <div
                  key={i}
                  style={{
                    position: 'relative',
                    background: '#ffffff',
                    borderRadius: '20px',
                    padding: '36px 28px',
                    boxShadow: '0 4px 24px rgba(15,23,42,0.07)',
                    border: '1px solid rgba(15,23,42,0.06)',
                    transition: 'transform 0.25s, box-shadow 0.25s',
                    cursor: 'default',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.transform = 'translateY(-6px)';
                    (e.currentTarget as HTMLElement).style.boxShadow = `0 16px 48px rgba(37,99,235,0.13)`;
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                    (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 24px rgba(15,23,42,0.07)';
                  }}
                >
                  {/* Step number badge */}
                  <div style={{
                    position: 'absolute', top: '-14px', left: '28px',
                    width: '28px', height: '28px',
                    background: `linear-gradient(135deg, ${colorFrom}, ${colorTo})`,
                    borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '0.7rem', fontWeight: 800, color: '#fff',
                    boxShadow: `0 4px 12px ${colorFrom}66`,
                  }}>
                    {i + 1}
                  </div>

                  {/* Icon */}
                  <div style={{
                    width: '60px', height: '60px', borderRadius: '18px',
                    background: `linear-gradient(135deg, ${colorFrom}18, ${colorTo}10)`,
                    border: `1px solid ${colorFrom}22`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '1.75rem', marginBottom: '20px',
                  }}>
                    {icon}
                  </div>

                  <h3 style={{
                    fontSize: '1rem', fontWeight: 700, color: '#0f172a',
                    marginBottom: '10px', lineHeight: 1.3,
                  }}>
                    {step.title}
                  </h3>
                  <p style={{ color: '#64748b', lineHeight: 1.65, fontSize: '0.9rem' }}>
                    {step.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          SUCCESS METRICS
      ════════════════════════════════════════ */}
      <section
        id="metrics"
        style={{
          background: 'linear-gradient(135deg, #0a1228 0%, #0f2060 50%, #0a1228 100%)',
          padding: '80px 16px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div aria-hidden style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: 'radial-gradient(circle at 25% 50%, rgba(37,99,235,0.18) 0%, transparent 55%), radial-gradient(circle at 75% 50%, rgba(96,165,250,0.12) 0%, transparent 55%)',
        }} />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <p style={{
              fontSize: '0.78rem', fontWeight: 700, color: '#60a5fa',
              letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '12px',
            }}>
              {tTrust('metricsLabel')}
            </p>
            <h2 style={{
              fontSize: 'clamp(1.4rem, 3vw, 2.25rem)',
              fontWeight: 800, color: '#ffffff',
              letterSpacing: '-0.02em', lineHeight: 1.2,
            }}>
              {tTrust('metricsTitle')}
            </h2>
          </div>

          <div className="home-cards-grid">
            {METRICS.map(({ value, icon }, i) => (
              <div
                key={i}
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '20px',
                  padding: '36px 24px',
                  backdropFilter: 'blur(8px)',
                  textAlign: 'center',
                  transition: 'background 0.25s, transform 0.25s',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.1)';
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.05)';
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                }}
              >
                <div style={{ fontSize: '2rem', marginBottom: '12px' }}>{icon}</div>
                <div style={{
                  fontSize: '2.75rem', fontWeight: 800, color: '#ffffff',
                  lineHeight: 1, marginBottom: '8px',
                  background: 'linear-gradient(135deg, #ffffff, #93c5fd)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}>
                  {value}
                </div>
                <div style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.65)', fontWeight: 500 }}>
                  {tTrust(`metric${i + 1}` as `metric${1 | 2 | 3 | 4}`)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          FAQ
      ════════════════════════════════════════ */}
      <section
        id="faq"
        style={{ background: '#ffffff', padding: '80px 16px' }}
      >
        <div style={{ maxWidth: '780px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <p style={{
              fontSize: '0.78rem', fontWeight: 700, color: '#2563eb',
              letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '12px',
            }}>
              {faq.label}
            </p>
            <h2 style={{
              fontSize: 'clamp(1.5rem, 3.5vw, 2.5rem)',
              fontWeight: 800, color: '#0f172a',
              letterSpacing: '-0.02em', lineHeight: 1.2, marginBottom: '16px',
            }}>
              {faq.title}
            </h2>
            <p style={{ color: '#64748b', lineHeight: 1.7 }}>
              {faq.subtitle}
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {faq.items.map((item, i) => {
              const isOpen = openFaq === i;
              return (
                <div
                  key={i}
                  style={{
                    border: isOpen ? '1px solid rgba(37,99,235,0.4)' : '1px solid rgba(15,23,42,0.08)',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    boxShadow: isOpen ? '0 8px 32px rgba(37,99,235,0.1)' : 'none',
                    transition: 'border-color 0.2s, box-shadow 0.2s',
                  }}
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '20px 24px',
                      background: isOpen ? 'rgba(37,99,235,0.04)' : '#ffffff',
                      border: 'none',
                      cursor: 'pointer',
                      textAlign: 'left',
                      gap: '16px',
                      transition: 'background 0.2s',
                    }}
                  >
                    <span style={{
                      fontSize: '0.975rem', fontWeight: 600,
                      color: isOpen ? '#1d4ed8' : '#0f172a',
                      lineHeight: 1.4,
                    }}>
                      {item.q}
                    </span>
                    <span style={{
                      flexShrink: 0,
                      width: '28px', height: '28px',
                      borderRadius: '50%',
                      background: isOpen ? 'linear-gradient(135deg, #2563eb, #1d4ed8)' : 'rgba(15,23,42,0.06)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '0.85rem', color: isOpen ? '#fff' : '#64748b',
                      transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                      transition: 'transform 0.25s, background 0.2s, color 0.2s',
                    }}>
                      +
                    </span>
                  </button>

                  <div style={{
                    maxHeight: isOpen ? '300px' : '0',
                    overflow: 'hidden',
                    transition: 'max-height 0.3s ease',
                  }}>
                    <p style={{
                      padding: '0 24px 24px',
                      color: '#475569',
                      lineHeight: 1.75,
                      fontSize: '0.925rem',
                      margin: 0,
                    }}>
                      {item.a}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          CTA BANNER
      ════════════════════════════════════════ */}
      <section style={{
        background: 'linear-gradient(135deg, #0a1228 0%, #0f2060 50%, #0a1228 100%)',
        padding: '80px 16px',
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
            fontSize: 'clamp(1.5rem, 3.5vw, 2.75rem)',
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

      {/* Keyframe styles + mobil responsive */}
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
        .hero-cta-row {
          display: flex;
          gap: 16px;
          justify-content: center;
          flex-wrap: wrap;
        }
        .home-cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 28px;
        }
        @media (max-width: 767px) {
          .hero-cta-row {
            flex-direction: column;
            align-items: stretch;
            gap: 12px;
          }
          .hero-cta-row a {
            width: 100% !important;
            box-sizing: border-box;
          }
          .home-cards-grid {
            grid-template-columns: 1fr;
          }
        }
        @media (min-width: 768px) and (max-width: 1023px) {
          .home-cards-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>
    </>
  );
}

'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';

/* ─── Step Timeline ─────────────────────────────────────── */
const STEPS = [
  { icon: '📋', colorFrom: '#2563eb', colorTo: '#1d4ed8' },
  { icon: '🔍', colorFrom: '#0891b2', colorTo: '#0e7490' },
  { icon: '📑', colorFrom: '#7c3aed', colorTo: '#6d28d9' },
  { icon: '✈️', colorFrom: '#059669', colorTo: '#047857' },
] as const;

/* ─── Metrics ────────────────────────────────────────────── */
const METRICS = [
  { value: '500+', icon: '👤' },
  { value: '98%',  icon: '⭐' },
  { value: '7+',   icon: '📅' },
  { value: '3',    icon: '🌐' },
] as const;

/* ─── FAQ ────────────────────────────────────────────────── */
const FAQ_COUNT = 5;

export default function TrustSection() {
  const t = useTranslations('trust');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div>
      {/* ════════════════════════════════════════
          HOW IT WORKS
      ════════════════════════════════════════ */}
      <section
        id="how-it-works"
        style={{ background: '#f8fafc', padding: '100px 24px' }}
      >
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          {/* Heading */}
          <div style={{ textAlign: 'center', marginBottom: '72px' }}>
            <p style={{
              fontSize: '0.78rem', fontWeight: 700, color: '#2563eb',
              letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '12px',
            }}>
              {t('howLabel')}
            </p>
            <h2 style={{
              fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
              fontWeight: 800, color: '#0f172a',
              letterSpacing: '-0.02em', lineHeight: 1.2, marginBottom: '16px',
            }}>
              {t('howTitle')}
            </h2>
            <p style={{ color: '#64748b', maxWidth: '520px', margin: '0 auto', lineHeight: 1.7 }}>
              {t('howSubtitle')}
            </p>
          </div>

          {/* Steps grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '32px',
            position: 'relative',
          }}>
            {STEPS.map(({ icon, colorFrom, colorTo }, i) => (
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
                  {t(`step${i + 1}Title` as `step${1 | 2 | 3 | 4}Title`)}
                </h3>
                <p style={{ color: '#64748b', lineHeight: 1.65, fontSize: '0.9rem' }}>
                  {t(`step${i + 1}Desc` as `step${1 | 2 | 3 | 4}Desc`)}
                </p>
              </div>
            ))}
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
          padding: '80px 24px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* subtle radial glow */}
        <div aria-hidden style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: 'radial-gradient(circle at 25% 50%, rgba(37,99,235,0.18) 0%, transparent 55%), radial-gradient(circle at 75% 50%, rgba(96,165,250,0.12) 0%, transparent 55%)',
        }} />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: '1100px', margin: '0 auto' }}>
          {/* Heading */}
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <p style={{
              fontSize: '0.78rem', fontWeight: 700, color: '#60a5fa',
              letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '12px',
            }}>
              {t('metricsLabel')}
            </p>
            <h2 style={{
              fontSize: 'clamp(1.6rem, 3vw, 2.25rem)',
              fontWeight: 800, color: '#ffffff',
              letterSpacing: '-0.02em', lineHeight: 1.2,
            }}>
              {t('metricsTitle')}
            </h2>
          </div>

          {/* Metric cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '24px',
            textAlign: 'center',
          }}>
            {METRICS.map(({ value, icon }, i) => (
              <div
                key={i}
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '20px',
                  padding: '36px 24px',
                  backdropFilter: 'blur(8px)',
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
                  {t(`metric${i + 1}` as `metric${1 | 2 | 3 | 4}`)}
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
        style={{ background: '#ffffff', padding: '100px 24px' }}
      >
        <div style={{ maxWidth: '780px', margin: '0 auto' }}>
          {/* Heading */}
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <p style={{
              fontSize: '0.78rem', fontWeight: 700, color: '#2563eb',
              letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '12px',
            }}>
              {t('faqLabel')}
            </p>
            <h2 style={{
              fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
              fontWeight: 800, color: '#0f172a',
              letterSpacing: '-0.02em', lineHeight: 1.2, marginBottom: '16px',
            }}>
              {t('faqTitle')}
            </h2>
            <p style={{ color: '#64748b', lineHeight: 1.7 }}>
              {t('faqSubtitle')}
            </p>
          </div>

          {/* Accordion items */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {Array.from({ length: FAQ_COUNT }, (_, i) => {
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
                  {/* Question row */}
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
                      {t(`faq${i + 1}Q` as `faq${1 | 2 | 3 | 4 | 5}Q`)}
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

                  {/* Answer */}
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
                      {t(`faq${i + 1}A` as `faq${1 | 2 | 3 | 4 | 5}A`)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

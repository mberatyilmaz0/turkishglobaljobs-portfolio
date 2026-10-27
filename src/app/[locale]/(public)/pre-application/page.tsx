'use client';

import { useTranslations, useLocale } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';
import { Link } from '@/i18n/routing';

/* ─── Zod Schema ─────────────────────────────────────────── */
const schema = z.object({
  firstName:    z.string().min(2, 'En az 2 karakter'),
  lastName:     z.string().min(2, 'En az 2 karakter'),
  email:        z.string().email('Geçerli e-posta giriniz'),
  phone:        z.string().min(7,  'Geçerli telefon giriniz'),
  purpose:      z.string().min(1, 'Lütfen seçiniz'),
  education:    z.string().min(1, 'Lütfen seçiniz'),
  germanLevel:  z.string().min(1, 'Lütfen seçiniz'),
  note:         z.string().optional(),
});

type FormData = z.infer<typeof schema>;

/* ─── Constants ──────────────────────────────────────────── */
const PURPOSES  = ['job', 'university', 'ausbildung', 'opportunityCard', 'blueCard', 'other'] as const;
const EDUCATIONS = ['highschool', 'associate', 'bachelor', 'master', 'phd', 'vocational'] as const;
const LEVELS    = ['none', 'A1', 'A2', 'B1', 'B2', 'C1', 'C2'] as const;

/* ─── Helper: field wrapper style ───────────────────────── */
const fieldWrap: React.CSSProperties = {
  display: 'flex', flexDirection: 'column', gap: '6px',
};
const labelStyle: React.CSSProperties = {
  fontSize: '0.85rem', fontWeight: 600, color: '#374151',
};
const inputBase: React.CSSProperties = {
  padding: '12px 16px',
  borderRadius: '12px',
  border: '1px solid #e2e8f0',
  fontSize: '0.95rem',
  color: '#0f172a',
  background: '#ffffff',
  outline: 'none',
  transition: 'border-color 0.2s, box-shadow 0.2s',
  width: '100%',
  boxSizing: 'border-box',
};
const errStyle: React.CSSProperties = {
  fontSize: '0.78rem', color: '#ef4444', marginTop: '2px',
};

/* ─── Component ──────────────────────────────────────────── */
export default function OnBasvuruPage() {
  const t  = useTranslations('application');
  const tc = useTranslations('common');
  const locale = useLocale();
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    // Simulate async send (replace with API call later)
    await new Promise(r => setTimeout(r, 900));
    console.log('Ön Başvuru:', data);
    setSubmitted(true);
  };

  /* ─── Success Screen ─── */
  if (submitted) {
    return (
      <main style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0a1228 0%, #0f2060 50%, #0a1228 100%)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '24px',
        paddingTop: '96px',
      }}>
        <div style={{
          background: '#ffffff',
          borderRadius: '28px',
          padding: '56px 48px',
          textAlign: 'center',
          maxWidth: '520px',
          width: '100%',
          boxShadow: '0 32px 80px rgba(0,0,0,0.35)',
        }}>
          <div style={{
            width: '80px', height: '80px', borderRadius: '50%',
            background: 'linear-gradient(135deg, #dcfce7, #bbf7d0)',
            border: '3px solid #22c55e',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '2.2rem', margin: '0 auto 28px',
          }}>✓</div>

          <h1 style={{
            fontSize: '1.75rem', fontWeight: 800, color: '#0f172a',
            marginBottom: '16px', lineHeight: 1.2,
          }}>
            {t('successTitle')}
          </h1>
          <p style={{
            color: '#64748b', lineHeight: 1.7, fontSize: '1rem', marginBottom: '36px',
          }}>
            {t('successDesc')}
          </p>

          <div style={{
            display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap',
          }}>
            <Link
              href="/"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '6px',
                fontSize: '0.925rem', fontWeight: 600, color: '#ffffff',
                background: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
                padding: '12px 28px', borderRadius: '10px', textDecoration: 'none',
              }}
            >
              {tc('home')}
            </Link>
            <Link
              href="/almanya-is"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '6px',
                fontSize: '0.925rem', fontWeight: 600, color: '#374151',
                background: '#f1f5f9',
                padding: '12px 28px', borderRadius: '10px', textDecoration: 'none',
              }}
            >
              {tc('germanyJobs')}
            </Link>
          </div>
        </div>
      </main>
    );
  }

  /* ─── Form ─── */
  return (
    <main style={{
      minHeight: '100vh',
      background: 'linear-gradient(170deg, #0a1228 0%, #0f2060 35%, #f8fafc 35%)',
      paddingTop: '72px',
    }}>
      <div style={{ maxWidth: '760px', margin: '0 auto', padding: '60px 24px 100px' }}>

        {/* ── Page header ── */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <p style={{
            fontSize: '0.78rem', fontWeight: 700, color: '#93c5fd',
            letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '12px',
          }}>
            {t('badge')}
          </p>
          <h1 style={{
            fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
            fontWeight: 800, color: '#ffffff',
            lineHeight: 1.15, letterSpacing: '-0.02em', marginBottom: '16px',
          }}>
            {t('pageTitle')}
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.65)', lineHeight: 1.7, fontSize: '1.05rem', maxWidth: '540px', margin: '0 auto' }}>
            {t('pageSubtitle')}
          </p>
        </div>

        {/* ── Card ── */}
        <div style={{
          background: '#ffffff',
          borderRadius: '28px',
          padding: 'clamp(28px, 5vw, 52px)',
          boxShadow: '0 24px 80px rgba(15,23,42,0.18)',
          border: '1px solid rgba(15,23,42,0.06)',
        }}>
          {/* Progress bar decoration */}
          <div style={{
            display: 'flex', gap: '6px', marginBottom: '36px',
          }}>
            {[1,2,3].map(s => (
              <div key={s} style={{
                flex: 1, height: '4px', borderRadius: '4px',
                background: s === 1 ? 'linear-gradient(90deg, #2563eb, #60a5fa)' : '#e2e8f0',
              }} />
            ))}
          </div>

          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            {/* ─ Name row ─ */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
              <div style={fieldWrap}>
                <label style={labelStyle}>{t('firstName')}</label>
                <input
                  {...register('firstName')}
                  placeholder="Ahmet"
                  style={{ ...inputBase, borderColor: errors.firstName ? '#fca5a5' : '#e2e8f0' }}
                  onFocus={e => { e.target.style.borderColor = '#2563eb'; e.target.style.boxShadow = '0 0 0 3px rgba(37,99,235,0.12)'; }}
                  onBlur={e  => { e.target.style.borderColor = errors.firstName ? '#fca5a5' : '#e2e8f0'; e.target.style.boxShadow = 'none'; }}
                />
                {errors.firstName && <span style={errStyle}>{errors.firstName.message}</span>}
              </div>
              <div style={fieldWrap}>
                <label style={labelStyle}>{t('lastName')}</label>
                <input
                  {...register('lastName')}
                  placeholder="Yılmaz"
                  style={{ ...inputBase, borderColor: errors.lastName ? '#fca5a5' : '#e2e8f0' }}
                  onFocus={e => { e.target.style.borderColor = '#2563eb'; e.target.style.boxShadow = '0 0 0 3px rgba(37,99,235,0.12)'; }}
                  onBlur={e  => { e.target.style.borderColor = errors.lastName ? '#fca5a5' : '#e2e8f0'; e.target.style.boxShadow = 'none'; }}
                />
                {errors.lastName && <span style={errStyle}>{errors.lastName.message}</span>}
              </div>
            </div>

            {/* ─ Email + Phone row ─ */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
              <div style={fieldWrap}>
                <label style={labelStyle}>{t('email')}</label>
                <input
                  {...register('email')}
                  type="email"
                  placeholder="ahmet@example.com"
                  style={{ ...inputBase, borderColor: errors.email ? '#fca5a5' : '#e2e8f0' }}
                  onFocus={e => { e.target.style.borderColor = '#2563eb'; e.target.style.boxShadow = '0 0 0 3px rgba(37,99,235,0.12)'; }}
                  onBlur={e  => { e.target.style.borderColor = errors.email ? '#fca5a5' : '#e2e8f0'; e.target.style.boxShadow = 'none'; }}
                />
                {errors.email && <span style={errStyle}>{errors.email.message}</span>}
              </div>
              <div style={fieldWrap}>
                <label style={labelStyle}>{t('phone')}</label>
                <input
                  {...register('phone')}
                  type="tel"
                  placeholder="+90 555 000 00 00"
                  style={{ ...inputBase, borderColor: errors.phone ? '#fca5a5' : '#e2e8f0' }}
                  onFocus={e => { e.target.style.borderColor = '#2563eb'; e.target.style.boxShadow = '0 0 0 3px rgba(37,99,235,0.12)'; }}
                  onBlur={e  => { e.target.style.borderColor = errors.phone ? '#fca5a5' : '#e2e8f0'; e.target.style.boxShadow = 'none'; }}
                />
                {errors.phone && <span style={errStyle}>{errors.phone.message}</span>}
              </div>
            </div>

            {/* ─ Purpose ─ */}
            <div style={{ ...fieldWrap, marginBottom: '16px' }}>
              <label style={labelStyle}>{t('purposeLabel')}</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '10px' }}>
                {PURPOSES.map(p => (
                  <label
                    key={p}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '10px',
                      padding: '12px 14px', borderRadius: '12px',
                      border: '1px solid #e2e8f0', cursor: 'pointer',
                      fontSize: '0.875rem', color: '#374151', fontWeight: 500,
                      transition: 'border-color 0.15s, background 0.15s',
                    }}
                  >
                    <input
                      {...register('purpose')}
                      type="radio"
                      value={p}
                      style={{ accentColor: '#2563eb', width: '16px', height: '16px', flexShrink: 0 }}
                    />
                    {t(`purpose_${p}` as any)}
                  </label>
                ))}
              </div>
              {errors.purpose && <span style={errStyle}>{errors.purpose.message}</span>}
            </div>

            {/* ─ Education ─ */}
            <div style={{ ...fieldWrap, marginBottom: '16px' }}>
              <label style={labelStyle}>{t('educationLabel')}</label>
              <select
                {...register('education')}
                style={{ ...inputBase, borderColor: errors.education ? '#fca5a5' : '#e2e8f0', appearance: 'none',
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%2364748b' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`,
                  backgroundRepeat: 'no-repeat', backgroundPosition: 'right 16px center',
                  paddingRight: '40px',
                }}
              >
                <option value="">{t('selectPlaceholder')}</option>
                {EDUCATIONS.map(e => (
                  <option key={e} value={e}>{t(`edu_${e}` as any)}</option>
                ))}
              </select>
              {errors.education && <span style={errStyle}>{errors.education.message}</span>}
            </div>

            {/* ─ German Level ─ */}
            <div style={{ ...fieldWrap, marginBottom: '24px' }}>
              <label style={labelStyle}>{t('germanLevelLabel')}</label>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {LEVELS.map(lv => (
                  <label
                    key={lv}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '6px',
                      padding: '10px 18px', borderRadius: '100px',
                      border: '1px solid #e2e8f0', cursor: 'pointer',
                      fontSize: '0.875rem', fontWeight: 600, color: '#374151',
                      transition: 'all 0.15s',
                    }}
                  >
                    <input
                      {...register('germanLevel')}
                      type="radio"
                      value={lv}
                      style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }}
                    />
                    {lv === 'none' ? t('levelNone') : lv}
                  </label>
                ))}
              </div>
              {errors.germanLevel && <span style={errStyle}>{errors.germanLevel.message}</span>}
            </div>

            {/* ─ Note ─ */}
            <div style={{ ...fieldWrap, marginBottom: '32px' }}>
              <label style={labelStyle}>{t('noteLabel')} <span style={{ color: '#94a3b8', fontWeight: 400 }}>({t('optional')})</span></label>
              <textarea
                {...register('note')}
                rows={4}
                placeholder={t('notePlaceholder')}
                style={{ ...inputBase, resize: 'vertical', minHeight: '100px', lineHeight: 1.6 }}
                onFocus={e => { e.target.style.borderColor = '#2563eb'; e.target.style.boxShadow = '0 0 0 3px rgba(37,99,235,0.12)'; }}
                onBlur={e  => { e.target.style.borderColor = '#e2e8f0'; e.target.style.boxShadow = 'none'; }}
              />
            </div>

            {/* ─ Trust row ─ */}
            <div style={{
              display: 'flex', gap: '20px', flexWrap: 'wrap',
              padding: '16px 20px', borderRadius: '14px',
              background: 'linear-gradient(135deg, #eff6ff, #f0fdf4)',
              border: '1px solid rgba(37,99,235,0.12)',
              marginBottom: '28px',
            }}>
              {[t('trust1'), t('trust2'), t('trust3')].map((label, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.825rem', color: '#374151', fontWeight: 500 }}>
                  <span style={{ color: '#22c55e', fontSize: '1rem' }}>✓</span>
                  {label}
                </div>
              ))}
            </div>

            {/* ─ Submit ─ */}
            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                width: '100%',
                padding: '16px 24px',
                borderRadius: '14px',
                border: 'none',
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                background: isSubmitting
                  ? '#94a3b8'
                  : 'linear-gradient(135deg, #2563eb, #1d4ed8)',
                color: '#ffffff',
                fontSize: '1rem',
                fontWeight: 700,
                letterSpacing: '0.01em',
                boxShadow: isSubmitting ? 'none' : '0 8px 24px rgba(37,99,235,0.4)',
                transition: 'opacity 0.2s, transform 0.2s',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
              }}
            >
              {isSubmitting ? (
                <>
                  <span style={{
                    width: '18px', height: '18px', borderRadius: '50%',
                    border: '2px solid rgba(255,255,255,0.4)',
                    borderTopColor: '#fff',
                    animation: 'spin 0.7s linear infinite',
                    display: 'inline-block',
                  }} />
                  {t('submitting')}
                </>
              ) : (
                <>{t('submitBtn')} →</>
              )}
            </button>

            <p style={{ textAlign: 'center', color: '#94a3b8', fontSize: '0.78rem', marginTop: '16px' }}>
              🔒 {t('privacyNote')}
            </p>
          </form>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @media (max-width: 600px) {
          form > div:first-of-type,
          form > div:nth-of-type(2) {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </main>
  );
}

'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import AppIcon from '@/components/ui/AppIcon';
import CvUpload from '@/components/forms/CvUpload';
import { trackLead } from '@/lib/analytics';

export default function ContactForm() {
  const t  = useTranslations('contactPage');
  const ta = useTranslations('application');

  const [cvFile, setCvFile]       = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent]           = useState(false);
  const [error, setError]         = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    const form = e.currentTarget;
    const fd = new FormData(form);
    fd.append('kaynak', 'iletisim');
    if (cvFile) fd.append('cv', cvFile);

    try {
      const res  = await fetch('/api/send-mail', { method: 'POST', body: fd });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json.success) throw new Error(json.error ?? 'Mail gönderilemedi. Lütfen tekrar deneyin.');
      // GA4 dönüşümü: iletişim formu gönderildi
      trackLead('iletisim', { has_cv: !!cvFile });
      setSent(true);
      form.reset();
      setCvFile(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Mail gönderilemedi. Lütfen tekrar deneyin.');
    } finally {
      setSubmitting(false);
    }
  };

  if (sent) {
    return (
      <div className="cf-card cf-success">
        <div className="cf-success-icon"><AppIcon name="check" size={34} strokeWidth={2.4} /></div>
        <h2 style={{ margin: '0 0 8px', fontSize: '1.4rem', fontWeight: 800, color: '#0f172a' }}>{t('successTitle')}</h2>
        <p style={{ margin: '0 0 24px', color: '#64748b' }}>{t('successDesc')}</p>
        <button type="button" className="cf-btn cf-btn--light" onClick={() => setSent(false)}>
          {t('sendAnother')}
        </button>
        <style>{styles}</style>
      </div>
    );
  }

  return (
    <div className="cf-card">
      <h2 style={{ margin: '0 0 6px', fontSize: '1.5rem', fontWeight: 800, color: '#0f172a' }}>{t('formTitle')}</h2>
      <p style={{ margin: '0 0 28px', color: '#64748b', lineHeight: 1.6 }}>{t('formSubtitle')}</p>

      <form onSubmit={handleSubmit}>
        <div className="cf-row">
          <div className="cf-field">
            <label className="cf-label" htmlFor="cf-ad">{ta('firstName')}</label>
            <input id="cf-ad" name="ad" className="cf-input" required minLength={2} maxLength={100} autoComplete="given-name" />
          </div>
          <div className="cf-field">
            <label className="cf-label" htmlFor="cf-soyad">{ta('lastName')}</label>
            <input id="cf-soyad" name="soyad" className="cf-input" required minLength={2} maxLength={100} autoComplete="family-name" />
          </div>
        </div>

        <div className="cf-row">
          <div className="cf-field">
            <label className="cf-label" htmlFor="cf-eposta">{ta('email')}</label>
            <input id="cf-eposta" name="eposta" type="email" className="cf-input" required maxLength={254} autoComplete="email" />
          </div>
          <div className="cf-field">
            <label className="cf-label" htmlFor="cf-telefon">
              {ta('phone')} <span style={{ color: '#94a3b8', fontWeight: 400 }}>({ta('optional')})</span>
            </label>
            <input id="cf-telefon" name="telefon" type="tel" className="cf-input" maxLength={40} autoComplete="tel" />
          </div>
        </div>

        <div className="cf-field" style={{ marginBottom: 16 }}>
          <label className="cf-label" htmlFor="cf-not">{t('messageLabel')}</label>
          <textarea
            id="cf-not"
            name="not"
            className="cf-input"
            rows={5}
            required
            maxLength={3000}
            placeholder={t('messagePlaceholder')}
            style={{ resize: 'vertical', minHeight: 120, lineHeight: 1.6 }}
          />
        </div>

        <div style={{ marginBottom: 24 }}>
          <CvUpload file={cvFile} onChange={setCvFile} />
        </div>

        <button type="submit" className="cf-btn" disabled={submitting}>
          {submitting ? (
            <>
              <span className="cf-spinner" />
              {t('submitting')}
            </>
          ) : (
            <>{t('submitBtn')} →</>
          )}
        </button>

        {error && (
          <div className="cf-error">
            <AppIcon name="warning" size={18} style={{ flexShrink: 0 }} /> {error}
          </div>
        )}
      </form>

      <style>{styles}</style>
    </div>
  );
}

const styles = `
  .cf-card {
    background: #ffffff; border-radius: 24px; padding: clamp(24px, 5vw, 44px);
    box-shadow: 0 16px 50px rgba(15,23,42,0.10); border: 1px solid rgba(15,23,42,0.06);
    max-width: 760px; margin: 48px auto 0;
  }
  .cf-success { text-align: center; }
  .cf-success-icon {
    width: 68px; height: 68px; border-radius: 50%; margin: 0 auto 20px;
    display: flex; align-items: center; justify-content: center;
    background: linear-gradient(135deg, #dcfce7, #bbf7d0); border: 3px solid #22c55e; color: #16a34a;
  }
  .cf-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px; }
  .cf-field { display: flex; flex-direction: column; gap: 6px; }
  .cf-label { font-size: 0.85rem; font-weight: 600; color: #374151; }
  .cf-input {
    padding: 12px 16px; border-radius: 12px; border: 1px solid #e2e8f0; font-size: 0.95rem;
    color: #0f172a; background: #fff; outline: none; width: 100%; box-sizing: border-box;
    font-family: inherit; transition: border-color .2s, box-shadow .2s;
  }
  .cf-input:focus { border-color: #2563eb; box-shadow: 0 0 0 3px rgba(37,99,235,0.12); }
  .cf-btn {
    width: 100%; padding: 15px 24px; border-radius: 14px; border: none; cursor: pointer;
    background: linear-gradient(135deg, #2563eb, #1d4ed8); color: #fff; font-size: 1rem; font-weight: 700;
    box-shadow: 0 8px 24px rgba(37,99,235,0.35); display: flex; align-items: center; justify-content: center; gap: 10px;
    transition: transform .15s, opacity .2s;
  }
  .cf-btn:hover:not(:disabled) { transform: translateY(-1px); }
  .cf-btn:disabled { background: #94a3b8; box-shadow: none; cursor: not-allowed; }
  .cf-btn--light { width: auto; display: inline-flex; background: #f1f5f9; color: #374151; box-shadow: none; padding: 12px 28px; }
  .cf-spinner {
    width: 18px; height: 18px; border-radius: 50%; display: inline-block;
    border: 2px solid rgba(255,255,255,0.4); border-top-color: #fff; animation: cfSpin .7s linear infinite;
  }
  .cf-error {
    display: flex; align-items: center; justify-content: center; gap: 8px; margin-top: 16px;
    padding: 14px 18px; border-radius: 12px; background: #fef2f2; border: 1px solid #fecaca;
    color: #b91c1c; font-size: 0.875rem; font-weight: 500; text-align: center;
  }
  @keyframes cfSpin { to { transform: rotate(360deg); } }
  @media (max-width: 600px) { .cf-row { grid-template-columns: 1fr; } }
`;

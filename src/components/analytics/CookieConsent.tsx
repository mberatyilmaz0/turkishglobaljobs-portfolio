'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { CONSENT_STORAGE_KEY, GA_ENABLED, updateConsent } from '@/lib/analytics';

export default function CookieConsent() {
  const t = useTranslations('cookie');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!GA_ENABLED) return;
    let stored: string | null = null;
    try {
      stored = localStorage.getItem(CONSENT_STORAGE_KEY);
    } catch {
      // depolama erişilemezse banner yine gösterilir
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect -- localStorage yalnızca istemcide okunabilir
    if (stored !== 'granted' && stored !== 'denied') setVisible(true);
  }, []);

  const choose = (granted: boolean) => {
    try {
      localStorage.setItem(CONSENT_STORAGE_KEY, granted ? 'granted' : 'denied');
    } catch {
      // yoksay
    }
    updateConsent(granted);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="cc-banner" role="dialog" aria-live="polite" aria-label={t('title')}>
      <p className="cc-text">{t('text')}</p>
      <div className="cc-actions">
        <button type="button" className="cc-btn cc-btn--ghost" onClick={() => choose(false)}>
          {t('reject')}
        </button>
        <button type="button" className="cc-btn cc-btn--primary" onClick={() => choose(true)}>
          {t('accept')}
        </button>
      </div>
      <style>{`
        .cc-banner {
          position: fixed; left: 16px; right: 16px; bottom: 16px; z-index: 9999;
          max-width: 720px; margin: 0 auto;
          display: flex; align-items: center; gap: 16px; flex-wrap: wrap;
          padding: 16px 20px; border-radius: 16px;
          background: #0f172a; color: #e2e8f0;
          box-shadow: 0 16px 40px rgba(0,0,0,.35);
          animation: ccIn .3s ease-out;
        }
        .cc-text { flex: 1 1 320px; margin: 0; font-size: .875rem; line-height: 1.55; }
        .cc-actions { display: flex; gap: 8px; flex-shrink: 0; }
        .cc-btn {
          border: none; cursor: pointer; font-weight: 600; font-size: .85rem;
          padding: 10px 18px; border-radius: 10px; font-family: inherit;
        }
        .cc-btn--primary { background: #2563eb; color: #fff; }
        .cc-btn--primary:hover { background: #1d4ed8; }
        .cc-btn--ghost { background: transparent; color: #cbd5e1; border: 1px solid #334155; }
        .cc-btn--ghost:hover { background: #1e293b; }
        @keyframes ccIn { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: none; } }
      `}</style>
    </div>
  );
}

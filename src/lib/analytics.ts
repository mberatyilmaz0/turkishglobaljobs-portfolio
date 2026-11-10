/**
 * Google Analytics 4 yardımcıları.
 * Ölçüm kimliği herkese açık bir değerdir (sayfa kaynağında görünür), gizli değildir.
 */
export const GA_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-XDFZZ88Q3J';

/** Yalnızca canlı ortamda ölç — yerel geliştirme verileri raporları kirletmesin */
export const GA_ENABLED = process.env.NODE_ENV === 'production' && /^G-[A-Z0-9]+$/.test(GA_ID);

export const CONSENT_STORAGE_KEY = 'tg-cookie-consent'; // 'granted' | 'denied'

type GtagFn = (...args: unknown[]) => void;

function gtag(...args: unknown[]) {
  if (typeof window === 'undefined') return;
  const g = (window as unknown as { gtag?: GtagFn }).gtag;
  if (typeof g === 'function') g(...args);
}

/**
 * Form başarıyla gönderildiğinde çağrılır.
 * GA4'ün önerilen "generate_lead" olayı → Analytics'te "Temel etkinlik" (dönüşüm) olarak işaretlenecek.
 */
export function trackLead(form: 'on_basvuru' | 'iletisim', extra?: Record<string, string | number | boolean>) {
  gtag('event', 'generate_lead', { form_name: form, ...extra });
}

/** Çerez onayı değiştiğinde Google'a bildir */
export function updateConsent(granted: boolean) {
  const value = granted ? 'granted' : 'denied';
  gtag('consent', 'update', {
    analytics_storage: value,
    ad_storage: value,
    ad_user_data: value,
    ad_personalization: value,
  });
}

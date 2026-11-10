import Script from 'next/script';
import { GA_ID, GA_ENABLED, CONSENT_STORAGE_KEY } from '@/lib/analytics';

/**
 * GA4 + Google Consent Mode v2.
 * Varsayılan: tüm depolama "denied" → ziyaretçi onay verene kadar çerez yazılmaz
 * (GDPR / KVKK). Daha önce onay verilmişse sayfa açılır açılmaz "granted" yapılır.
 */
export default function GoogleAnalytics() {
  if (!GA_ENABLED) return null;

  return (
    <>
      <Script id="ga-consent-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('consent', 'default', {
            analytics_storage: 'denied',
            ad_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied',
            wait_for_update: 500
          });
          try {
            if (localStorage.getItem('${CONSENT_STORAGE_KEY}') === 'granted') {
              gtag('consent', 'update', {
                analytics_storage: 'granted',
                ad_storage: 'granted',
                ad_user_data: 'granted',
                ad_personalization: 'granted'
              });
            }
          } catch (e) {}
          gtag('js', new Date());
          gtag('config', '${GA_ID}');
        `}
      </Script>
      <Script
        id="ga-loader"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
    </>
  );
}

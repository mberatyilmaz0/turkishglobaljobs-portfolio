/**
 * Sitenin genel (canonical) adresi ve dile göre sayfa URL'leri.
 * SEO için tüm canonical / hreflang / sitemap adresleri buradan üretilir.
 */

// Canlı site ve Search Console mülkü www'lu adresi kullanıyor — bununla aynı kalmalı
const PRODUCTION_URL = 'https://www.turkishglobaljobs.com';

function resolveSiteUrl(): string {
  const env = (process.env.NEXT_PUBLIC_SITE_URL || '').trim().replace(/\/+$/, '');
  // Canlıda yanlışlıkla localhost kalırsa Google'a localhost adresleri gitmesin
  if (!env || (process.env.NODE_ENV === 'production' && /localhost|127\.0\.0\.1/.test(env))) {
    return PRODUCTION_URL;
  }
  return env;
}

export const SITE_URL = resolveSiteUrl();

export type Locale = 'tr' | 'de';

/** Uygulama içi yol → dile özel URL yolu (routing.ts'teki pathnames ile aynı olmalı) */
const LOCALIZED_PATHS: Record<string, { tr: string; de: string }> = {
  '/': { tr: '', de: '' },
  '/jobs': { tr: '/almanya-is', de: '/arbeit-in-deutschland' },
  '/opportunity-card': { tr: '/firsat-karti', de: '/chancenkarte' },
  '/education': { tr: '/almanya-egitim', de: '/bildung-in-deutschland' },
  '/pre-application': { tr: '/on-basvuru', de: '/vorab-bewerbung' },
  '/contact': { tr: '/contact', de: '/contact' },
  '/hakkimizda': { tr: '/hakkimizda', de: '/hakkimizda' },
  '/almanya-rehberi': { tr: '/almanya-rehberi', de: '/almanya-rehberi' },
};

/** Örn: localizedUrl('tr', '/jobs') → https://turkishglobaljobs.com/tr/almanya-is */
export function localizedUrl(locale: Locale, path: keyof typeof LOCALIZED_PATHS | string): string {
  const p = LOCALIZED_PATHS[path];
  return `${SITE_URL}/${locale}${p ? p[locale] : path}`;
}

/** Domain olmadan dile özel yol. Örn: localizedPath('de', '/jobs') → /de/arbeit-in-deutschland */
export function localizedPath(locale: string, path: string): string {
  const loc: Locale = locale === 'de' ? 'de' : 'tr';
  const p = LOCALIZED_PATHS[path];
  return `/${loc}${p ? p[loc] : path}`;
}

/**
 * next-intl <Link> için ilan detay yolu (locale öneki Link tarafından eklenir).
 * Örn: jobLinkHref('de', 'abc') → /arbeit-in-deutschland/abc
 */
export function jobLinkHref(locale: string, id: string): string {
  const loc: Locale = locale === 'de' ? 'de' : 'tr';
  return `${LOCALIZED_PATHS['/jobs'][loc]}/${encodeURIComponent(id)}`;
}

/** İlan detay sayfası URL'si */
export function jobUrl(locale: Locale, id: string): string {
  return `${localizedUrl(locale, '/jobs')}/${id}`;
}

/** Next.js metadata için canonical + hreflang alternatifleri */
export function alternatesFor(locale: string, path: string) {
  const loc: Locale = locale === 'de' ? 'de' : 'tr';
  return {
    canonical: localizedUrl(loc, path),
    languages: {
      tr: localizedUrl('tr', path),
      de: localizedUrl('de', path),
      'x-default': localizedUrl('tr', path),
    },
  };
}

export function jobAlternates(locale: string, id: string) {
  const loc: Locale = locale === 'de' ? 'de' : 'tr';
  return {
    canonical: jobUrl(loc, id),
    languages: {
      tr: jobUrl('tr', id),
      de: jobUrl('de', id),
      'x-default': jobUrl('tr', id),
    },
  };
}

export const SITE_PATHS = Object.keys(LOCALIZED_PATHS);

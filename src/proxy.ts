import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { getToken } from '@auth/core/jwt';
import { routing } from './i18n/routing';

// next-intl locale handling
const intlMiddleware = createMiddleware(routing);

// Eski İngilizce adresler için 301 kalıcı yönlendirmeler (locale bazlı)
const permanentRedirects: Record<string, string> = {
  '/tr/jobs': '/tr/almanya-is',
  '/tr/opportunity-card': '/tr/firsat-karti',
  '/tr/education': '/tr/almanya-egitim',
  '/tr/pre-application': '/tr/on-basvuru',
  '/de/jobs': '/de/arbeit-in-deutschland',
  '/de/opportunity-card': '/de/chancenkarte',
  '/de/education': '/de/bildung-in-deutschland',
  '/de/pre-application': '/de/vorab-bewerbung',
};
const dynamicJobRegex = /^\/(tr|de)\/jobs\/(.+)$/;

// Admin route'larına erişimi proxy katmanında kontrol eden fonksiyon.
// Bu, server action'lardaki mevcut session/role kontrollerini KALDIRMAZ —
// defense in depth prensibiyle ek bir güvenlik katmanı olarak çalışır.
export default async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const normalizedPath = pathname.length > 1 && pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;

  // 1) 301 Kalıcı Yönlendirme Kontrolü (next-intl 307 yerine 301 kalıcı yönlendirme sağlar)
  if (permanentRedirects[normalizedPath]) {
    const targetUrl = request.nextUrl.clone();
    targetUrl.pathname = permanentRedirects[normalizedPath];
    return NextResponse.redirect(targetUrl, 301);
  }

  const jobMatch = normalizedPath.match(dynamicJobRegex);
  if (jobMatch) {
    const [, locale, id] = jobMatch;
    const targetPrefix = locale === 'de' ? '/de/arbeit-in-deutschland' : '/tr/almanya-is';
    const targetUrl = request.nextUrl.clone();
    targetUrl.pathname = `${targetPrefix}/${id}`;
    return NextResponse.redirect(targetUrl, 301);
  }

  // Admin route'larını kontrol et: /(tr|de)/admin/... pattern'ini yakala
  // Login sayfasını muaf tut — aksi halde giriş yapılamaz
  const adminRoutePattern = /^\/(tr|de)\/admin(\/|$)/;
  const isAdminLoginRoute = /^\/(tr|de)\/admin\/login(\/|$)/.test(pathname);

  if (adminRoutePattern.test(pathname) && !isAdminLoginRoute) {
    try {
      // JWT token'ı cookie'den decode et
      const token = await getToken({
        req: request,
        secret: process.env.AUTH_SECRET,
        secureCookie: process.env.NODE_ENV === 'production',
        salt: process.env.NODE_ENV === 'production'
          ? '__Secure-authjs.session-token'
          : 'authjs.session-token',
      });

      // Token yoksa veya role ADMIN değilse → login sayfasına yönlendir
      if (!token || token.role !== 'ADMIN') {
        // Locale'i pathname'den çıkar (ilk segment)
        const localeMatch = pathname.match(/^\/(tr|de)/);
        const locale = localeMatch ? localeMatch[1] : 'tr';

        const loginUrl = new URL(`/${locale}/admin/login`, request.url);
        return NextResponse.redirect(loginUrl);
      }
    } catch (error) {
      // Token decode başarısız olursa güvenli tarafta kal → login'e yönlendir
      console.error('Admin auth check failed in proxy:', error);
      const loginUrl = new URL('/tr/admin/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Diğer tüm istekler için next-intl middleware'ini çalıştır
  return intlMiddleware(request);
}

export const config = {
  matcher: ['/', '/(tr|de)/:path*', '/((?!api|_next|_vercel|uploads|.*\\..*).*)'],
};

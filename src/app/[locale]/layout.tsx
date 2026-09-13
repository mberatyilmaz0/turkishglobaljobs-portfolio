import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import Providers from '@/components/Providers';
import '@/app/globals.css';

import type { Metadata } from 'next';
import { Inter, Outfit } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';

// next/font ile Google Fonts yüklemesi — render-blocking CSS kaldırılır
const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-body',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-heading',
  display: 'swap',
});

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;

  const isDE = locale === 'de';

  return {
    title: {
      template: '%s | Turkish Global',
      default: isDE
        ? 'Turkish Global | Internationale Stellenangebote & Karriere'
        : 'Turkish Global | Uluslararası İş İlanları ve Kariyer Platformu',
    },
    description: isDE
      ? 'Entdecken Sie internationale Karrieremöglichkeiten mit Turkish Global. Bewerben Sie sich auf aktuelle Stellenangebote in der Türkei und Europa und gestalten Sie Ihre Zukunft.'
      : 'Turkish Global ile uluslararası kariyer fırsatlarını keşfedin. Türkiye ve Avrupa\'daki en güncel iş ilanlarına hemen başvurun ve kariyerinize yön verin.',
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://www.your-domain.com'),
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} className={`${inter.variable} ${outfit.variable}`}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <Providers>
          <NextIntlClientProvider locale={locale} messages={messages}>
            {children}
            <Analytics />
          </NextIntlClientProvider>
        </Providers>
      </body>
    </html>
  );
}

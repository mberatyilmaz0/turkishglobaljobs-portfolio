import { setRequestLocale } from 'next-intl/server';
import HomeClient from './HomeClient';
import type { Metadata } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.your-domain.com';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isDE = locale === 'de';

  return {
    title: isDE
      ? 'Turkish Global – Ihr Weg nach Deutschland | Beratung & Chancenkarte'
      : 'Turkish Global – Almanya\'da Yeni Hayatınız | Danışmanlık & Fırsat Kartı',
    description: isDE
      ? 'Wir begleiten Sie bei Blue Card, Chancenkarte und beruflicher Anerkennung. Professionelle Beratung für Ihren Neustart in Deutschland.'
      : 'Mavi Kart, Fırsat Kartı ve Mesleki Denklik süreçlerinizde uzman ekibimizle yanınızdayız. Almanya\'da yeni hayatınıza ilk adımı atın.',
    alternates: {
      canonical: `${BASE_URL}/${locale}`,
      languages: {
        'tr': `${BASE_URL}/tr`,
        'de': `${BASE_URL}/de`,
      },
    },
  };
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <HomeClient />;
}

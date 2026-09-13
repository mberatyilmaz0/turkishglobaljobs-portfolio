import { setRequestLocale } from 'next-intl/server';
import { getFeaturedJobs } from '@/actions/jobs';
import HomeClient from './HomeClient';
import type { Metadata } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.your-domain.com';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isDE = locale === 'de';

  return {
    description: isDE
      ? 'Entdecken Sie aktuelle internationale Stellenangebote bei Turkish Global. Karrieremöglichkeiten in der Türkei und Europa – bewerben Sie sich jetzt auf passende Positionen.'
      : 'Turkish Global ile uluslararası kariyer fırsatlarını keşfedin. Türkiye ve Avrupa\'daki en güncel iş ilanlarına göz atın, profilinizi oluşturun ve hemen başvurun.',
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

  const jobs = await getFeaturedJobs();

  return <HomeClient jobs={jobs} />;
}

import { setRequestLocale } from 'next-intl/server';
import { getActiveJobs } from '@/actions/jobs';
import JobsClient from './JobsClient';
import { getTranslations } from 'next-intl/server';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.your-domain.com';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'jobs' });
  const isDE = locale === 'de';

  return {
    title: `${t('title')}`,
    description: isDE
      ? 'Entdecken Sie aktuelle Stellenangebote in der Türkei und Europa. Filtern Sie nach Branche, Standort und Erfahrungsstufe, um die passende Position zu finden.'
      : 'Türkiye ve Avrupa\'daki en güncel iş ilanlarını keşfedin. Sektöre, konuma ve deneyim seviyesine göre filtreleyerek size en uygun pozisyonu bulun.',
    alternates: {
      canonical: `${BASE_URL}/${locale}/jobs`,
      languages: {
        'tr': `${BASE_URL}/tr/jobs`,
        'de': `${BASE_URL}/de/jobs`,
      },
    },
  };
}

export default async function JobsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const dbJobs = await getActiveJobs();

  return <JobsClient initialJobs={dbJobs} />;
}

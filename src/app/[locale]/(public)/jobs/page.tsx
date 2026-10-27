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
    title: isDE
      ? 'Jobs in Deutschland – Mavi Kart & Chancenkarte | Turkish Global'
      : 'Almanya\'da İş İlanları – Mavi Kart & Fırsat Kartı | Turkish Global',
    description: isDE
      ? 'Aktuelle Stellenangebote in Deutschland für Fachkräfte aus der Türkei. Mit Infos zu Gehalt, Relocation-Support und Deutschkenntnissen.'
      : 'Almanya\'da iş ilanları: Mavi Kart, Fırsat Kartı ve mesleki denklik kapsamında güncel pozisyonlar. Maaş, relocation desteği ve Almanca seviyesi bilgileriyle.',
    alternates: {
      canonical: isDE ? `${BASE_URL}/de/arbeit-in-deutschland` : `${BASE_URL}/tr/almanya-is`,
      languages: {
        'tr': `${BASE_URL}/tr/almanya-is`,
        'de': `${BASE_URL}/de/arbeit-in-deutschland`,
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

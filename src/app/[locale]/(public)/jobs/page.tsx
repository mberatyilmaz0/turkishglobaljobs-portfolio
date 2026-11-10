import { setRequestLocale } from 'next-intl/server';
import { getActiveJobs } from '@/actions/jobs';
import JobsClient from './JobsClient';

import { alternatesFor } from '@/lib/site';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isDE = locale === 'de';

  return {
    title: isDE
      ? 'Jobs in Deutschland – Blaue Karte & Chancenkarte'
      : 'Almanya\'da İş İlanları – Mavi Kart & Fırsat Kartı',
    description: isDE
      ? 'Aktuelle Stellenangebote in Deutschland für Fachkräfte aus der Türkei. Mit Infos zu Gehalt, Relocation-Support und Deutschkenntnissen.'
      : 'Almanya\'da iş ilanları: Mavi Kart, Fırsat Kartı ve mesleki denklik kapsamında güncel pozisyonlar. Maaş, relocation desteği ve Almanca seviyesi bilgileriyle.',
    alternates: alternatesFor(locale, '/jobs'),
  };
}

export default async function JobsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const dbJobs = await getActiveJobs();

  return <JobsClient initialJobs={dbJobs} />;
}

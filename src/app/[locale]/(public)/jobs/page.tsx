import { setRequestLocale } from 'next-intl/server';
import { getActiveJobs } from '@/actions/jobs';
import JobsClient from './JobsClient';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'jobs' });

  return {
    title: `${t('title')} | Turkish Global`,
  };
}

export default async function JobsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const dbJobs = await getActiveJobs();

  return <JobsClient initialJobs={dbJobs} />;
}

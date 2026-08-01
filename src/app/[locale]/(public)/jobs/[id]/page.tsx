import { setRequestLocale } from 'next-intl/server';
import { getJobById } from '@/actions/jobs';
import { hasApplied } from '@/actions/applications';
import { notFound } from 'next/navigation';
import JobDetailClient from './JobDetailClient';
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: string; id: string }> }): Promise<Metadata> {
  const { locale, id } = await params;
  const job = await getJobById(id);
  
  if (!job) return { title: 'İlan Bulunamadı' };

  return {
    title: `${locale === 'de' ? job.titleDe || job.title : job.title} | Turkish Global`,
    description: locale === 'de' ? job.shortDescDe || job.shortDesc : job.shortDesc,
  };
}

export default async function JobDetailPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  setRequestLocale(locale);

  let job = await getJobById(id);


  if (!job) notFound();

  const applied = await hasApplied(id);

  return <JobDetailClient job={job} locale={locale} applied={applied} />;
}

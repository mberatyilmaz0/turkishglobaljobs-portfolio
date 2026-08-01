import { setRequestLocale } from 'next-intl/server';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { getAllJobs } from '@/actions/jobs';
import JobsListClient from './JobsListClient';

export default async function AdminJobsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const session = await auth();
  if (!session || session.user.role !== 'ADMIN') redirect(`/${locale}/admin/login`);

  const jobs = await getAllJobs();

  return <JobsListClient jobs={jobs} locale={locale} />;
}

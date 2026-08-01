import { setRequestLocale } from 'next-intl/server';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { getJobById } from '@/actions/jobs';
import { notFound } from 'next/navigation';
import JobFormClient from '../../JobFormClient';

export default async function EditJobPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  setRequestLocale(locale);

  const session = await auth();
  if (!session || session.user.role !== 'ADMIN') redirect(`/${locale}`);

  const job = await getJobById(id);
  if (!job) notFound();

  return <JobFormClient locale={locale} job={job} />;
}

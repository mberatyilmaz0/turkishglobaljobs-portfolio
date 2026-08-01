import { setRequestLocale } from 'next-intl/server';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { getApplicationById } from '@/actions/applications';
import { notFound } from 'next/navigation';
import ApplicationDetailClient from './ApplicationDetailClient';

export default async function ApplicationDetailPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  setRequestLocale(locale);

  const session = await auth();
  if (!session || session.user.role !== 'ADMIN') redirect(`/${locale}`);

  const application = await getApplicationById(id);
  if (!application) notFound();

  return <ApplicationDetailClient application={application} locale={locale} />;
}

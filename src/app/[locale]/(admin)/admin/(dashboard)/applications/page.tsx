import { setRequestLocale } from 'next-intl/server';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { getAllApplications } from '@/actions/applications';
import ApplicationsListClient from './ApplicationsListClient';

export default async function AdminApplicationsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const session = await auth();
  if (!session || session.user.role !== 'ADMIN') redirect(`/${locale}/admin/login`);

  const applications = await getAllApplications();

  return <ApplicationsListClient applications={applications} locale={locale} />;
}

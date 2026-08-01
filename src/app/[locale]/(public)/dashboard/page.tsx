import { setRequestLocale } from 'next-intl/server';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { getUserProfile } from '@/actions/profile';
import { getUserApplications } from '@/actions/applications';
import DashboardClient from './DashboardClient';

export default async function DashboardPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const session = await auth();
  if (!session) redirect(`/${locale}/auth/login`);

  const profile = await getUserProfile();
  const applications = await getUserApplications();

  return <DashboardClient profile={profile} applications={applications} locale={locale} />;
}

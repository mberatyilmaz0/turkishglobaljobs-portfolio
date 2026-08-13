import { setRequestLocale } from 'next-intl/server';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { getUserProfile } from '@/actions/profile';
import { getUserApplications } from '@/actions/applications';
import DashboardClient from './DashboardClient';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isDE = locale === 'de';

  return {
    title: isDE ? 'Mein Profil' : 'Profilim',
    description: isDE
      ? 'Verwalten Sie Ihr Turkish Global-Profil. Aktualisieren Sie Ihre persönlichen Daten, laden Sie Ihren Lebenslauf hoch und verfolgen Sie Ihre Bewerbungen.'
      : 'Turkish Global profilinizi yönetin. Kişisel bilgilerinizi güncelleyin, özgeçmişinizi yükleyin ve iş başvurularınızı takip edin.',
    robots: {
      index: false,
      follow: true,
    },
  };
}

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

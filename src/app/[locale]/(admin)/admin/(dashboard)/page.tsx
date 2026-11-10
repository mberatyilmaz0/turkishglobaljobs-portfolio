import { setRequestLocale } from 'next-intl/server';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { getAdminStats } from '@/actions/stats';
import { getAllJobs } from '@/actions/jobs';
import AdminDashboardClient from './AdminDashboardClient';

export default async function AdminPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const session = await auth();
  if (!session || session.user.role !== 'ADMIN') redirect(`/${locale}/admin/login`);

  const stats = await getAdminStats();
  const jobs = await getAllJobs();

  return <AdminDashboardClient stats={stats} recentJobs={jobs.slice(0, 5)} locale={locale} />;
}

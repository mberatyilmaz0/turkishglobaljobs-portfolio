import { setRequestLocale } from 'next-intl/server';
import AdminLoginClient from './AdminLoginClient';

export default async function AdminLoginPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <AdminLoginClient />;
}

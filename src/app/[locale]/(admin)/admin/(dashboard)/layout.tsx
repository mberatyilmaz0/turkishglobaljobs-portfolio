import AdminSidebar from '@/components/admin/AdminSidebar';
import { auth } from '@/lib/auth';
import { redirect } from '@/i18n/routing';

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session || session.user?.role !== 'ADMIN') {
    redirect({ href: '/admin/login', locale: 'tr' });
  }

  return (
    <div className="admin-layout-wrapper">
      <AdminSidebar />
      <main className="admin-main-content">
        {children}
      </main>
    </div>
  );
}

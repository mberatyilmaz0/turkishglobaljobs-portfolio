import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import PageTracker from '@/components/PageTracker';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <PageTracker />
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}

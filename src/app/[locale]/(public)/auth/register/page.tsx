import RegisterForm from './RegisterForm';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isDE = locale === 'de';

  return {
    title: isDE ? 'Registrieren' : 'Üye Ol',
    description: isDE
      ? 'Registrieren Sie sich bei Turkish Global. Erstellen Sie ein kostenloses Konto, vervollständigen Sie Ihr Profil und bewerben Sie sich auf tausende Stellenangebote.'
      : 'Turkish Global\'e üye olun. Ücretsiz hesap oluşturun, profilinizi tamamlayın ve binlerce uluslararası iş ilanına hemen başvurmaya başlayın.',
    robots: {
      index: false,
      follow: true,
    },
  };
}

export default function RegisterPage() {
  return <RegisterForm />;
}

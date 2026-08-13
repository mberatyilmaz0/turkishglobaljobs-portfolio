import LoginForm from './LoginForm';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isDE = locale === 'de';

  return {
    title: isDE ? 'Anmelden' : 'Giriş Yap',
    description: isDE
      ? 'Melden Sie sich bei Ihrem Turkish Global-Konto an. Verfolgen Sie Ihre Bewerbungen, aktualisieren Sie Ihr Profil und bewerben Sie sich auf neue Karrieremöglichkeiten.'
      : 'Turkish Global hesabınıza giriş yapın. İş başvurularınızı takip etmek, profilinizi güncellemek ve yeni kariyer fırsatlarına başvurmak için oturum açın.',
    robots: {
      index: false,
      follow: true,
    },
  };
}

export default function LoginPage() {
  return <LoginForm />;
}

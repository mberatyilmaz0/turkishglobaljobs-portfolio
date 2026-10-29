import { setRequestLocale } from 'next-intl/server';
import HomeClient from './HomeClient';
import type { Metadata } from 'next';
import { getContent } from '@/actions/content';
import {
  HOME_STATS_DEFAULT,
  HOME_SERVICES_DEFAULT,
  HOME_PROCESS_DEFAULT,
  HOME_FAQ_DEFAULT,
  type Bilingual,
  type HomeStatsContent,
  type HomeServicesContent,
  type HomeProcessContent,
  type HomeFaqContent,
} from '@/lib/contentDefaults';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.your-domain.com';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isDE = locale === 'de';

  return {
    title: isDE
      ? 'Turkish Global – Ihr Weg nach Deutschland | Beratung & Chancenkarte'
      : 'Turkish Global – Almanya\'da Yeni Hayatınız | Danışmanlık & Fırsat Kartı',
    description: isDE
      ? 'Wir begleiten Sie bei Blue Card, Chancenkarte und beruflicher Anerkennung. Professionelle Beratung für Ihren Neustart in Deutschland.'
      : 'Mavi Kart, Fırsat Kartı ve Mesleki Denklik süreçlerinizde uzman ekibimizle yanınızdayız. Almanya\'da yeni hayatınıza ilk adımı atın.',
    alternates: {
      canonical: `${BASE_URL}/${locale}`,
      languages: {
        'tr': `${BASE_URL}/tr`,
        'de': `${BASE_URL}/de`,
      },
    },
  };
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const isDE = locale === 'de';

  const [statsData, servicesData, processData, faqData] = await Promise.all([
    getContent<Bilingual<HomeStatsContent>>('home.stats'),
    getContent<Bilingual<HomeServicesContent>>('home.services'),
    getContent<Bilingual<HomeProcessContent>>('home.process'),
    getContent<Bilingual<HomeFaqContent>>('home.faq'),
  ]);

  const stats = (isDE ? statsData.de : statsData.tr) ?? (isDE ? HOME_STATS_DEFAULT.de : HOME_STATS_DEFAULT.tr);
  const services = (isDE ? servicesData.de : servicesData.tr) ?? (isDE ? HOME_SERVICES_DEFAULT.de : HOME_SERVICES_DEFAULT.tr);
  const process = (isDE ? processData.de : processData.tr) ?? (isDE ? HOME_PROCESS_DEFAULT.de : HOME_PROCESS_DEFAULT.tr);
  const faq = (isDE ? faqData.de : faqData.tr) ?? (isDE ? HOME_FAQ_DEFAULT.de : HOME_FAQ_DEFAULT.tr);

  return <HomeClient stats={stats} services={services} process={process} faq={faq} />;
}

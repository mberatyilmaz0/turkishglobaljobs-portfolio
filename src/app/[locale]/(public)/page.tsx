import Link from 'next/link';
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

import { alternatesFor, localizedPath } from '@/lib/site';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isDE = locale === 'de';

  return {
    title: {
      absolute: isDE
        ? 'Jobs in Deutschland & Karriereberatung | Turkish Global'
        : 'Almanya İş İlanları ve Kariyer Danışmanlığı | Turkish Global',
    },
    description: isDE
      ? 'Aktuelle Jobs in Deutschland entdecken und sich zu Chancenkarte, Blue Card, Anerkennung und Bewerbung aus der Türkei informieren.'
      : 'Almanya iş ilanlarını keşfedin; Türkiye’den Almanya’ya çalışma, Fırsat Kartı, Mavi Kart ve mesleki denklik süreçleri hakkında bilgi alın.',
    alternates: alternatesFor(locale, '/'),
    openGraph: {
      title: isDE ? 'Jobs und Karriere in Deutschland' : 'Almanya İş İlanları ve Kariyer Fırsatları',
      description: isDE
        ? 'Ihr Einstieg in Arbeit und Beruf in Deutschland.'
        : 'Türkiye’den Almanya’ya iş ve kariyer yolculuğunuz için güncel ilanlar ve rehberler.',
      type: 'website',
      images: [{ url: '/img/turkishglobal.webp', alt: 'Turkish Global Jobs' }],
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

  const links = [
    {
      href: localizedPath(locale, '/jobs'),
      title: isDE ? 'Aktuelle Jobs in Deutschland' : 'Güncel Almanya İş İlanları',
      text: isDE ? 'Offene Stellen nach Standort, Branche und Arbeitsmodell vergleichen.' : 'Aktif ilanları şehir, sektör ve çalışma modeline göre karşılaştırın.',
    },
    {
      href: localizedPath(locale, '/almanya-rehberi'),
      title: isDE ? 'Arbeiten und Leben in Deutschland' : 'Almanya’da Çalışmak ve Yaşamak',
      text: isDE ? 'Wichtige Informationen zu Bewerbung, Anerkennung und offiziellen Stellen.' : 'Başvuru, denklik ve resmî kaynaklar hakkında temel bilgileri inceleyin.',
    },
    {
      href: localizedPath(locale, '/education'),
      title: isDE ? 'Studium und Ausbildung' : 'Üniversite ve Ausbildung',
      text: isDE ? 'Bildungswege und Bewerbungsschritte in Deutschland entdecken.' : 'Almanya’daki eğitim yollarını ve başvuru adımlarını öğrenin.',
    },
  ];

  return (
    <>
      <HomeClient stats={stats} services={services} process={process} faq={faq} />
      <section style={{ background: '#fff', padding: '72px 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <h2 style={{ color: '#0f172a', fontSize: 'clamp(1.6rem, 3vw, 2.25rem)', lineHeight: 1.25, marginTop: 0 }}>
            {isDE ? 'Von der Türkei nach Deutschland: Arbeit und Bildung' : 'Türkiye’den Almanya’ya İş ve Eğitim Yolculuğu'}
          </h2>
          <p style={{ color: '#475569', lineHeight: 1.8, maxWidth: 850 }}>
            {isDE
              ? 'Turkish Global Jobs bündelt aktuelle Stellenangebote und verständliche Informationen für Menschen, die in Deutschland arbeiten oder lernen möchten. Vergleichen Sie passende Positionen und informieren Sie sich über die nächsten Schritte.'
              : 'Turkish Global Jobs, Almanya’da çalışmak veya eğitim almak isteyenler için aktif ilanları ve anlaşılır rehberleri bir araya getirir. Size uygun pozisyonları karşılaştırabilir, başvuru öncesinde izlenecek adımları inceleyebilirsiniz.'}
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16, marginTop: 28 }}>
            {links.map((link) => (
              <Link key={link.href} href={link.href} style={{ border: '1px solid #e2e8f0', borderRadius: 16, padding: 24, textDecoration: 'none', background: '#f8fafc' }}>
                <h3 style={{ color: '#0f172a', margin: '0 0 10px', fontSize: '1.05rem' }}>{link.title}</h3>
                <p style={{ color: '#64748b', lineHeight: 1.65, margin: 0 }}>{link.text}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

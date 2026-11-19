import { setRequestLocale } from 'next-intl/server';
import { getActiveJobs } from '@/actions/jobs';
import JobsClient from './JobsClient';
import JobLandingLinks from '@/components/jobs/JobLandingLinks';

import { alternatesFor } from '@/lib/site';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isDE = locale === 'de';
  const title = isDE
    ? 'Jobs in Deutschland für Fachkräfte aus der Türkei'
    : 'Almanya İş İlanları | Türkiye’den Almanya’ya İş';
  const description = isDE
    ? 'Aktuelle Stellenangebote in Deutschland: Branche, Stadt, Arbeitsmodell, Gehalt und Sprachanforderungen vergleichen und sich vorab bewerben.'
    : 'Güncel Almanya iş ilanlarını sektör, şehir, çalışma tipi, maaş ve Almanca seviyesine göre karşılaştırın; uygun pozisyonlara ön başvuru yapın.';

  return {
    title,
    description,
    alternates: alternatesFor(locale, '/jobs'),
    openGraph: {
      title,
      description,
      type: 'website',
      images: [{ url: '/img/turkishglobal.webp', alt: 'Almanya iş ilanları' }],
    },
  };
}

export default async function JobsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const dbJobs = await getActiveJobs();
  const isDE = locale === 'de';

  return (
    <>
      <JobsClient initialJobs={dbJobs} />
      <section style={{ background: '#fff', padding: '64px 24px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <h2 style={{ color: '#0f172a', fontSize: 'clamp(1.5rem, 3vw, 2rem)', marginTop: 0 }}>
            {isDE ? 'Arbeit in Deutschland finden' : 'Türkiye’den Almanya’ya İş Bulmak'}
          </h2>
          <p style={{ color: '#475569', lineHeight: 1.8 }}>
            {isDE
              ? 'Vergleichen Sie aktuelle Stellen anhand Ihrer Qualifikation, Berufserfahrung und Sprachkenntnisse. Die Angaben zu Gehalt und Sprachniveau stammen aus den jeweiligen Stelleninformationen; prüfen Sie alle Details vor Ihrer Bewerbung.'
              : 'Aktif ilanları eğitiminiz, mesleki deneyiminiz ve dil seviyeniz açısından karşılaştırın. Maaş ve Almanca seviyesi bilgileri ilgili ilanın verilerinden gelir; başvurmadan önce çalışma koşullarının tamamını ilan detayında inceleyin.'}
          </p>
          <p style={{ color: '#475569', lineHeight: 1.8 }}>
            {isDE
              ? 'Eine aussagekräftige Bewerbung enthält einen aktuellen Lebenslauf und eine klare Übersicht Ihrer Qualifikationen. Informationen zu Anerkennung, Chancenkarte und offiziellen Beratungsangeboten finden Sie in unserem Deutschland-Ratgeber.'
              : 'Güncel bir CV ve mesleki yeterliliklerin açıkça belirtilmesi güçlü bir başvurunun temelidir. Denklik, Fırsat Kartı ve resmî danışma kaynakları hakkında daha fazla bilgi için Almanya Rehberi sayfamızı inceleyebilirsiniz.'}
          </p>
        </div>
      </section>
      <JobLandingLinks locale={locale} />
    </>
  );
}

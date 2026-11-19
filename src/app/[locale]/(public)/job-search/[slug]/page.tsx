import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { getJobLandingJobs, hasJobLandingJobs } from '@/actions/jobs';
import JobCard from '@/components/jobs/JobCard';
import JobLandingLinks from '@/components/jobs/JobLandingLinks';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import JsonLd from '@/components/seo/JsonLd';
import { getJobLandingPage, jobLandingAlternates, jobLandingPath, jobLandingUrl } from '@/lib/jobLandingPages';
import { jobUrl, localizedPath, type Locale } from '@/lib/site';

export const dynamic = 'force-dynamic';

type PageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const page = getJobLandingPage(locale, slug);

  if (!page) {
    return { title: locale === 'de' ? 'Seite nicht gefunden' : 'Sayfa bulunamadı', robots: { index: false, follow: false } };
  }

  const loc: Locale = locale === 'de' ? 'de' : 'tr';
  const copy = page.copy[loc];
  const hasJobs = await hasJobLandingJobs(page.field, page.terms);
  const canonical = jobLandingUrl(loc, page);

  return {
    title: copy.metaTitle,
    description: copy.description,
    alternates: jobLandingAlternates(loc, page),
    robots: { index: hasJobs, follow: true },
    openGraph: {
      title: copy.metaTitle,
      description: copy.description,
      url: canonical,
      type: 'website',
      images: [{ url: '/img/turkishglobal.webp', alt: 'Turkish Global Jobs' }],
    },
  };
}

export default async function JobSearchLandingPage({ params }: PageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const loc: Locale = locale === 'de' ? 'de' : 'tr';
  const page = getJobLandingPage(loc, slug);
  if (!page) notFound();

  const copy = page.copy[loc];
  const jobs = await getJobLandingJobs(page.field, page.terms);
  const homeLabel = loc === 'de' ? 'Startseite' : 'Ana Sayfa';
  const jobsLabel = loc === 'de' ? 'Jobs in Deutschland' : 'Almanya İş İlanları';

  const itemList = jobs.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: copy.title,
    numberOfItems: jobs.length,
    itemListElement: jobs.map((job, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: loc === 'de' ? job.titleDe : job.title,
      url: jobUrl(loc, job.id),
    })),
  } : null;

  return (
    <main style={{ background: '#f8fafc', minHeight: '100vh', paddingTop: 72 }}>
      <header style={{ background: 'linear-gradient(135deg, #0a1228, #0f2060)', color: '#fff', padding: '64px 24px', textAlign: 'center' }}>
        <div style={{ maxWidth: 820, margin: '0 auto' }}>
          <p style={{ color: '#93c5fd', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            {loc === 'de' ? 'Aktuelle Stellenangebote' : 'Güncel İş Fırsatları'}
          </p>
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.25rem)', lineHeight: 1.15, margin: '12px 0 20px' }}>{copy.title}</h1>
          <p style={{ color: '#cbd5e1', fontSize: '1.05rem', lineHeight: 1.75, margin: 0 }}>{copy.intro}</p>
        </div>
      </header>

      <section style={{ padding: '48px 24px 72px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <Breadcrumbs items={[
            { name: homeLabel, href: localizedPath(loc, '/') },
            { name: jobsLabel, href: localizedPath(loc, '/jobs') },
            { name: copy.title, href: jobLandingPath(loc, page) },
          ]} />

          {jobs.length > 0 ? (
            <>
              <p style={{ color: '#64748b', marginBottom: 24 }}>
                <strong style={{ color: '#0f172a' }}>{jobs.length}</strong> {loc === 'de' ? 'aktive Stellen' : 'aktif ilan'}
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))', gap: 20 }}>
                {jobs.map((job) => <JobCard key={job.id} job={job} locale={loc} />)}
              </div>
            </>
          ) : (
            <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 20, padding: 32, textAlign: 'center' }}>
              <h2 style={{ color: '#0f172a', marginTop: 0 }}>{loc === 'de' ? 'Derzeit keine aktiven Stellen' : 'Şu anda aktif ilan bulunmuyor'}</h2>
              <p style={{ color: '#64748b', lineHeight: 1.7 }}>
                {loc === 'de'
                  ? 'Alle Stellen ansehen oder eine Vorab-Bewerbung senden, damit wir Ihr Profil kennenlernen.'
                  : 'Tüm ilanları inceleyebilir veya profilinizi paylaşmak için ön başvuru formunu doldurabilirsiniz.'}
              </p>
            </div>
          )}
        </div>
      </section>

      <section style={{ background: '#fff', padding: '64px 24px' }}>
        <div style={{ maxWidth: 820, margin: '0 auto' }}>
          <h2 style={{ color: '#0f172a', fontSize: 'clamp(1.5rem, 3vw, 2rem)', marginTop: 0 }}>{copy.sectionTitle}</h2>
          <p style={{ color: '#475569', lineHeight: 1.8 }}>{copy.sectionText}</p>
        </div>
      </section>

      <JobLandingLinks locale={loc} currentKey={page.key} />
      {itemList && <JsonLd data={itemList} />}
    </main>
  );
}

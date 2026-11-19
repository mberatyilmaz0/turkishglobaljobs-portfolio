import { setRequestLocale } from 'next-intl/server';
import { getJobById, getRelatedJobs } from '@/actions/jobs';
import { notFound } from 'next/navigation';
import JobDetailClient from './JobDetailClient';
import { Metadata } from 'next';
import JobCard from '@/components/jobs/JobCard';
import JsonLd from '@/components/seo/JsonLd';
import { SITE_URL, jobAlternates, jobUrl, type Locale } from '@/lib/site';

const BASE_URL = SITE_URL;

function mapEmploymentType(type: string): string {
  const map: Record<string, string> = {
    'Full-time': 'FULL_TIME',
    'Part-time': 'PART_TIME',
    'Remote': 'FULL_TIME',
    'Freelance': 'CONTRACTOR',
    'Contract': 'CONTRACTOR',
    'Proje Bazlı': 'CONTRACTOR',
    'Intern': 'INTERN',
  };
  return map[type] || 'FULL_TIME';
}

function parseJobLocation(location: string): { country: string; locality: string } {
  const loc = location.toLowerCase().trim();

  const deCities = [
    'berlin', 'münchen', 'munich', 'hamburg', 'köln', 'cologne', 'frankfurt',
    'stuttgart', 'düsseldorf', 'dortmund', 'essen', 'leipzig', 'bremen',
    'dresden', 'hannover', 'nürnberg', 'nuremberg', 'duisburg', 'bochum',
    'wuppertal', 'bielefeld', 'bonn', 'münster', 'karlsruhe', 'mannheim',
    'augsburg', 'wiesbaden', 'gelsenkirchen', 'aachen', 'kiel', 'freiburg',
    'halle', 'magdeburg', 'oberhausen', 'lübeck', 'erfurt', 'rostock',
    'mainz', 'kassel', 'saarbrücken', 'potsdam', 'heidelberg', 'darmstadt',
    'regensburg', 'würzburg', 'wolfsburg', 'ulm', 'bamberg',
    'deutschland', 'almanya', 'germany',
    'nordrhein-westfalen', 'nrw', 'bayern', 'bavaria', 'baden-württemberg',
    'niedersachsen', 'hessen', 'sachsen', 'rheinland-pfalz', 'schleswig-holstein',
    'thüringen', 'brandenburg', 'mecklenburg-vorpommern', 'saarland',
  ];

  const trCities = [
    'istanbul', 'ankara', 'izmir', 'bursa', 'antalya', 'adana', 'konya',
    'gaziantep', 'mersin', 'kayseri', 'eskişehir', 'trabzon', 'samsun',
    'denizli', 'sakarya', 'malatya', 'erzurum', 'van', 'batman',
    'diyarbakır', 'şanlıurfa', 'elazığ', 'muğla', 'aydın', 'balıkesir',
    'tekirdağ', 'manisa', 'kahramanmaraş', 'hatay', 'sivas',
    'türkiye', 'turkey', 'tr',
  ];

  if (deCities.some(city => loc.includes(city))) return { country: 'DE', locality: location };
  if (trCities.some(city => loc.includes(city))) return { country: 'TR', locality: location };
  return { country: 'DE', locality: location };
}

function calculateValidThrough(createdAt: Date): string {
  const validDate = new Date(createdAt);
  validDate.setDate(validDate.getDate() + 60);
  return validDate.toISOString().split('T')[0];
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; id: string }> }): Promise<Metadata> {
  const { locale, id } = await params;
  const job = await getJobById(id);

  if (!job) {
    return {
      title: locale === 'de' ? 'Stelle nicht gefunden' : 'İlan Bulunamadı',
      robots: { index: false, follow: false },
    };
  }

  const isDE = locale === 'de';
  const title = isDE ? (job.titleDe || job.title) : job.title;
  const shortDesc = isDE ? (job.shortDescDe || job.descriptionDe) : (job.shortDesc || job.description);
  const rawDescription = `${title} – ${job.location}. ${shortDesc}`;
  const description = rawDescription.length > 160 ? `${rawDescription.slice(0, 157).trimEnd()}...` : rawDescription;
  const pageTitle = isDE ? `${title} in ${job.location}` : `${title} – ${job.location} İş İlanı`;

  return {
    title: pageTitle,
    description,
    alternates: jobAlternates(locale, id),
    openGraph: {
      title: pageTitle,
      description,
      url: jobUrl(locale === 'de' ? 'de' : 'tr', id),
      type: 'website',
      images: [{ url: '/img/turkishglobal.webp', alt: title }],
    },
    twitter: { card: 'summary_large_image', title: pageTitle, description },
  };
}

export default async function JobDetailPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  setRequestLocale(locale);

  const job = await getJobById(id);
  if (!job) notFound();

  const isDE = locale === 'de';
  const title = isDE ? (job.titleDe || job.title) : job.title;
  const description = isDE ? (job.descriptionDe || job.description) : job.description;
  const { country, locality } = parseJobLocation(job.location);
  const loc: Locale = isDE ? 'de' : 'tr';
  const relatedJobs = await getRelatedJobs(job.id, job.sector);

  const jsonLd: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    '@id': `${jobUrl(loc, id)}#job`,
    url: jobUrl(loc, id),
    mainEntityOfPage: jobUrl(loc, id),
    title,
    description,
    datePosted: job.createdAt.toISOString().split('T')[0],
    validThrough: calculateValidThrough(job.createdAt),
    employmentType: mapEmploymentType(job.type),
    hiringOrganization: {
      '@type': 'Organization',
      name: 'Turkish Global',
      sameAs: BASE_URL,
      logo: `${BASE_URL}/img/turkishglobal.webp`,
    },
    jobLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressLocality: locality,
        addressCountry: country,
      },
    },
  };

  if (job.type === 'Remote') {
    jsonLd.jobLocationType = 'TELECOMMUTE';
    jsonLd.applicantLocationRequirements = {
      '@type': 'Country',
      name: country === 'DE' ? 'Germany' : 'Turkey',
    };
  }

  return (
    <>
      <JsonLd data={jsonLd} />
      <JobDetailClient job={job} locale={locale} applied={false} />
      {relatedJobs.length > 0 && (
        <section style={{ background: '#f8fafc', padding: '56px 24px' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <h2 style={{ color: '#0f172a', marginTop: 0, marginBottom: 24 }}>
              {isDE ? 'Ähnliche Stellen' : 'Benzer İş İlanları'}
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
              {relatedJobs.map((relatedJob) => <JobCard key={relatedJob.id} job={relatedJob} locale={locale} />)}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

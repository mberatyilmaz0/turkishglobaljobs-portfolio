import { setRequestLocale } from 'next-intl/server';
import { getJobById } from '@/actions/jobs';
import { hasApplied } from '@/actions/applications';
import { notFound } from 'next/navigation';
import JobDetailClient from './JobDetailClient';
import { Metadata } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.your-domain.com';

// Çalışma tipini schema.org formatına çevir
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

// Konum string'inden ülke kodu ve şehir bilgisi çıkar
function parseJobLocation(location: string): { country: string; locality: string } {
  const loc = location.toLowerCase().trim();

  // Almanya şehirleri ve bölgeleri
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

  // Türkiye şehirleri
  const trCities = [
    'istanbul', 'ankara', 'izmir', 'bursa', 'antalya', 'adana', 'konya',
    'gaziantep', 'mersin', 'kayseri', 'eskişehir', 'trabzon', 'samsun',
    'denizli', 'sakarya', 'malatya', 'erzurum', 'van', 'batman',
    'diyarbakır', 'şanlıurfa', 'elazığ', 'muğla', 'aydın', 'balıkesir',
    'tekirdağ', 'manisa', 'kahramanmaraş', 'hatay', 'sivas',
    'türkiye', 'turkey', 'tr',
  ];

  if (deCities.some(city => loc.includes(city))) {
    return { country: 'DE', locality: location };
  }
  if (trCities.some(city => loc.includes(city))) {
    return { country: 'TR', locality: location };
  }

  // Varsayılan: Almanya (proje Almanya'daki Türk iş ilanlarına odaklı)
  return { country: 'DE', locality: location };
}

// validThrough hesapla: createdAt + 60 gün
function calculateValidThrough(createdAt: Date): string {
  const validDate = new Date(createdAt);
  validDate.setDate(validDate.getDate() + 60);
  return validDate.toISOString().split('T')[0];
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; id: string }> }): Promise<Metadata> {
  const { locale, id } = await params;
  const job = await getJobById(id);
  
  if (!job) return { title: 'İlan Bulunamadı' };

  const isDE = locale === 'de';
  const title = isDE ? (job.titleDe || job.title) : job.title;
  const shortDesc = isDE ? (job.shortDescDe || job.shortDesc) : job.shortDesc;

  // Build a rich description: job title + location + short description
  const descParts = [`${title} - ${job.location}`];
  if (shortDesc) descParts.push(shortDesc);
  let description = descParts.join('. ');
  // Ensure it's within 120-160 chars
  if (description.length > 160) description = description.substring(0, 157) + '...';
  if (description.length < 120) {
    description += isDE
      ? '. Jetzt bei Turkish Global bewerben und Ihre Karriere starten.'
      : '. Turkish Global üzerinden hemen başvurun ve kariyerinize yön verin.';
  }

  return {
    title: `${title} İş İlanı`,
    description,
    alternates: {
      canonical: `${BASE_URL}/${locale}/jobs/${id}`,
      languages: {
        'tr': `${BASE_URL}/tr/jobs/${id}`,
        'de': `${BASE_URL}/de/jobs/${id}`,
      },
    },
  };
}

export default async function JobDetailPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  setRequestLocale(locale);

  let job = await getJobById(id);

  if (!job) notFound();

  const applied = await hasApplied(id);

  // JobPosting JSON-LD yapısal veri
  const isDE = locale === 'de';
  const title = isDE ? (job.titleDe || job.title) : job.title;
  const description = isDE ? (job.descriptionDe || job.description) : job.description;
  const { country, locality } = parseJobLocation(job.location);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const jsonLd: Record<string, any> = {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
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

  // Remote ilanlar için ek alanlar
  if (job.type === 'Remote') {
    jsonLd.jobLocationType = 'TELECOMMUTE';
    jsonLd.applicantLocationRequirements = {
      '@type': 'Country',
      name: country === 'DE' ? 'Germany' : 'Turkey',
    };
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <JobDetailClient job={job} locale={locale} applied={applied} />
    </>
  );
}


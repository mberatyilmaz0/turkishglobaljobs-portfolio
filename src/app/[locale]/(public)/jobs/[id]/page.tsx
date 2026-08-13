import { setRequestLocale } from 'next-intl/server';
import { getJobById } from '@/actions/jobs';
import { hasApplied } from '@/actions/applications';
import { notFound } from 'next/navigation';
import JobDetailClient from './JobDetailClient';
import { Metadata } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.turkishglobaljobs.com';

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

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: title,
    description: description,
    datePosted: job.createdAt.toISOString().split('T')[0],
    employmentType: mapEmploymentType(job.type),
    jobLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressLocality: job.location,
        addressCountry: job.location.toLowerCase().includes('istanbul') || job.location.toLowerCase().includes('ankara') || job.location.toLowerCase().includes('izmir') ? 'TR' : 'TR',
      },
    },
    hiringOrganization: {
      '@type': 'Organization',
      name: 'Turkish Global',
      sameAs: BASE_URL,
      logo: `${BASE_URL}/img/turkishglobal.webp`,
    },
    applicantLocationRequirements: job.type === 'Remote' ? {
      '@type': 'Country',
      name: 'Turkey',
    } : undefined,
    jobLocationType: job.type === 'Remote' ? 'TELECOMMUTE' : undefined,
  };

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

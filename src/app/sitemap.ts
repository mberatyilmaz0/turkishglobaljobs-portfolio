import { MetadataRoute } from 'next';
import { prisma } from '@/lib/prisma';
import { localizedUrl, jobUrl } from '@/lib/site';
import { JOB_LANDING_PAGES, jobLandingUrl } from '@/lib/jobLandingPages';

export const dynamic = 'force-dynamic';

type Freq = MetadataRoute.Sitemap[number]['changeFrequency'];

const STATIC_PAGES: { path: string; changeFrequency: Freq; priority: number }[] = [
  { path: '/', changeFrequency: 'daily', priority: 1 },
  { path: '/jobs', changeFrequency: 'daily', priority: 0.9 },
  { path: '/pre-application', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/opportunity-card', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/education', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/almanya-rehberi', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/hakkimizda', changeFrequency: 'yearly', priority: 0.6 },
  { path: '/contact', changeFrequency: 'yearly', priority: 0.6 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let jobs: { id: string; updatedAt: Date; sector: string; location: string }[] = [];
  try {
    jobs = await prisma.job.findMany({
      where: { isActive: true },
      select: { id: true, updatedAt: true, sector: true, location: true },
      orderBy: { updatedAt: 'desc' },
    });
  } catch {
    jobs = [];
  }

  const entries: MetadataRoute.Sitemap = [];

  for (const page of STATIC_PAGES) {
    const languages = { tr: localizedUrl('tr', page.path), de: localizedUrl('de', page.path) };
    for (const locale of ['tr', 'de'] as const) {
      entries.push({
        url: localizedUrl(locale, page.path),
        changeFrequency: page.changeFrequency,
        priority: page.priority,
        alternates: { languages },
      });
    }
  }

  for (const job of jobs) {
    const languages = { tr: jobUrl('tr', job.id), de: jobUrl('de', job.id) };
    for (const locale of ['tr', 'de'] as const) {
      entries.push({
        url: jobUrl(locale, job.id),
        lastModified: job.updatedAt,
        changeFrequency: 'weekly',
        priority: 0.8,
        alternates: { languages },
      });
    }
  }

  for (const page of JOB_LANDING_PAGES) {
    const matchingJobs = jobs.filter((job) => {
      const value = job[page.field].toLocaleLowerCase();
      return page.terms.some((term) => value.includes(term.toLocaleLowerCase()));
    });
    if (matchingJobs.length === 0) continue;

    const lastModified = matchingJobs.reduce(
      (latest, job) => job.updatedAt > latest ? job.updatedAt : latest,
      matchingJobs[0].updatedAt,
    );
    const languages = { tr: jobLandingUrl('tr', page), de: jobLandingUrl('de', page) };

    for (const locale of ['tr', 'de'] as const) {
      entries.push({
        url: jobLandingUrl(locale, page),
        lastModified,
        changeFrequency: 'daily',
        priority: 0.75,
        alternates: { languages },
      });
    }
  }

  return entries;
}

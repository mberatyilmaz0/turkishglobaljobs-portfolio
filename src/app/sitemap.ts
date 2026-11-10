import { MetadataRoute } from 'next';
import { prisma } from '@/lib/prisma';
import { localizedUrl, jobUrl } from '@/lib/site';

// Her istekte güncel ilanlarla üretilsin (build anında DB olmasa da çalışır)
export const dynamic = 'force-dynamic';

type Freq = MetadataRoute.Sitemap[number]['changeFrequency'];

const STATIC_PAGES: { path: string; changeFrequency: Freq; priority: number }[] = [
  { path: '/', changeFrequency: 'daily', priority: 1 },
  { path: '/jobs', changeFrequency: 'daily', priority: 0.9 },
  { path: '/pre-application', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/opportunity-card', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/education', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/almanya-rehberi', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/hakkimizda', changeFrequency: 'yearly', priority: 0.6 },
  { path: '/contact', changeFrequency: 'yearly', priority: 0.6 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let jobs: { id: string; updatedAt: Date }[] = [];
  try {
    jobs = await prisma.job.findMany({
      where: { isActive: true },
      select: { id: true, updatedAt: true },
      orderBy: { updatedAt: 'desc' },
    });
  } catch {
    // DB erişilemezse yalnızca sabit sayfalar listelenir
  }

  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  // Sabit sayfalar — TR ve DE sürümleri, birbirlerine hreflang ile bağlı
  for (const page of STATIC_PAGES) {
    const languages = { tr: localizedUrl('tr', page.path), de: localizedUrl('de', page.path) };
    for (const locale of ['tr', 'de'] as const) {
      entries.push({
        url: localizedUrl(locale, page.path),
        lastModified: now,
        changeFrequency: page.changeFrequency,
        priority: page.priority,
        alternates: { languages },
      });
    }
  }

  // Aktif ilanlar
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

  return entries;
}

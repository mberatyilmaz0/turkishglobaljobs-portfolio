import { MetadataRoute } from 'next';
import { prisma } from '@/lib/prisma';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.isbasvurusitesi.com';

  // Fetch all active jobs to generate dynamic sitemap entries
  const jobs = await prisma.job.findMany({
    where: { isActive: true },
    select: { id: true, updatedAt: true },
  });

  const trJobEntries: MetadataRoute.Sitemap = jobs.map((job) => ({
    url: `${baseUrl}/tr/jobs/${job.id}`,
    lastModified: job.updatedAt,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const deJobEntries: MetadataRoute.Sitemap = jobs.map((job) => ({
    url: `${baseUrl}/de/jobs/${job.id}`,
    lastModified: job.updatedAt,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  return [
    {
      url: `${baseUrl}/tr`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/de`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/tr/jobs`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/de/jobs`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    ...trJobEntries,
    ...deJobEntries,
  ];
}

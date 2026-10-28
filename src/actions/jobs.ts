'use server';

import { prisma } from '@/lib/prisma';

export async function getActiveJobs() {
  try {
    return await prisma.job.findMany({
      where: { isActive: true },
      orderBy: { createdAt: 'desc' },
    });
  } catch (error) {
    console.error('Aktif ilanlar çekilirken hata:', error);
    return [];
  }
}

export async function getFeaturedJobs() {
  try {
    return await prisma.job.findMany({
      where: { isFeatured: true },
      orderBy: { createdAt: 'desc' },
    });
  } catch (error) {
    console.error('Öne çıkan ilanlar çekilirken hata:', error);
    return [];
  }
}

export async function getJobById(id: string) {
  try {
    return await prisma.job.findUnique({
      where: { id },
      include: {
        _count: {
          select: { applications: true },
        },
      },
    });
  } catch (error) {
    console.error('İlan detayı çekilirken hata:', error);
    return null;
  }
}

export async function getAllJobs() {
  try {
    return await prisma.job.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        _count: {
          select: { applications: true },
        },
      },
    });
  } catch (error) {
    console.error('Tüm ilanlar çekilirken hata:', error);
    return [];
  }
}

export async function createJob(data: {
  title: string;
  titleDe: string;
  sector: string;
  location: string;
  type: string;
  experienceLevel?: string;
  description: string;
  descriptionDe: string;
  shortDesc: string;
  shortDescDe: string;
  isActive: boolean;
  isFeatured?: boolean;
  salaryMin?: number;
  salaryMax?: number;
  langLevel?: string;
}) {
  return await prisma.job.create({ data });
}

export async function updateJob(
  id: string,
  data: {
    title?: string;
    titleDe?: string;
    sector?: string;
    location?: string;
    type?: string;
    experienceLevel?: string;
    description?: string;
    descriptionDe?: string;
    shortDesc?: string;
    shortDescDe?: string;
    isActive?: boolean;
    isFeatured?: boolean;
    salaryMin?: number | null;
    salaryMax?: number | null;
    langLevel?: string | null;
  }
) {
  return await prisma.job.update({
    where: { id },
    data,
  });
}

export async function deleteJob(id: string) {
  return await prisma.job.delete({
    where: { id },
  });
}
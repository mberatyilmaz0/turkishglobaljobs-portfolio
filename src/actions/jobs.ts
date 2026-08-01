'use server';

import { prisma } from '@/lib/prisma';

export async function getActiveJobs() {
  return prisma.job.findMany({
    where: { isActive: true },
    orderBy: { createdAt: 'desc' },
  });
}

export async function getFeaturedJobs() {
  return prisma.job.findMany({
    where: { isFeatured: true },
    orderBy: { createdAt: 'desc' },
  });
}

export async function getJobById(id: string) {
  return prisma.job.findUnique({
    where: { id },
    include: {
      _count: {
        select: { applications: true },
      },
    },
  });
}

export async function getAllJobs() {
  return prisma.job.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      _count: {
        select: { applications: true },
      },
    },
  });
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
  imageUrl?: string;
  isActive: boolean;
  isFeatured?: boolean;
}) {
  return prisma.job.create({ data });
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
    imageUrl?: string;
    isActive?: boolean;
    isFeatured?: boolean;
  }
) {
  return prisma.job.update({
    where: { id },
    data,
  });
}

export async function deleteJob(id: string) {
  return prisma.job.delete({
    where: { id },
  });
}

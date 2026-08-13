'use server';

import { prisma } from '@/lib/prisma';
import fs from 'fs';
import path from 'path';

// Yüklenen görseli diskten güvenli şekilde sil
function deleteUploadedImage(imageUrl: string | null | undefined) {
  if (!imageUrl || !imageUrl.startsWith('/uploads/')) return;
  
  try {
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    const filePath = path.join(process.cwd(), 'public', imageUrl);
    
    // Path traversal koruması
    if (!filePath.startsWith(uploadDir)) return;
    
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  } catch (error) {
    console.error('Eski görsel silinemedi:', error);
  }
}

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
  // Görsel değişiyorsa eski görseli diskten sil
  if (data.imageUrl) {
    const existingJob = await prisma.job.findUnique({
      where: { id },
      select: { imageUrl: true },
    });
    if (existingJob?.imageUrl && existingJob.imageUrl !== data.imageUrl) {
      deleteUploadedImage(existingJob.imageUrl);
    }
  }

  return prisma.job.update({
    where: { id },
    data,
  });
}

export async function deleteJob(id: string) {
  // İlan silinmeden önce görselini diskten sil
  const job = await prisma.job.findUnique({
    where: { id },
    select: { imageUrl: true },
  });
  if (job?.imageUrl) {
    deleteUploadedImage(job.imageUrl);
  }

  return prisma.job.delete({
    where: { id },
  });
}

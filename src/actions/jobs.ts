'use server';

import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { getAdminUser, requireAdmin } from '@/lib/authz';

// ---- Doğrulama şemaları (bilinmeyen alanlar otomatik atılır: id, createdAt vb. enjekte edilemez) ----
const str = (max: number) => z.string().trim().max(max);
const optStr = (max: number) => z.string().trim().max(max).optional();
const optInt = z.number().int().min(0).max(1_000_000).nullable().optional();

const jobCreateSchema = z.object({
  title: str(300),
  titleDe: str(300),
  sector: str(200),
  location: str(300),
  type: str(200),
  experienceLevel: optStr(100),
  description: str(20000),
  descriptionDe: str(20000),
  shortDesc: str(1000),
  shortDescDe: str(1000),
  isActive: z.boolean(),
  isFeatured: z.boolean().optional(),
  salaryMin: optInt,
  salaryMax: optInt,
  langLevel: optStr(50).nullable(),
});

const jobUpdateSchema = jobCreateSchema.partial();

const idSchema = z.string().min(1).max(100);

// ---- Herkese açık okuma fonksiyonları ----

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
      // Pasif ilanlar öne çıkan listede görünmesin
      where: { isFeatured: true, isActive: true },
      orderBy: { createdAt: 'desc' },
    });
  } catch (error) {
    console.error('Öne çıkan ilanlar çekilirken hata:', error);
    return [];
  }
}

/** Herkese açık ilan detayı — yalnızca AKTİF ilanları döner. */
export async function getJobById(id: string) {
  if (!idSchema.safeParse(id).success) return null;
  try {
    return await prisma.job.findFirst({
      where: { id, isActive: true },
    });
  } catch (error) {
    console.error('İlan detayı çekilirken hata:', error);
    return null;
  }
}

// ---- Yalnızca admin ----

/** Admin düzenleme sayfası için — pasif ilanlar dahil. */
export async function getJobByIdForAdmin(id: string) {
  if (!(await getAdminUser())) return null;
  if (!idSchema.safeParse(id).success) return null;
  try {
    return await prisma.job.findUnique({
      where: { id },
    });
  } catch (error) {
    console.error('İlan detayı çekilirken hata:', error);
    return null;
  }
}

export async function getAllJobs() {
  if (!(await getAdminUser())) return [];
  try {
    return await prisma.job.findMany({
      orderBy: { createdAt: 'desc' },
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
  await requireAdmin();
  const parsed = jobCreateSchema.parse(data);
  return await prisma.job.create({ data: parsed });
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
  await requireAdmin();
  const validId = idSchema.parse(id);
  const parsed = jobUpdateSchema.parse(data);
  return await prisma.job.update({
    where: { id: validId },
    data: parsed,
  });
}

export async function deleteJob(id: string) {
  await requireAdmin();
  const validId = idSchema.parse(id);
  return await prisma.job.delete({
    where: { id: validId },
  });
}

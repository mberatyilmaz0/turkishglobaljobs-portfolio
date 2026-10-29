'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { auth } from '@/lib/auth';
import {
  HOME_STATS_DEFAULT,
  HOME_SERVICES_DEFAULT,
  HOME_PROCESS_DEFAULT,
  HOME_FAQ_DEFAULT,
  OPPORTUNITY_SCORING_DEFAULT,
  OPPORTUNITY_REQUIREMENTS_DEFAULT,
  EDUCATION_COMPARE_DEFAULT,
  EDUCATION_UNI_DEFAULT,
  EDUCATION_AUS_DEFAULT,
  ABOUT_PRINCIPLES_DEFAULT,
} from '@/lib/contentDefaults';

function isDbAvailable(): boolean {
  const url = process.env.DATABASE_URL || '';
  return url.startsWith('postgresql://') || url.startsWith('postgres://');
}

const DEFAULTS: Record<string, unknown> = {
  'home.stats': HOME_STATS_DEFAULT,
  'home.services': HOME_SERVICES_DEFAULT,
  'home.process': HOME_PROCESS_DEFAULT,
  'home.faq': HOME_FAQ_DEFAULT,
  'opportunity.scoring': OPPORTUNITY_SCORING_DEFAULT,
  'opportunity.requirements': OPPORTUNITY_REQUIREMENTS_DEFAULT,
  'education.compare': EDUCATION_COMPARE_DEFAULT,
  'education.uni': EDUCATION_UNI_DEFAULT,
  'education.aus': EDUCATION_AUS_DEFAULT,
  'about.principles': ABOUT_PRINCIPLES_DEFAULT,
};

export async function getContent<T>(key: string): Promise<T> {
  const fallback = (DEFAULTS[key] ?? {}) as T;
  if (!isDbAvailable()) return fallback;

  try {
    const row = await prisma.siteContent.findUnique({ where: { key } });
    if (!row) return fallback;
    return row.value as T;
  } catch {
    return fallback;
  }
}

export async function saveContent(key: string, data: unknown): Promise<{ ok: boolean; error?: string }> {
  const session = await auth();
  if (!session || session.user?.role !== 'ADMIN') {
    return { ok: false, error: 'Yetkisiz erişim' };
  }

  if (!isDbAvailable()) return { ok: false, error: 'Veritabanı bağlantısı yok' };

  try {
    await prisma.siteContent.upsert({
      where: { key },
      create: { key, value: data as never },
      update: { value: data as never },
    });
    revalidatePath('/', 'layout');
    return { ok: true };
  } catch (err) {
    console.error('saveContent hatası:', err);
    return { ok: false, error: 'Kayıt başarısız' };
  }
}

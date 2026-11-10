'use server';

import { headers } from 'next/headers';
import { prisma } from '@/lib/prisma';
import { rateLimit, getClientIp } from '@/lib/rateLimit';
import { getAdminUser } from '@/lib/authz';

export async function incrementDailyVisit() {
  try {
    // IP başına saatte en fazla 100 sayım — sayacın şişirilmesini ve DB'ye
    // yazma bombardımanını engeller
    const ip = getClientIp(await headers());
    if (!rateLimit(`visit:${ip}`, 100, 60 * 60 * 1000)) return;

    const today = new Date();
    // Normalize to midnight UTC to group by day safely
    today.setUTCHours(0, 0, 0, 0);

    await prisma.siteVisit.upsert({
      where: { date: today },
      update: { count: { increment: 1 } },
      create: { date: today, count: 1 },
    });
  } catch (error) {
    console.error('Failed to increment daily visit:', error);
  }
}

/** Admin kontrol paneli istatistikleri (yalnızca admin) */
export async function getAdminStats() {
  if (!(await getAdminUser())) return null;

  try {
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);

    const [activeJobs, totalJobs, featuredJobs, todayVisit] = await Promise.all([
      prisma.job.count({ where: { isActive: true } }),
      prisma.job.count(),
      prisma.job.count({ where: { isActive: true, isFeatured: true } }),
      prisma.siteVisit.findUnique({ where: { date: today } }),
    ]);

    return {
      activeJobs,
      totalJobs,
      featuredJobs,
      dailyVisits: todayVisit?.count || 0,
    };
  } catch {
    return { activeJobs: 0, totalJobs: 0, featuredJobs: 0, dailyVisits: 0 };
  }
}

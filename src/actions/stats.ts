'use server';

import { prisma } from '@/lib/prisma';

export async function incrementDailyVisit() {
  try {
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

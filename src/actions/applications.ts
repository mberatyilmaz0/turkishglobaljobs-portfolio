'use server';

import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';

function isDbAvailable(): boolean {
  const url = process.env.DATABASE_URL || '';
  return url.startsWith('postgresql://') || url.startsWith('postgres://');
}

export async function applyToJob(jobId: string, coverNote?: string) {
  if (!isDbAvailable()) return { error: 'Veritabanı bağlantısı yok. Başvuru yapılamıyor.' };
  const session = await auth();
  if (!session?.user?.id) return { error: 'Unauthorized' };

  try {
    const existing = await prisma.application.findUnique({
      where: {
        userId_jobId: {
          userId: session.user.id,
          jobId,
        },
      },
    });

    if (existing) {
      return { error: 'alreadyApplied' };
    }

    await prisma.application.create({
      data: {
        userId: session.user.id,
        jobId,
        coverNote: coverNote || null,
      },
    });

    return { success: true };
  } catch {
    return { error: 'Veritabanı hatası. Lütfen daha sonra tekrar deneyin.' };
  }
}

export async function getUserApplications() {
  if (!isDbAvailable()) return [];
  const session = await auth();
  if (!session?.user?.id) return [];

  try {
    return await prisma.application.findMany({
      where: { userId: session.user.id },
      include: { job: true },
      orderBy: { createdAt: 'desc' },
    });
  } catch {
    return [];
  }
}

export async function hasApplied(jobId: string) {
  if (!isDbAvailable()) return false;
  const session = await auth();
  if (!session?.user?.id) return false;

  try {
    const application = await prisma.application.findUnique({
      where: {
        userId_jobId: {
          userId: session.user.id,
          jobId,
        },
      },
    });
    return !!application;
  } catch {
    return false;
  }
}

// Admin actions
export async function getAllApplications() {
  if (!isDbAvailable()) return [];
  const session = await auth();
  if (!session?.user?.id) return [];

  try {
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
    });

    if (user?.role !== 'ADMIN') return [];

    return await prisma.application.findMany({
      include: {
        user: {
          include: {
            experiences: true,
            educations: true,
            skills: true,
            languages: true,
          },
        },
        job: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  } catch {
    return [];
  }
}

export async function getApplicationById(id: string) {
  if (!isDbAvailable()) return null;
  const session = await auth();
  if (!session?.user?.id) return null;

  try {
    const admin = await prisma.user.findUnique({
      where: { id: session.user.id },
    });

    if (admin?.role !== 'ADMIN') return null;

    return await prisma.application.findUnique({
      where: { id },
      include: {
        user: {
          include: {
            experiences: { orderBy: { startDate: 'desc' } },
            educations: { orderBy: { startDate: 'desc' } },
            skills: true,
            languages: true,
          },
        },
        job: true,
      },
    });
  } catch {
    return null;
  }
}

export async function updateApplicationStatus(
  id: string,
  status: 'PENDING' | 'REVIEWED' | 'ACCEPTED' | 'REJECTED'
) {
  if (!isDbAvailable()) return { error: 'Veritabanı bağlantısı yok.' };
  const session = await auth();
  if (!session?.user?.id) return { error: 'Unauthorized' };

  try {
    const admin = await prisma.user.findUnique({
      where: { id: session.user.id },
    });

    if (admin?.role !== 'ADMIN') return { error: 'Forbidden' };

    await prisma.application.update({
      where: { id },
      data: { status },
    });

    return { success: true };
  } catch {
    return { error: 'Veritabanı hatası.' };
  }
}

export async function getAdminStats() {
  if (!isDbAvailable()) {
    return {
      totalApplications: 0,
      acceptedApplications: 0,
      rejectedApplications: 0,
      activeJobs: 6,
      totalUsers: 0,
      dailyVisits: 0,
    };
  }
  const session = await auth();
  if (!session?.user?.id) return null;

  try {
    const admin = await prisma.user.findUnique({
      where: { id: session.user.id },
    });

    if (admin?.role !== 'ADMIN') return null;

    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);

    const [totalApplications, acceptedApplications, rejectedApplications, activeJobs, totalUsers, todayVisit] =
      await Promise.all([
        prisma.application.count(),
        prisma.application.count({ where: { status: 'ACCEPTED' } }),
        prisma.application.count({ where: { status: 'REJECTED' } }),
        prisma.job.count({ where: { isActive: true } }),
        prisma.user.count({ where: { role: 'USER' } }),
        prisma.siteVisit.findUnique({ where: { date: today } }),
      ]);

    return {
      totalApplications,
      acceptedApplications,
      rejectedApplications,
      activeJobs,
      totalUsers,
      dailyVisits: todayVisit?.count || 0,
    };
  } catch {
    return {
      totalApplications: 0,
      acceptedApplications: 0,
      rejectedApplications: 0,
      activeJobs: 0,
      totalUsers: 0,
      dailyVisits: 0,
    };
  }
}

export async function deleteApplication(id: string) {
  if (!isDbAvailable()) return { error: 'Veritabanı bağlantısı yok.' };
  const session = await auth();
  if (!session?.user?.id) return { error: 'Unauthorized' };

  try {
    const admin = await prisma.user.findUnique({
      where: { id: session.user.id },
    });

    if (admin?.role !== 'ADMIN') return { error: 'Forbidden' };

    await prisma.application.delete({
      where: { id },
    });

    return { success: true };
  } catch {
    return { error: 'Veritabanı hatası.' };
  }
}

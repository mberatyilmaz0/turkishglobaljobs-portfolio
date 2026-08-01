'use server';

import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';


export async function applyToJob(jobId: string, coverNote?: string) {
  const session = await auth();
  if (!session?.user?.id) return { error: 'Unauthorized' };

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
}

export async function getUserApplications() {
  const session = await auth();
  if (!session?.user?.id) return [];

  return prisma.application.findMany({
    where: { userId: session.user.id },
    include: { job: true },
    orderBy: { createdAt: 'desc' },
  });
}

export async function hasApplied(jobId: string) {
  const session = await auth();
  if (!session?.user?.id) return false;

  const application = await prisma.application.findUnique({
    where: {
      userId_jobId: {
        userId: session.user.id,
        jobId,
      },
    },
  });

  return !!application;
}

// Admin actions
export async function getAllApplications() {
  const session = await auth();
  if (!session?.user?.id) return [];

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
  });

  if (user?.role !== 'ADMIN') return [];

  return prisma.application.findMany({
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
}

export async function getApplicationById(id: string) {
  const session = await auth();
  if (!session?.user?.id) return null;

  const admin = await prisma.user.findUnique({
    where: { id: session.user.id },
  });

  if (admin?.role !== 'ADMIN') return null;

  return prisma.application.findUnique({
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
}

export async function updateApplicationStatus(
  id: string,
  status: 'PENDING' | 'REVIEWED' | 'ACCEPTED' | 'REJECTED'
) {
  const session = await auth();
  if (!session?.user?.id) return { error: 'Unauthorized' };

  const admin = await prisma.user.findUnique({
    where: { id: session.user.id },
  });

  if (admin?.role !== 'ADMIN') return { error: 'Forbidden' };

  await prisma.application.update({
    where: { id },
    data: { status },
  });

  return { success: true };
}

export async function getAdminStats() {
  const session = await auth();
  if (!session?.user?.id) return null;

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
    dailyVisits: todayVisit?.count || 0
  };
}

export async function deleteApplication(id: string) {
  const session = await auth();
  if (!session?.user?.id) return { error: 'Unauthorized' };

  const admin = await prisma.user.findUnique({
    where: { id: session.user.id },
  });

  if (admin?.role !== 'ADMIN') return { error: 'Forbidden' };

  await prisma.application.delete({
    where: { id },
  });

  return { success: true };
}

'use server';

import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';

export async function updateProfile(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) return { error: 'Unauthorized' };

  const firstName = formData.get('firstName') as string;
  const lastName = formData.get('lastName') as string;
  const phone = formData.get('phone') as string;

  await prisma.user.update({
    where: { id: session.user.id },
    data: { firstName, lastName, phone },
  });

  return { success: true };
}

export async function addExperience(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) return { error: 'Unauthorized' };

  await prisma.experience.create({
    data: {
      userId: session.user.id,
      company: formData.get('company') as string,
      position: formData.get('position') as string,
      startDate: new Date(formData.get('startDate') as string),
      endDate: formData.get('endDate')
        ? new Date(formData.get('endDate') as string)
        : null,
      description: (formData.get('description') as string) || null,
      current: formData.get('current') === 'true',
    },
  });

  return { success: true };
}

export async function deleteExperience(id: string) {
  const session = await auth();
  if (!session?.user?.id) return { error: 'Unauthorized' };

  await prisma.experience.delete({
    where: { id, userId: session.user.id },
  });

  return { success: true };
}

export async function addEducation(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) return { error: 'Unauthorized' };

  await prisma.education.create({
    data: {
      userId: session.user.id,
      institution: formData.get('institution') as string,
      degree: formData.get('degree') as string,
      field: (formData.get('field') as string) || null,
      startDate: new Date(formData.get('startDate') as string),
      endDate: formData.get('endDate')
        ? new Date(formData.get('endDate') as string)
        : null,
      current: formData.get('current') === 'true',
    },
  });

  return { success: true };
}

export async function deleteEducation(id: string) {
  const session = await auth();
  if (!session?.user?.id) return { error: 'Unauthorized' };

  await prisma.education.delete({
    where: { id, userId: session.user.id },
  });

  return { success: true };
}

export async function addSkill(name: string) {
  const session = await auth();
  if (!session?.user?.id) return { error: 'Unauthorized' };

  await prisma.skill.create({
    data: { userId: session.user.id, name },
  });

  return { success: true };
}

export async function deleteSkill(id: string) {
  const session = await auth();
  if (!session?.user?.id) return { error: 'Unauthorized' };

  await prisma.skill.delete({
    where: { id, userId: session.user.id },
  });

  return { success: true };
}

export async function addLanguage(name: string, level: string) {
  const session = await auth();
  if (!session?.user?.id) return { error: 'Unauthorized' };

  await prisma.language.create({
    data: { userId: session.user.id, name, level },
  });

  return { success: true };
}

export async function deleteLanguage(id: string) {
  const session = await auth();
  if (!session?.user?.id) return { error: 'Unauthorized' };

  await prisma.language.delete({
    where: { id, userId: session.user.id },
  });

  return { success: true };
}

export async function getUserProfile() {
  const session = await auth();
  if (!session?.user?.id) return null;

  return prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      experiences: { orderBy: { startDate: 'desc' } },
      educations: { orderBy: { startDate: 'desc' } },
      skills: true,
      languages: true,
    },
  });
}

export async function updateCvUrl(cvUrl: string) {
  const session = await auth();
  if (!session?.user?.id) return { error: 'Unauthorized' };

  await prisma.user.update({
    where: { id: session.user.id },
    data: { cvUrl },
  });

  return { success: true };
}

import { auth } from './auth';
import { prisma } from './prisma';

/**
 * Oturumdaki kullanıcının ADMIN olup olmadığını VERİTABANINDAN doğrular.
 * (JWT'deki role alanı eski kalabileceği için DB esas alınır.)
 * Admin değilse null döner.
 */
export async function getAdminUser() {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) return null;

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, role: true },
    });
    if (user?.role !== 'ADMIN') return null;
    return user;
  } catch {
    return null;
  }
}

/** Admin değilse hata fırlatır. Server action'ların en başında çağrılmalı. */
export async function requireAdmin() {
  const admin = await getAdminUser();
  if (!admin) throw new Error('Forbidden');
  return admin;
}

/** Oturum açmış kullanıcının id'sini döner, yoksa null. */
export async function getSessionUserId(): Promise<string | null> {
  const session = await auth();
  return session?.user?.id ?? null;
}

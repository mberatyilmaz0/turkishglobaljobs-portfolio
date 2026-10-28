'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

function isDbAvailable(): boolean {
  const url = process.env.DATABASE_URL || '';
  return url.startsWith('postgresql://') || url.startsWith('postgres://');
}

const DEFAULT_SETTINGS = {
  id: '',
  address: "Levent Mah. Büyükdere Cad. No: 123\nŞişli, İstanbul 34330\nTürkiye",
  email: "info@kariyerportal.com\nik@kariyerportal.com",
  phone: "+90 (212) 555 00 00\n+90 (532) 555 00 00",
  createdAt: new Date(),
  updatedAt: new Date(),
};

export async function getSettings() {
  if (!isDbAvailable()) return DEFAULT_SETTINGS;

  try {
    const settings = await prisma.siteSettings.findFirst();
    if (!settings) return DEFAULT_SETTINGS;
    return settings;
  } catch {
    // DB bağlantı hatası — varsayılan değerleri döndür
    return DEFAULT_SETTINGS;
  }
}

export async function updateSettings(data: { address: string; email: string; phone: string }) {
  if (!isDbAvailable()) return; // DB yoksa sessizce çık

  try {
    const settings = await prisma.siteSettings.findFirst();

    if (settings) {
      await prisma.siteSettings.update({
        where: { id: settings.id },
        data,
      });
    } else {
      await prisma.siteSettings.create({ data });
    }

    // Sitenin her yerinde güncellenmesi için önbelleği (cache) temizle
    revalidatePath('/', 'layout');
  } catch (error) {
    console.error('updateSettings hatası:', error);
  }
}

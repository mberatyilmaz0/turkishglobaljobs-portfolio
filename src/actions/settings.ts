'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function getSettings() {
  let settings = await prisma.siteSettings.findFirst();
  
  if (!settings) {
    settings = await prisma.siteSettings.create({
      data: {
        address: "Levent Mah. Büyükdere Cad. No: 123\nŞişli, İstanbul 34330\nTürkiye",
        email: "info@kariyerportal.com\nik@kariyerportal.com",
        phone: "+90 (212) 555 00 00\n+90 (532) 555 00 00"
      }
    });
  }
  
  return settings;
}

export async function updateSettings(data: { address: string; email: string; phone: string }) {
  const settings = await prisma.siteSettings.findFirst();
  
  if (settings) {
    await prisma.siteSettings.update({
      where: { id: settings.id },
      data
    });
  } else {
    await prisma.siteSettings.create({ data });
  }

  // Sitenin her yerinde güncellenmesi için önbelleği (cache) temizle
  revalidatePath('/', 'layout');
}

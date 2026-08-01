import { PrismaClient } from '@prisma/client';
import { PrismaLibSql } from '@prisma/adapter-libsql';
import bcrypt from 'bcryptjs';
import path from 'path';

const adapter = new PrismaLibSql({ url: `file:${path.join(process.cwd(), 'dev.db')}` });
const prisma = new PrismaClient({ adapter });



async function main() {
  // Create admin users
  const adminPassword = await bcrypt.hash('admin123', 12);
  
  await prisma.user.upsert({
    where: { email: 'admin@kariyerportal.com' },
    update: {},
    create: {
      email: 'admin@kariyerportal.com',
      password: adminPassword,
      firstName: 'Admin',
      lastName: 'User',
      role: 'ADMIN',
    },
  });

  await prisma.user.upsert({
    where: { email: 'admin2@kariyerportal.com' },
    update: {},
    create: {
      email: 'admin2@kariyerportal.com',
      password: adminPassword,
      firstName: 'Admin',
      lastName: 'İki',
      role: 'ADMIN',
    },
  });

  // Create sample jobs
  const jobs = [
    {
      title: 'Yazılım Geliştirici',
      titleDe: 'Softwareentwickler',
      sector: 'Teknoloji',
      location: 'İstanbul',
      type: 'Full-time',
      shortDesc: 'Modern web teknolojileri ile projeler geliştirin.',
      shortDescDe: 'Entwickeln Sie Projekte mit modernen Webtechnologien.',
      description: 'Ekibimize katılacak deneyimli bir yazılım geliştirici arıyoruz.\n\nGereksinimler:\n- React, Next.js deneyimi\n- TypeScript bilgisi\n- REST API tasarımı\n- Git kullanımı\n\nSunduklarımız:\n- Rekabetçi maaş\n- Uzaktan çalışma imkanı\n- Sürekli eğitim desteği',
      descriptionDe: 'Wir suchen einen erfahrenen Softwareentwickler für unser Team.\n\nAnforderungen:\n- Erfahrung mit React, Next.js\n- TypeScript-Kenntnisse\n- REST API Design\n- Git-Erfahrung\n\nWas wir bieten:\n- Wettbewerbsfähiges Gehalt\n- Remote-Arbeit möglich\n- Kontinuierliche Weiterbildung',
    },
    {
      title: 'Grafik Tasarımcı',
      titleDe: 'Grafikdesigner',
      sector: 'Tasarım',
      location: 'Ankara',
      type: 'Full-time',
      shortDesc: 'Yaratıcı tasarımlar ile markamızı güçlendirin.',
      shortDescDe: 'Stärken Sie unsere Marke mit kreativen Designs.',
      description: 'Kreatif ekibimize katılacak yetenekli bir grafik tasarımcı arıyoruz.\n\nGereksinimler:\n- Adobe Creative Suite (Photoshop, Illustrator, InDesign)\n- UI/UX tasarım deneyimi\n- Portföy gereklidir\n\nSunduklarımız:\n- Yaratıcı çalışma ortamı\n- Esnek çalışma saatleri',
      descriptionDe: 'Wir suchen einen talentierten Grafikdesigner für unser kreatives Team.\n\nAnforderungen:\n- Adobe Creative Suite (Photoshop, Illustrator, InDesign)\n- UI/UX-Design-Erfahrung\n- Portfolio erforderlich\n\nWas wir bieten:\n- Kreative Arbeitsumgebung\n- Flexible Arbeitszeiten',
    },
    {
      title: 'Müşteri İlişkileri Uzmanı',
      titleDe: 'Kundenbeziehungsspezialist',
      sector: 'Hizmet',
      location: 'İzmir',
      type: 'Full-time',
      shortDesc: 'Müşteri memnuniyetini en üst düzeye taşıyın.',
      shortDescDe: 'Maximieren Sie die Kundenzufriedenheit.',
      description: 'Müşteri ilişkileri departmanımız için uzman arıyoruz.\n\nGereksinimler:\n- CRM yazılımları deneyimi\n- Güçlü iletişim becerileri\n- Problem çözme yeteneği\n\nSunduklarımız:\n- Kariyer gelişim fırsatları\n- Performans primleri',
      descriptionDe: 'Wir suchen einen Spezialisten für unsere Kundenabteilung.\n\nAnforderungen:\n- Erfahrung mit CRM-Software\n- Starke Kommunikationsfähigkeiten\n- Problemlösungsfähigkeit\n\nWas wir bieten:\n- Karriereentwicklungsmöglichkeiten\n- Leistungsprämien',
    },
    {
      title: 'Dijital Pazarlama Uzmanı',
      titleDe: 'Spezialist für digitales Marketing',
      sector: 'Pazarlama',
      location: 'İstanbul',
      type: 'Full-time',
      shortDesc: 'Dijital stratejiler ile büyümemize katkı sağlayın.',
      shortDescDe: 'Tragen Sie mit digitalen Strategien zu unserem Wachstum bei.',
      description: 'Dijital pazarlama ekibimize katılacak uzman arıyoruz.\n\nGereksinimler:\n- SEO/SEM deneyimi\n- Google Analytics bilgisi\n- Sosyal medya yönetimi\n- İçerik stratejisi\n\nSunduklarımız:\n- Dinamik çalışma ortamı\n- Eğitim bütçesi',
      descriptionDe: 'Wir suchen einen Spezialisten für unser digitales Marketing-Team.\n\nAnforderungen:\n- SEO/SEM-Erfahrung\n- Google Analytics-Kenntnisse\n- Social-Media-Management\n- Content-Strategie\n\nWas wir bieten:\n- Dynamische Arbeitsumgebung\n- Weiterbildungsbudget',
    },
    {
      title: 'Otel Resepsiyon Görevlisi',
      titleDe: 'Hotelrezeptionist',
      sector: 'Turizm',
      location: 'Antalya',
      type: 'Full-time',
      shortDesc: 'Konuklarımıza unutulmaz deneyimler sunun.',
      shortDescDe: 'Bieten Sie unseren Gästen unvergessliche Erlebnisse.',
      description: 'Otelimiz için deneyimli resepsiyon görevlisi arıyoruz.\n\nGereksinimler:\n- Turizm/otelcilik eğitimi\n- İngilizce ve Almanca bilgisi\n- Vardiyalı çalışmaya uygunluk\n\nSunduklarımız:\n- Konaklama imkanı\n- Yemek kartı\n- Sosyal haklar',
      descriptionDe: 'Wir suchen einen erfahrenen Rezeptionisten für unser Hotel.\n\nAnforderungen:\n- Tourismus-/Hotelausbildung\n- Englisch- und Deutschkenntnisse\n- Bereitschaft zur Schichtarbeit\n\nWas wir bieten:\n- Unterkunftsmöglichkeit\n- Essensgutscheine\n- Sozialleistungen',
    },
    {
      title: 'Muhasebe Uzmanı',
      titleDe: 'Buchhaltungsspezialist',
      sector: 'Finans',
      location: 'Bursa',
      type: 'Full-time',
      shortDesc: 'Finansal süreçlerimizi profesyonelce yönetin.',
      shortDescDe: 'Verwalten Sie unsere Finanzprozesse professionell.',
      description: 'Muhasebe departmanımız için uzman arıyoruz.\n\nGereksinimler:\n- Muhasebe/Finans lisans derecesi\n- ERP sistemleri deneyimi\n- Vergi mevzuatı bilgisi\n\nSunduklarımız:\n- Rekabetçi maaş paketi\n- Özel sağlık sigortası',
      descriptionDe: 'Wir suchen einen Spezialisten für unsere Buchhaltungsabteilung.\n\nAnforderungen:\n- Bachelor-Abschluss in Buchhaltung/Finanzen\n- Erfahrung mit ERP-Systemen\n- Kenntnisse im Steuerrecht\n\nWas wir bieten:\n- Wettbewerbsfähiges Gehaltspaket\n- Private Krankenversicherung',
    },
  ];

  for (const job of jobs) {
    await prisma.job.create({ data: job });
  }

  console.log('Seed data created successfully!');
  console.log('Admin login: admin@kariyerportal.com / admin123');
  console.log('Admin 2 login: admin2@kariyerportal.com / admin123');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

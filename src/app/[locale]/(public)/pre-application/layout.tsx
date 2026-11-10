import type { Metadata } from 'next';
import { alternatesFor } from '@/lib/site';

// page.tsx bir client component olduğu için SEO bilgileri burada tanımlanır
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isDE = locale === 'de';

  const title = isDE
    ? 'Kostenlose Vorab-Bewerbung für Deutschland'
    : 'Ücretsiz Ön Değerlendirme – Almanya Başvurusu';
  const description = isDE
    ? 'Füllen Sie das kurze Formular aus: Unsere Berater prüfen Ihre Chancen für Job, Chancenkarte, Studium oder Ausbildung in Deutschland und melden sich innerhalb von 24 Stunden.'
    : 'Kısa formu doldurun; uzman danışmanlarımız Almanya\'da iş, Fırsat Kartı, üniversite veya Ausbildung için uygunluğunuzu değerlendirip 24 saat içinde size dönsün.';

  return {
    title,
    description,
    alternates: alternatesFor(locale, '/pre-application'),
    // Sayfa düzeyindeki openGraph üst ayarı tamamen ezdiği için görsel burada da verilir
    openGraph: {
      title,
      description,
      type: 'website',
      siteName: 'Turkish Global',
      images: [{ url: '/img/turkishglobal.webp', alt: 'Turkish Global' }],
    },
  };
}

export default function PreApplicationLayout({ children }: { children: React.ReactNode }) {
  return children;
}

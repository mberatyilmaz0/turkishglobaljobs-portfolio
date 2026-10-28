import createNextIntlPlugin from 'next-intl/plugin';
import type { NextConfig } from "next";

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

// [eski İngilizce slug, TR slug, DE slug]
const slugMap = [
  ["jobs", "almanya-is", "arbeit-in-deutschland"],
  ["opportunity-card", "firsat-karti", "chancenkarte"],
  ["education", "almanya-egitim", "bildung-in-deutschland"],
  ["pre-application", "on-basvuru", "vorab-bewerbung"],
];

const nextConfig: NextConfig = {
  // Görsel optimizasyonu
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.public.blob.vercel-storage.com',
      },
      {
        protocol: 'https',
        hostname: 'flagcdn.com',
      },
    ],
  },
  // Production performans
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,

  // Eski İngilizce adresler -> yeni dil slug'ları (301)
  async redirects() {
    return slugMap.flatMap(([en, tr, de]) => [
      { source: `/tr/${en}`, destination: `/tr/${tr}`, permanent: true },
      { source: `/de/${en}`, destination: `/de/${de}`, permanent: true },
    ]).concat([
      { source: "/tr/jobs/:id", destination: "/tr/almanya-is/:id", permanent: true },
      { source: "/de/jobs/:id", destination: "/de/arbeit-in-deutschland/:id", permanent: true },
    ]);
  },
};

export default withNextIntl(nextConfig);
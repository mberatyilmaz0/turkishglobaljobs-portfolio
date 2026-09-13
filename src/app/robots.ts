import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.your-domain.com'; // Adjust to real domain later
  
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/dashboard/', '/auth/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}

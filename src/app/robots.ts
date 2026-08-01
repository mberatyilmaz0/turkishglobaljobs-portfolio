import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.isbasvurusitesi.com'; // Adjust to real domain later
  
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/dashboard/', '/auth/'], // Prevent crawling of private/auth pages
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}

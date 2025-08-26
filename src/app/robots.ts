// src/app/robots.ts -- NEW FILE

import { MetadataRoute } from 'next';

// This function generates the robots.txt file.
export default function robots(): MetadataRoute.Robots {
  const siteUrl = 'https://zainkhalid.vercel.app';

  return {
    rules: {
      userAgent: '*', // Rule applies to all web crawlers
      allow: '/',     // Allow crawling of all pages starting from the root
      disallow: '/api/', // Disallow crawling of the API routes
    },
    sitemap: `${siteUrl}/sitemap.xml`, // Location of your sitemap
  };
}
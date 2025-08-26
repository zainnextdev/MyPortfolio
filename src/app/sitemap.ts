// src/app/sitemap.ts -- NEW FILE

import { MetadataRoute } from 'next';

// This function generates the sitemap.xml file.
export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = 'https://zainkhalid.vercel.app';

  // For a single-page portfolio, we only need to list the main URL.
  // If you add a blog or other pages later, you would add them to this array.
  return [
    {
      url: siteUrl,
      lastModified: new Date().toISOString(), // Automatically set to the build date
      changeFrequency: 'monthly', // How often the content is likely to change
      priority: 1, // The priority of this URL relative to other URLs on your site (1.0 is highest)
    },
  ];
}
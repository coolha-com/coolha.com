import type { MetadataRoute } from 'next'
export default function sitemap(): MetadataRoute.Sitemap {
    return [
      {
        url: 'https://coolha.com',
        lastModified: new Date(),
        changeFrequency: 'yearly',
        priority: 1,
      },
      {
        url: 'https://coolha.com/p',
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.8,
      },
      {
        url: 'https://coolha.com/u',
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.5,
        /* images: ['https://coolha.com/favicon.ico'], */
      },
    ]
  }
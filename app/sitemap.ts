import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://omrawat.xyz',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
  ]
}
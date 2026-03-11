import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/quote/thank-you'],
    },
    sitemap: 'https://floridapolebarn.com/sitemap.xml',
  }
}

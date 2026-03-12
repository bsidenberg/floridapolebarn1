import type { MetadataRoute } from 'next'

const BASE = 'https://floridapolebarn.com'

const BLOG_SLUGS = [
  'how-much-does-a-pole-barn-cost-in-florida',
  'do-you-need-a-permit-for-a-pole-barn-in-florida',
  'open-vs-enclosed-pole-barn-florida',
  'best-pole-barn-sizes-for-florida',
  'pole-barn-hurricane-rating-florida',
  'horse-barn-planning-florida',
]

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const routes = [
    { url: '/', priority: 1.0, changeFrequency: 'weekly' as const },
    { url: '/open-pole-barns', priority: 0.9, changeFrequency: 'monthly' as const },
    { url: '/enclosed-pole-barns', priority: 0.9, changeFrequency: 'monthly' as const },
    { url: '/horse-barns', priority: 0.8, changeFrequency: 'monthly' as const },
    { url: '/equipment-storage', priority: 0.8, changeFrequency: 'monthly' as const },
    { url: '/rv-boat-storage', priority: 0.8, changeFrequency: 'monthly' as const },
    { url: '/workshop-garage', priority: 0.8, changeFrequency: 'monthly' as const },
    { url: '/agricultural-buildings', priority: 0.8, changeFrequency: 'monthly' as const },
    { url: '/gallery', priority: 0.7, changeFrequency: 'weekly' as const },
    { url: '/quote', priority: 0.95, changeFrequency: 'monthly' as const },
    { url: '/about', priority: 0.6, changeFrequency: 'monthly' as const },
    { url: '/service-area', priority: 0.7, changeFrequency: 'monthly' as const },
    { url: '/faq', priority: 0.7, changeFrequency: 'monthly' as const },
    { url: '/blog', priority: 0.6, changeFrequency: 'weekly' as const },
  ]

  const blogRoutes = BLOG_SLUGS.map((slug) => ({
    url: `${BASE}/blog/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [
    ...routes.map(({ url, priority, changeFrequency }) => ({
      url: `${BASE}${url}`,
      lastModified: now,
      changeFrequency,
      priority,
    })),
    ...blogRoutes,
  ]
}

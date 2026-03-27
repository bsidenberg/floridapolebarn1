import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import CTABanner from '@/components/home/CTABanner'

export const metadata: Metadata = {
  title: 'Pole Barn Blog — Florida Tips & Guides',
  description:
    'Pole barn guides, cost breakdowns, permit info, and tips for Florida property owners. Learn everything you need to know before building your pole barn.',
  alternates: { canonical: 'https://floridapolebarn.com/blog' },
  openGraph: {
    title: 'Pole Barn Blog — Florida Tips & Guides | Florida Pole Barn',
    description: 'Pole barn guides, cost breakdowns, permit info, and tips for Florida property owners.',
    url: 'https://floridapolebarn.com/blog',
    images: [{ url: 'https://floridapolebarn.com/og-image.jpg', width: 1200, height: 630 }],
  },
}

const posts = [
  {
    slug: 'how-much-does-a-pole-barn-cost-in-florida',
    title: 'How Much Does a Pole Barn Cost in Florida? (2026 Guide)',
    excerpt:
      'Complete breakdown of pole barn costs in Florida — kit prices, installation, concrete, permits, and what to budget. Real numbers from a Florida builder.',
    date: '2026-03-27',
    readTime: '6 min read',
    category: 'Cost Guide',
    image: '/IMG_9001.jpg',
  },
  {
    slug: 'do-you-need-a-permit-for-a-pole-barn-in-florida',
    title: 'Do You Need a Permit for a Pole Barn in Florida?',
    excerpt:
      'Florida building permit requirements for pole barns — what varies by county, agricultural exemptions, and how to navigate the permit process.',
    date: '2025-01-10',
    readTime: '5 min read',
    category: 'Permits & Regulations',
    image: '/IMG_9002.jpg',
  },
  {
    slug: 'open-vs-enclosed-pole-barn-florida',
    title: 'Open vs. Enclosed Pole Barn: Which Is Right for Your Florida Property?',
    excerpt:
      'Side-by-side comparison of open and enclosed pole barns for Florida use cases — cost, ventilation, weather protection, and which works best for each application.',
    date: '2025-01-05',
    readTime: '5 min read',
    category: 'Buying Guide',
    image: '/Open.jpg',
  },
  {
    slug: 'best-pole-barn-sizes-for-florida',
    title: 'Best Pole Barn Sizes for Common Uses in Florida',
    excerpt:
      'A practical guide to choosing the right size pole barn for horse barns, equipment storage, RV shelters, and workshops based on real Florida builds.',
    date: '2024-12-20',
    readTime: '4 min read',
    category: 'Buying Guide',
    image: '/IMG_6690.jpg',
  },
  {
    slug: 'pole-barn-hurricane-rating-florida',
    title: 'Pole Barn Hurricane Ratings: What 140 MPH Really Means',
    excerpt:
      'What the 140 MPH wind rating on Florida pole barns actually means, how structures are tested, and what to look for when buying a barn kit in a hurricane state.',
    date: '2024-12-10',
    readTime: '4 min read',
    category: 'Construction & Materials',
    image: '/Gable-Dress-with-Roof-Trim.jpg',
  },
  {
    slug: 'horse-barn-planning-florida',
    title: 'Horse Barn Planning Guide for Florida Properties',
    excerpt:
      'Everything horse owners need to know when planning a Florida barn — stall sizing, ventilation, aisle layouts, Florida-specific considerations, and cost expectations.',
    date: '2024-11-28',
    readTime: '7 min read',
    category: 'Use Case Guide',
    image: '/IMG_6671.jpg',
  },
]

const categoryColors: Record<string, string> = {
  'Cost Guide': 'bg-yellow-100 text-yellow-800',
  'Permits & Regulations': 'bg-blue-100 text-blue-800',
  'Buying Guide': 'bg-red-100 text-red-800',
  'Construction & Materials': 'bg-purple-100 text-purple-800',
  'Use Case Guide': 'bg-orange-100 text-orange-800',
}

export default function BlogPage() {
  return (
    <>
      <div className="bg-brand-900 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="text-sm text-brand-400 mb-6">
            <Link href="/" className="hover:text-brand-200">Home</Link>
            <span className="mx-2">›</span>
            <span className="text-brand-200">Blog</span>
          </nav>
          <h1 className="text-4xl font-bold text-white sm:text-5xl">Florida Pole Barn Blog</h1>
          <p className="mt-4 text-xl text-brand-200 max-w-2xl">
            Guides, tips, and real answers for Florida property owners planning a pole barn.
          </p>
        </div>
      </div>

      <section className="section-padding bg-white">
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex flex-col rounded-xl border border-gray-200 bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="relative h-48 overflow-hidden bg-gray-200">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="flex flex-col flex-1 p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className={`text-xs font-semibold rounded-full px-2.5 py-0.5 ${categoryColors[post.category] || 'bg-gray-100 text-gray-600'}`}>
                      {post.category}
                    </span>
                    <span className="text-xs text-gray-400">{post.readTime}</span>
                  </div>
                  <h2 className="font-bold text-gray-900 leading-snug group-hover:text-brand-700 transition-colors">
                    {post.title}
                  </h2>
                  <p className="mt-2 text-sm text-gray-600 leading-relaxed flex-1">{post.excerpt}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <time className="text-xs text-gray-400">
                      {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </time>
                    <span className="text-sm font-semibold text-brand-600 group-hover:text-brand-700">
                      Read more →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  )
}

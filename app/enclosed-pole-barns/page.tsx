import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import SizeTable from '@/components/shared/SizeTable'
import FAQAccordion from '@/components/shared/FAQAccordion'
import CTABanner from '@/components/home/CTABanner'
import TrustBar from '@/components/ui/TrustBar'
import JsonLd from '@/components/JsonLd'
import { COMPANY, BARN_SIZES } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Enclosed Pole Barn Kits Florida | Prices & Sizes',
  description:
    'Enclosed pole barn kits with metal siding, doors, and full weather protection. Horse barns, workshops, storage. Sizes from 20×24 to 50×96. 140+ MPH rated. Free quote.',
  alternates: { canonical: 'https://floridapolebarn.com/enclosed-pole-barns' },
  openGraph: {
    title: 'Enclosed Pole Barn Kits Florida | Prices & Sizes',
    description: 'Enclosed pole barn kits with full metal siding and doors. Weather-tight protection for horses, livestock, workshops, and storage. 140+ MPH rated. Free quote.',
    url: 'https://floridapolebarn.com/enclosed-pole-barns',
    images: [{ url: '/89bfd6f3-82b6-43de-b5a1-137c4e192b55.jpg', width: 1200, height: 630, alt: 'Enclosed pole barn kit with metal siding in Florida' }],
  },
}

const features = [
  {
    title: 'Full Metal Siding',
    desc: 'Steel metal panels on all sides provide complete weather protection, keeping wind, rain, and Florida sun away from what\'s inside.',
  },
  {
    title: 'End Walls Included',
    desc: 'Both end walls are framed and sheeted. Standard with walk-in door rough openings, plus options for additional windows and vents.',
  },
  {
    title: 'Door Options',
    desc: 'Choose from sliding barn doors, roll-up doors, or walk-in personnel doors. We spec the right doors for your use during the quote process.',
  },
  {
    title: 'Same Core Structure',
    desc: 'Built on the same pressure-treated post and custom steel truss system as our open barns. The enclosure adds weather protection without sacrificing strength.',
  },
  {
    title: '20 Color Options',
    desc: 'Match your siding to your roof with 20 standard color options. Mix and match trim and panel colors for a custom look.',
  },
  {
    title: 'Complete Security',
    desc: 'Full enclosure means lockable structures for high-value equipment, livestock, stored vehicles, or a finished workshop.',
  },
]

const faqs = [
  {
    question: 'What does an enclosed pole barn kit include?',
    answer:
      'Enclosed kits include everything in an open kit (posts, trusses, roofing, hardware) plus: metal sidewall panels on all sides, framed end walls, standard door rough openings, and fascia. Doors can be added as options.',
  },
  {
    question: 'What types of doors can I add?',
    answer:
      'Common options include roll-up steel doors (single or double), sliding barn-style doors, and standard walk-in personnel doors. We can spec multiple door openings for drive-through layouts.',
  },
  {
    question: 'Can enclosed pole barns be used as horse barns?',
    answer:
      'Absolutely. Enclosed pole barns are our most popular choice for horse barns. We can design custom stall layouts, hay loft options, ventilation, and aisle configurations. Tell us your horse count and we\'ll spec it out.',
  },
  {
    question: 'Can I add insulation or interior finishing?',
    answer:
      'Yes. The interior of an enclosed pole barn can be finished with insulation, interior wall panels, electrical rough-in, and more. We build the structure; you can finish the interior to suit your needs.',
  },
  {
    question: 'Do enclosed barns require a permit in Florida?',
    answer:
      'Most Florida counties require a permit for enclosed structures. Our buildings are engineered to Florida code, which makes permitting straightforward. We can discuss your county\'s requirements during the quote process.',
  },
]

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://floridapolebarn.com' },
    { '@type': 'ListItem', position: 2, name: 'Enclosed Pole Barn Kits', item: 'https://floridapolebarn.com/enclosed-pole-barns' },
  ],
}

const offerCatalogSchema = {
  '@context': 'https://schema.org',
  '@type': 'OfferCatalog',
  name: 'Enclosed Pole Barn Kit Pricing',
  provider: { '@id': 'https://floridapolebarn.com/#business' },
  numberOfItems: BARN_SIZES.length,
  itemListElement: BARN_SIZES.map((size) => ({
    '@type': 'Offer',
    name: `${size.width}×${size.length} Enclosed Pole Barn Kit`,
    description: `${size.sqft} sq ft enclosed pole barn kit — ${size.primaryUse}`,
    price: (size.startingPrice ?? 0).toString(),
    priceCurrency: 'USD',
    priceValidUntil: '2027-12-31',
    availability: 'https://schema.org/InStock',
    url: 'https://floridapolebarn.com/enclosed-pole-barns',
    seller: { '@id': 'https://floridapolebarn.com/#business' },
  })),
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: { '@type': 'Answer', text: item.answer },
  })),
}

export default function EnclosedPoleBarnsPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={offerCatalogSchema} />
      <JsonLd data={faqSchema} />
      {/* Hero */}
      <div className="relative bg-brand-900 py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <Image
            src="/Clepper2.png"
            alt="Enclosed pole barn kit with metal siding and doors in Florida"
            fill
            priority
            className="object-cover"
            style={{ objectPosition: 'center 62%' }}
            sizes="100vw"
          />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="text-sm text-brand-400 mb-6">
            <Link href="/" className="hover:text-brand-200">Home</Link>
            <span className="mx-2">›</span>
            <span className="text-brand-200">Enclosed Pole Barn Kits</span>
          </nav>
          <h1 className="text-4xl font-bold text-white sm:text-5xl">Enclosed Pole Barn Kits</h1>
          <p className="mt-4 text-xl text-brand-200 max-w-2xl">
            Full weather protection with steel siding, end walls, and doors. The right choice for horses, workshops, or secure storage.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <Link href="/quote" className="btn-primary">Get Free Quote →</Link>
            <a href={COMPANY.phoneHref} className="btn-white">Call {COMPANY.phone}</a>
          </div>
        </div>
      </div>

      <TrustBar />

      {/* What is it */}
      <section className="section-padding bg-white">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 items-center">
            <div>
              <p className="text-sm font-semibold text-brand-600 uppercase tracking-wider mb-2">Full Protection</p>
              <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                Weather-Tight. Lockable. Versatile.
              </h2>
              <p className="mt-4 text-gray-600 leading-relaxed">
                Enclosed pole barns add steel siding on all four sides to the open structure, creating a fully weather-tight building. Florida&apos;s rain, humidity, and storm winds stay outside where they belong.
              </p>
              <p className="mt-3 text-gray-600 leading-relaxed">
                Whether you need a horse barn with stalls, a secure workshop, or a fully enclosed equipment building, our enclosed kits are designed to be customized for your exact use.
              </p>
              <ul className="mt-6 grid grid-cols-2 gap-2">
                {['Horse barns', 'Equipment storage', 'Workshop / garage', 'Man cave / rec room', 'Commercial storage', 'Agricultural buildings', 'Livestock housing', 'Vehicle storage'].map((use) => (
                  <li key={use} className="flex items-center gap-2 text-sm text-gray-700">
                    <svg className="h-4 w-4 text-brand-600 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                    </svg>
                    {use}
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative h-80 rounded-2xl overflow-hidden bg-gray-200">
              <Image
                src="/89bfd6f3-82b6-43de-b5a1-137c4e192b55.jpg"
                alt="Enclosed pole barn kit in Florida"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section-padding bg-gray-50">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Kit Features & What&apos;s Included</h2>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <div key={f.title} className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="font-bold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sizes */}
      <section className="section-padding bg-white">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900">Common Sizes</h2>
            <p className="mt-3 text-gray-600 max-w-xl mx-auto text-sm">
              Custom sizes available. Request a free quote for exact pricing on your project.
            </p>
          </div>
          <SizeTable />
          <div className="mt-6 text-center">
            <Link href="/quote" className="btn-primary">Get Enclosed Barn Pricing →</Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-gray-50">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900">Enclosed Pole Barn FAQ</h2>
          </div>
          <FAQAccordion items={faqs} />
        </div>
      </section>

      <CTABanner />
    </>
  )
}

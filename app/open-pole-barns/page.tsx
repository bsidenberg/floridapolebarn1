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
  title: 'Open Pole Barn Kits Florida | Prices & Sizes — Florida Pole Barn',
  description:
    'Open pole barn kits built for Florida weather. Pressure-treated posts, custom steel trusses, metal roofing. Sizes from 20×24 to 50×96. 140+ MPH rated. Free quote.',
  alternates: { canonical: 'https://floridapolebarn.com/open-pole-barns' },
  openGraph: {
    title: 'Open Pole Barn Kits Florida | Prices & Sizes',
    description: 'Open pole barn kits built for Florida weather. Sizes from 20×24 to 50×96. Pressure-treated posts, custom steel trusses, 140+ MPH rated. Starting from $2,326. Free quote.',
    url: 'https://floridapolebarn.com/open-pole-barns',
    images: [{ url: '/Open.jpg', width: 1200, height: 630, alt: 'Open pole barn kit in Florida with metal roof' }],
  },
}

const features = [
  {
    title: 'Pressure-Treated Posts',
    desc: 'Available in 6×6, 8×8, and 10×10 sizes, all pressure-treated for ground contact and Florida\'s humid climate. Built to last for decades.',
  },
  {
    title: 'Custom Steel Trusses',
    desc: 'Hot-formed angle iron trusses fabricated specifically for your span. Engineered to Florida building codes and rated for 140+ MPH wind loads.',
  },
  {
    title: 'Metal Roofing',
    desc: 'Galvalume or 20 color options in durable metal panels. Lifetime-rated performance against Florida sun, rain, and wind.',
  },
  {
    title: 'Open Side Design',
    desc: 'Open sides provide maximum airflow — critical in Florida\'s heat — while still offering full protection from rain and sun.',
  },
  {
    title: 'Fast Construction',
    desc: 'Open pole barns go up faster than enclosed. Most kits can be installed in 3–5 days, depending on size.',
  },
  {
    title: 'Made in the USA',
    desc: 'All materials are proudly sourced and fabricated in the United States. No imported hardware or overseas trusses.',
  },
]

const faqs = [
  {
    question: 'What does an open pole barn kit include?',
    answer:
      'Our open kits include pressure-treated posts, custom-fabricated steel trusses, metal roofing panels (Galvalume or colored), purlins, fascia boards, and all hardware. Everything needed to complete the roof and post structure.',
  },
  {
    question: 'Can I add sides later to make it enclosed?',
    answer:
      'Yes. Open pole barns are designed to accept metal siding if you decide to enclose it later. Just mention this when requesting your quote and we can design for future enclosure.',
  },
  {
    question: 'What post size do I need?',
    answer:
      'Post size depends on the width of your barn. 6×6 posts work well for widths up to 30 ft. 8×8 posts are recommended for 40–50 ft spans. 10×10 for the largest structures. We\'ll specify the right size in your quote.',
  },
  {
    question: 'What roof colors are available?',
    answer:
      'We offer 20 standard colors plus Galvalume (the bright metallic finish). Popular choices in Florida include Charcoal, Galvalume, Barn Red, and Forest Green.',
  },
  {
    question: 'How long does delivery take?',
    answer:
      'Most kits are ready for delivery within 4–6 weeks from order. Installation typically takes 3–5 days for an open barn, depending on size.',
  },
]

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://floridapolebarn.com' },
    { '@type': 'ListItem', position: 2, name: 'Open Pole Barn Kits', item: 'https://floridapolebarn.com/open-pole-barns' },
  ],
}

const offerCatalogSchema = {
  '@context': 'https://schema.org',
  '@type': 'OfferCatalog',
  name: 'Open Pole Barn Kit Pricing',
  provider: { '@id': 'https://floridapolebarn.com/#business' },
  numberOfItems: BARN_SIZES.length,
  itemListElement: BARN_SIZES.map((size) => ({
    '@type': 'Offer',
    name: `${size.width}×${size.length} Open Pole Barn Kit`,
    description: `${size.sqft} sq ft open pole barn kit — ${size.primaryUse}`,
    price: (size.startingPrice ?? 0).toString(),
    priceCurrency: 'USD',
    priceValidUntil: '2027-12-31',
    availability: 'https://schema.org/InStock',
    url: 'https://floridapolebarn.com/open-pole-barns',
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

export default function OpenPoleBarnsPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={offerCatalogSchema} />
      <JsonLd data={faqSchema} />
      {/* Hero */}
      <div className="relative bg-brand-900 py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <Image
            src="/Open.jpg"
            alt=""
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="text-sm text-brand-400 mb-6">
            <Link href="/" className="hover:text-brand-200">Home</Link>
            <span className="mx-2">›</span>
            <span className="text-brand-200">Open Pole Barn Kits</span>
          </nav>
          <h1 className="text-4xl font-bold text-white sm:text-5xl">Open Pole Barn Kits</h1>
          <p className="mt-4 text-xl text-brand-200 max-w-2xl">
            Cost-effective, ventilated, and built for Florida. Open pole barns deliver maximum coverage with minimal cost.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <Link href="/quote" className="btn-primary">Get Free Quote →</Link>
            <a href={COMPANY.phoneHref} className="btn-white">Call {COMPANY.phone}</a>
          </div>
        </div>
      </div>

      <TrustBar />

      {/* What is an open pole barn */}
      <section className="section-padding bg-white">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 items-center">
            <div>
              <p className="text-sm font-semibold text-brand-600 uppercase tracking-wider mb-2">What is it?</p>
              <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                Full Roof Coverage. Open Sides.
              </h2>
              <p className="mt-4 text-gray-600 leading-relaxed">
                An open pole barn is a structure with a full roof supported by posts — no side walls. This design is ideal for Florida where ventilation is essential, and where you need covered storage without the full enclosure cost.
              </p>
              <p className="mt-3 text-gray-600 leading-relaxed">
                Open barns are perfect for equipment that doesn&apos;t need to be locked up, livestock that needs shelter from rain and sun, covered workspace, or RV and boat storage where you need drive-through access.
              </p>
              <ul className="mt-6 space-y-2">
                {['Equipment storage', 'RV & boat shelter', 'Livestock shade', 'Covered workspace', 'Hay storage', 'Tractor parking'].map((use) => (
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
                src="/IMG_8998.jpg"
                alt="Open pole barn kit in Florida"
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
            <p className="text-sm font-semibold text-brand-600 uppercase tracking-wider mb-2">What You Get</p>
            <h2 className="text-3xl font-bold text-gray-900">Kit Features & Materials</h2>
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

      {/* Sizes & Pricing */}
      <section className="section-padding bg-white">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-10">
            <p className="text-sm font-semibold text-brand-600 uppercase tracking-wider mb-2">Sizes & Pricing</p>
            <h2 className="text-3xl font-bold text-gray-900">Common Sizes</h2>
            <p className="mt-3 text-gray-600 max-w-xl mx-auto text-sm">
              Custom sizes available. Request a free quote for exact pricing on your project.
            </p>
          </div>
          <SizeTable />
          <div className="mt-6 text-center">
            <Link href="/quote" className="btn-primary">
              Get a Quote for Your Size →
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-gray-50">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900">Open Pole Barn FAQ</h2>
          </div>
          <FAQAccordion items={faqs} />
        </div>
      </section>

      <CTABanner />
    </>
  )
}

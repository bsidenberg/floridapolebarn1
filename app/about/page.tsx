import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import CTABanner from '@/components/home/CTABanner'
import TrustBar from '@/components/ui/TrustBar'
import { COMPANY } from '@/lib/constants'

export const metadata: Metadata = {
  title: { absolute: 'About Florida Pole Barn | Central Florida Pole Barn Builder' },
  description:
    'Florida Pole Barn is a local Central Florida builder specializing in custom pole barn kits and installation serving all of Florida. Horse barns, equipment storage, workshops, and more.',
  alternates: { canonical: 'https://floridapolebarn.com/about' },
  openGraph: {
    title: 'About Florida Pole Barn | Local Central Florida Builder',
    description: 'Florida Pole Barn is a local Central Florida pole barn builder. Custom kits and full installation across all of Florida. 140+ MPH rated, Made in USA.',
    url: 'https://floridapolebarn.com/about',
    images: [{ url: '/Open.jpg', width: 1200, height: 630, alt: 'Florida Pole Barn — Clermont, FL' }],
  },
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://floridapolebarn.com' },
    { '@type': 'ListItem', position: 2, name: 'About', item: 'https://floridapolebarn.com/about' },
  ],
}

const values = [
  {
    title: 'Engineered for Florida',
    desc: 'We don\'t sell generic barn kits. Every structure is custom-fabricated with steel trusses and posts sized for your specific building, engineered to Florida code, and rated for the wind loads Florida demands.',
  },
  {
    title: 'Made in the USA',
    desc: 'Our trusses, roofing panels, and hardware are proudly manufactured in the United States. We believe in American-made quality and stand behind every material we use.',
  },
  {
    title: 'Honest Business',
    desc: 'No hidden costs. No bait-and-switch pricing. We give you a clear, complete quote and deliver exactly what we promise. Customers come back because they trust us.',
  },
  {
    title: 'Local to Florida',
    desc: 'We\'re based in Clermont, Central Florida — not a national chain or out-of-state company. We know Florida properties, Florida weather, and Florida permitting.',
  },
]

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {/* Hero */}
      <div className="bg-brand-900 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="text-sm text-brand-400 mb-6">
            <Link href="/" className="hover:text-brand-200">Home</Link>
            <span className="mx-2">›</span>
            <span className="text-brand-200">About</span>
          </nav>
          <h1 className="text-4xl font-bold text-white sm:text-5xl">About Florida Pole Barn</h1>
          <p className="mt-4 text-xl text-brand-200 max-w-2xl">
            Local Florida builders. Custom pole barns. Built right.
          </p>
        </div>
      </div>

      <TrustBar />

      {/* About content */}
      <section className="section-padding bg-white">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <div>
              <p className="text-sm font-semibold text-brand-600 uppercase tracking-wider mb-2">Who We Are</p>
              <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                Florida&apos;s Local Pole Barn Builder
              </h2>
              <div className="mt-6 space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Florida Pole Barn is a local construction company based in Clermont, Florida. We specialize in designing, fabricating, and building custom pole barn kits for property owners across the entire state of Florida.
                </p>
                <p>
                  We started Florida Pole Barn because we saw a real need in Central Florida: property owners who wanted quality pole barns built specifically for Florida conditions — not generic kits shipped from out of state with no understanding of Florida weather or building codes.
                </p>
                <p>
                  Every building we sell is custom-fabricated. Our steel trusses are made from hot-formed angle iron, built to your specific span, and engineered for 140+ MPH wind loads. Our posts are pressure-treated for Florida&apos;s humidity and soil conditions. Our roofing is selected for decades of performance in the Florida sun.
                </p>
                <p>
                  We&apos;re based in Clermont — right in the heart of Central Florida — and we travel statewide to complete projects and deliver kits all across Florida.
                </p>
              </div>

              <div className="mt-8 space-y-2">
                <a href={COMPANY.phoneHref} className="flex items-center gap-2 text-brand-700 font-semibold hover:underline">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                  {COMPANY.phone}
                </a>
                <a href={`mailto:${COMPANY.email}`} className="flex items-center gap-2 text-brand-700 font-semibold hover:underline">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                  {COMPANY.email}
                </a>
                <p className="flex items-center gap-2 text-gray-600 text-sm">
                  <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                  {COMPANY.address.full}
                </p>
              </div>
            </div>

            {/* Values */}
            <div className="space-y-6">
              <p className="text-sm font-semibold text-brand-600 uppercase tracking-wider">How We Work</p>
              {values.map((v) => (
                <div key={v.title} className="flex gap-4">
                  <div className="shrink-0 mt-1 h-5 w-5 flex items-center justify-center rounded-full bg-brand-700">
                    <svg className="h-3 w-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 flex items-center gap-1.5">
                      {v.title === 'Made in the USA' && (
                        <Image src="/us.png" alt="USA" width={18} height={18} className="shrink-0" />
                      )}
                      {v.title}
                    </h3>
                    <p className="mt-1 text-sm text-gray-600 leading-relaxed">{v.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Reviews & Map */}
      <section className="section-padding bg-white border-t border-gray-100">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 items-start">
            {/* Leave a review */}
            <div>
              <p className="text-sm font-semibold text-brand-600 uppercase tracking-wider mb-2">Customer Reviews</p>
              <h2 className="text-2xl font-bold text-gray-900">Happy With Your Barn?</h2>
              <p className="mt-3 text-gray-600 text-sm leading-relaxed">
                We&apos;d love to hear about your experience. Google Reviews help other Florida property owners find a builder they can trust.
              </p>
              <a
                href="https://search.google.com/local/writereview?placeid=ChIJt8LpYVOVV4gR1T1hgRoCcD4"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-2 btn-primary"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm-1 14.5v-5H7.5l4.5-6 4.5 6H13v5h-2z" />
                </svg>
                Leave Us a Google Review
              </a>
              <p className="mt-3 text-xs text-gray-400">Opens Google Reviews in a new tab.</p>
            </div>

            {/* Google Maps embed */}
            <div className="rounded-xl overflow-hidden border border-gray-200 shadow-sm h-64">
              <iframe
                title="Florida Pole Barn location — Clermont, FL"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3506.1!2d-81.7729!3d28.5494!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zFlorida+Pole+Barn!5e0!3m2!1sen!2sus!4v1"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Service area callout */}
      <section className="section-padding bg-gray-50">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-2xl font-bold text-gray-900">We Serve All of Florida</h2>
          <p className="mt-4 text-gray-600 leading-relaxed">
            Based in Clermont, Central Florida, we travel statewide for every project. From Pensacola in the Panhandle to Miami in South Florida — from Jacksonville on the East Coast to Fort Myers on the Gulf — if you&apos;re in Florida, we build there.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/service-area" className="btn-secondary">View Service Area</Link>
            <Link href="/quote" className="btn-primary">Get a Free Quote</Link>
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  )
}

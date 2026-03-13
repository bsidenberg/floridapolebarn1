import type { Metadata } from 'next'
import Link from 'next/link'
import CTABanner from '@/components/home/CTABanner'
import { COMPANY } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Pole Barn Service Area — All of Florida | Florida Pole Barn',
  description:
    'Florida Pole Barn serves the entire state of Florida. Based in Clermont, Central Florida. We build horse barns, equipment storage, workshops, and agricultural buildings statewide.',
  alternates: { canonical: 'https://floridapolebarn.com/service-area' },
  openGraph: {
    title: 'Pole Barn Service Area — All of Florida | Florida Pole Barn',
    description:
      'Florida Pole Barn serves all of Florida from our Clermont, FL base. We build horse barns, equipment storage, workshops, and agricultural buildings statewide. Free quote.',
    url: 'https://floridapolebarn.com/service-area',
    images: [
      {
        url: '/Open.jpg',
        width: 1200,
        height: 630,
        alt: 'Florida Pole Barn service area — all of Florida',
      },
    ],
  },
}

const serviceAreaSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Pole Barn Construction',
  provider: {
    '@type': 'GeneralContractor',
    '@id': 'https://floridapolebarn.com/#business',
    name: COMPANY.fullName,
    telephone: COMPANY.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: COMPANY.address.street,
      addressLocality: COMPANY.address.city,
      addressRegion: COMPANY.address.state,
      postalCode: COMPANY.address.zip,
    },
  },
  areaServed: {
    '@type': 'State',
    name: 'Florida',
    geo: {
      '@type': 'GeoShape',
      name: 'Florida',
    },
  },
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://floridapolebarn.com' },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Service Area',
      item: 'https://floridapolebarn.com/service-area',
    },
  ],
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Does Florida Pole Barn build pole barns in Central Florida?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Central Florida is our home base. We are located in Clermont and serve every city and county in Central Florida including Orlando, Lakeland, Ocala, Kissimmee, The Villages, and dozens more. No travel fee for most Central Florida locations.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does Florida Pole Barn serve North Florida and the Panhandle?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. We regularly build pole barns in North Florida and the Panhandle including Jacksonville, Gainesville, Tallahassee, Pensacola, Panama City, and surrounding areas. We travel statewide for every project.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does Florida Pole Barn build pole barns on the Gulf Coast?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. We serve the entire Gulf Coast from Tampa Bay to Naples. Our team builds in Tampa, Sarasota, Fort Myers, Cape Coral, and all points in between.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you build pole barns on the Atlantic Coast of Florida?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. We serve the full Atlantic Coast from New Smyrna Beach south to Hollywood, including the Space Coast, Treasure Coast, and Palm Beach areas.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does Florida Pole Barn serve South Florida?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. We travel to South Florida for every project, serving Miami-Dade, agricultural communities like Immokalee, LaBelle, and Clewiston, and all South Florida counties.',
      },
    },
  ],
}

const regions = [
  {
    id: 'central',
    name: 'Central Florida',
    heading: 'Central Florida Pole Barn Construction',
    highlight: true,
    badge: 'Home Base',
    intro:
      'Florida Pole Barn is based in Clermont and proudly serves all of Central Florida — our home region. We build pole barns for property owners across Lake, Orange, Polk, Osceola, Seminole, Sumter, Marion, Citrus, Hernando, and Volusia Counties.',
    cities: [
      'Clermont', 'Orlando', 'Kissimmee', 'Sanford', 'Leesburg', 'Eustis', 'Tavares',
      'Mount Dora', 'Ocala', 'The Villages', 'Lakeland', 'Winter Haven', 'Bartow',
      'Daytona Beach', 'DeLand', 'Deltona', 'Palm Coast', 'Apopka', 'Ocoee',
      'Winter Garden', 'Minneola', 'Groveland', 'Mascotte', 'Wildwood', 'Lady Lake',
      'Inverness', 'Crystal River', 'Homosassa', 'Brooksville',
    ],
  },
  {
    id: 'north',
    name: 'North Florida',
    heading: 'North Florida & Panhandle Pole Barn Construction',
    highlight: false,
    badge: null,
    intro:
      'Florida Pole Barn proudly serves North Florida and the Panhandle including Jacksonville, Gainesville, Tallahassee, Pensacola, and communities across Duval, Alachua, Leon, Escambia, and surrounding counties.',
    cities: [
      'Jacksonville', 'St. Augustine', 'Gainesville', 'Tallahassee', 'Palatka',
      'Lake City', 'Live Oak', 'Starke', 'Macclenny', 'Green Cove Springs',
      'Fernandina Beach', 'Middleburg', 'Orange Park', 'Fleming Island', 'Yulee',
      'Callahan', 'Jasper', 'Madison', 'Perry', 'Marianna', 'Panama City',
      'Crestview', 'Pensacola', 'Milton', 'DeFuniak Springs',
    ],
  },
  {
    id: 'west',
    name: 'West Florida (Gulf Coast)',
    heading: 'Gulf Coast Pole Barn Construction',
    highlight: false,
    badge: null,
    intro:
      'Florida Pole Barn proudly serves the Gulf Coast from Tampa Bay to Naples, including Sarasota, Fort Myers, Cape Coral, and all communities across Hillsborough, Pasco, Sarasota, Lee, and Collier Counties.',
    cities: [
      'Tampa', 'St. Petersburg', 'Clearwater', 'Brandon', 'Riverview', 'Wesley Chapel',
      "Land O' Lakes", 'Zephyrhills', 'Dade City', 'Plant City', 'Ruskin',
      'Sun City Center', 'Bradenton', 'Sarasota', 'Venice', 'Port Charlotte',
      'Punta Gorda', 'Fort Myers', 'Cape Coral', 'Naples', 'Bonita Springs',
      'Lehigh Acres', 'North Port', 'Arcadia', 'Wauchula', 'Sebring',
      'Avon Park', 'Lake Placid', 'Okeechobee',
    ],
  },
  {
    id: 'east',
    name: 'East Florida (Atlantic Coast)',
    heading: 'Atlantic Coast Pole Barn Construction',
    highlight: false,
    badge: null,
    intro:
      'Florida Pole Barn proudly serves the Atlantic Coast from New Smyrna Beach south to Hollywood, including the Space Coast, Treasure Coast, and Palm Beach communities.',
    cities: [
      'Melbourne', 'Titusville', 'Cocoa', 'Palm Bay', 'Vero Beach', 'Sebastian',
      'Fort Pierce', 'Port St. Lucie', 'Stuart', 'Jupiter', 'West Palm Beach',
      'Boca Raton', 'Delray Beach', 'Boynton Beach', 'Fort Lauderdale',
      'Pompano Beach', 'Hollywood', 'New Smyrna Beach', 'Edgewater', 'Ormond Beach',
    ],
  },
  {
    id: 'south',
    name: 'South Florida',
    heading: 'South Florida Pole Barn Construction',
    highlight: false,
    badge: null,
    intro:
      'Florida Pole Barn proudly serves South Florida including Miami-Dade County, agricultural communities like Immokalee, LaBelle, and Clewiston, and the Upper Keys.',
    cities: [
      'Miami', 'Homestead', 'Florida City', 'Key Largo', 'Hialeah', 'Doral',
      'Kendall', 'Cutler Bay', 'Palmetto Bay', 'LaBelle', 'Clewiston',
      'Belle Glade', 'Immokalee',
    ],
  },
]

const faqs = [
  {
    q: 'Does Florida Pole Barn build pole barns in Central Florida?',
    a: 'Yes. Central Florida is our home base. We are located in Clermont and serve every city and county in Central Florida including Orlando, Lakeland, Ocala, Kissimmee, The Villages, and dozens more.',
  },
  {
    q: 'Does Florida Pole Barn serve North Florida and the Panhandle?',
    a: 'Yes. We regularly build pole barns in North Florida and the Panhandle including Jacksonville, Gainesville, Tallahassee, Pensacola, Panama City, and surrounding areas. We travel statewide for every project.',
  },
  {
    q: 'Does Florida Pole Barn build pole barns on the Gulf Coast?',
    a: 'Yes. We serve the entire Gulf Coast from Tampa Bay to Naples. Our team builds in Tampa, Sarasota, Fort Myers, Cape Coral, and all points in between.',
  },
  {
    q: 'Do you build pole barns on the Atlantic Coast of Florida?',
    a: 'Yes. We serve the full Atlantic Coast from New Smyrna Beach south to Hollywood, including the Space Coast, Treasure Coast, and Palm Beach areas.',
  },
  {
    q: 'Does Florida Pole Barn serve South Florida?',
    a: 'Yes. We travel to South Florida for every project, serving Miami-Dade, agricultural communities like Immokalee, LaBelle, and Clewiston, and all South Florida counties.',
  },
]

export default function ServiceAreaPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceAreaSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero */}
      <div className="bg-brand-900 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <nav className="text-sm text-brand-400 mb-6 text-left">
            <Link href="/" className="hover:text-brand-200">Home</Link>
            <span className="mx-2">›</span>
            <span className="text-brand-200">Service Area</span>
          </nav>
          <h1 className="text-4xl font-bold text-white sm:text-5xl">We Serve All of Florida</h1>
          <p className="mt-4 text-xl text-brand-200 max-w-2xl mx-auto">
            Based in Clermont, Central Florida. We travel statewide for every project — no area is too far.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/quote" className="btn-primary">Get a Free Quote →</Link>
            <a href={COMPANY.phoneHref} className="btn-white">Call {COMPANY.phone}</a>
          </div>
        </div>
      </div>

      {/* Region sections */}
      <section className="section-padding bg-white">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 text-center">
            <p className="text-sm font-semibold text-brand-600 uppercase tracking-wider mb-2">Coverage</p>
            <h2 className="text-3xl font-bold text-gray-900">Pole Barn Construction Across Florida</h2>
            <p className="mt-3 text-gray-600 max-w-xl mx-auto">
              From the Panhandle to the Keys — if you have property in Florida, we build there.
            </p>
          </div>

          <div className="space-y-10">
            {regions.map((region) => (
              <div
                key={region.id}
                id={region.id}
                className={`rounded-xl border p-6 sm:p-8 ${
                  region.highlight
                    ? 'border-brand-400 bg-brand-50'
                    : 'border-gray-200 bg-white'
                }`}
              >
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <h2
                    className={`text-xl font-bold sm:text-2xl ${
                      region.highlight ? 'text-brand-800' : 'text-gray-900'
                    }`}
                  >
                    {region.heading}
                  </h2>
                  {region.badge && (
                    <span className="text-xs bg-brand-700 text-white rounded-full px-2.5 py-0.5 font-medium">
                      {region.badge}
                    </span>
                  )}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-5">{region.intro}</p>
                <div className="flex flex-wrap gap-2">
                  {region.cities.map((city) => (
                    <span
                      key={city}
                      className={`text-xs rounded-full px-3 py-1.5 font-medium border ${
                        region.highlight
                          ? 'bg-white border-brand-200 text-brand-800'
                          : 'bg-gray-50 border-gray-200 text-gray-700'
                      }`}
                    >
                      Pole Barn in {city}, FL
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Don't see your city */}
          <div className="mt-10 rounded-xl bg-gray-50 border border-gray-200 p-8 text-center">
            <h3 className="text-xl font-bold text-gray-900">Don&apos;t see your city?</h3>
            <p className="mt-2 text-gray-600">
              If you&apos;re in Florida, we serve you. The list above covers our most common service locations,
              but we build anywhere in the state. Call us or request a quote and we&apos;ll come to you.
            </p>
            <div className="mt-5 flex flex-col sm:flex-row gap-3 justify-center">
              <a href={COMPANY.phoneHref} className="btn-secondary">{COMPANY.phone}</a>
              <Link href="/quote" className="btn-primary">Request Free Quote →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ section */}
      <section className="section-padding bg-gray-50 border-t border-gray-200">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Common Questions About Our Service Area</h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="font-bold text-gray-900 mb-2">{faq.q}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Counties served */}
      <section className="section-padding-sm bg-white border-t border-gray-200">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Florida Counties We Serve</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            <strong>Central Florida:</strong> Lake, Orange, Osceola, Seminole, Polk, Sumter, Citrus, Hernando, Marion, Volusia, Flagler &nbsp;|&nbsp;
            <strong>North Florida:</strong> Alachua, Duval, Clay, Putnam, St. Johns, Leon, Columbia, Suwannee, Baker, Nassau, Jefferson, Taylor, Escambia, Bay, Okaloosa, Walton, Holmes &nbsp;|&nbsp;
            <strong>Gulf Coast:</strong> Hillsborough, Pasco, Pinellas, Manatee, Sarasota, Charlotte, Lee, Collier, DeSoto, Hardee, Highlands, Glades &nbsp;|&nbsp;
            <strong>Atlantic Coast:</strong> Brevard, Indian River, St. Lucie, Martin, Palm Beach, Broward, Volusia &nbsp;|&nbsp;
            <strong>South Florida:</strong> Miami-Dade, Monroe, Hendry, LaBelle, Okeechobee
          </p>
        </div>
      </section>

      {/* Quick links */}
      <section className="section-padding-sm bg-brand-50 border-t border-brand-100">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap gap-4 justify-center text-sm">
            <Link href="/" className="text-brand-700 hover:underline font-medium">← Back to Home</Link>
            <Link href="/quote" className="text-brand-700 hover:underline font-medium">Get a Free Quote</Link>
            <Link href="/about" className="text-brand-700 hover:underline font-medium">About Us</Link>
            <Link href="/faq" className="text-brand-700 hover:underline font-medium">FAQ</Link>
            <a href={COMPANY.phoneHref} className="text-brand-700 hover:underline font-medium">
              Call {COMPANY.phone}
            </a>
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  )
}

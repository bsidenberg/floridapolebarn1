import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { GoogleTagManager } from '@next/third-parties/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import GTMPageView from '@/components/GTMPageView'
import { COMPANY } from '@/lib/constants'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://floridapolebarn.com'),
  title: {
    default: 'Pole Barn Kits & Building | Florida Pole Barn — Central FL',
    template: '%s | Florida Pole Barn',
  },
  description:
    'Florida Pole Barn builds custom pole barn kits for horse barns, equipment storage, RV storage, workshops, and agricultural use across all of Florida. Get a free quote today.',
  keywords: [
    'pole barn Florida',
    'pole barn kits Central Florida',
    'pole barn builder Florida',
    'pole barn contractor Florida',
    'pole barn construction Florida',
    'pole barn near me Florida',
    'metal barn Florida',
    'horse barn Florida',
    'equipment storage building Florida',
    'pole barn Clermont FL',
    'pole barn Orlando FL',
    'pole barn Ocala FL',
    'pole barn Tampa FL',
    'agricultural buildings Florida',
    'RV storage building Florida',
    'workshop building Florida',
    '140 mph rated pole barn',
    'Florida code compliant pole barn',
    'custom pole barn kit',
    'pole barn installation Florida',
  ],
  authors: [{ name: 'Florida Pole Barn' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://floridapolebarn.com',
    siteName: 'Florida Pole Barn',
    title: 'Florida Pole Barn — Custom Pole Barn Kits & Building',
    description:
      'Custom pole barn kits and installation serving all of Florida. 140+ MPH rated, Made in USA, Florida code compliant. Get a free quote.',
    images: [
      {
        url: '/Open.jpg',
        width: 1200,
        height: 630,
        alt: 'Custom pole barn built by Florida Pole Barn — Clermont, FL',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Florida Pole Barn — Custom Pole Barn Kits & Building',
    description:
      'Custom pole barn kits and installation serving all of Florida. 140+ MPH rated, Made in USA, Florida code compliant.',
    images: ['/Open.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  other: {
    'geo.region': 'US-FL',
    'geo.placename': 'Clermont, Florida',
    'geo.position': '28.5494;-81.7729',
    'ICBM': '28.5494, -81.7729',
  },
}

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': ['GeneralContractor', 'LocalBusiness'],
  '@id': 'https://floridapolebarn.com/#business',
  name: COMPANY.fullName,
  alternateName: 'Florida Pole Barn',
  description:
    'Florida Pole Barn builds custom pole barn kits and provides full installation across Florida. Specializing in horse barns, equipment storage, workshops, RV storage, and agricultural buildings. 140+ MPH wind rated, Florida code compliant, Made in the USA.',
  url: 'https://floridapolebarn.com',
  telephone: COMPANY.phone,
  email: COMPANY.email,
  logo: {
    '@type': 'ImageObject',
    url: 'https://floridapolebarn.com/1.1.png',
  },
  image: [
    'https://floridapolebarn.com/Open.jpg',
    'https://floridapolebarn.com/Shop-Front.jpg',
    'https://floridapolebarn.com/IMG_6667.jpg',
    'https://floridapolebarn.com/89bfd6f3-82b6-43de-b5a1-137c4e192b55.jpg',
  ],
  address: {
    '@type': 'PostalAddress',
    streetAddress: COMPANY.address.street,
    addressLocality: COMPANY.address.city,
    addressRegion: COMPANY.address.state,
    postalCode: COMPANY.address.zip,
    addressCountry: 'US',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 28.5494,
    longitude: -81.7729,
  },
  hasMap: 'https://maps.google.com/?q=Florida+Pole+Barn+Clermont+FL',
  areaServed: [
    { '@type': 'State', name: 'Florida' },
    { '@type': 'City', name: 'Orlando', containedIn: 'Orange County, FL' },
    { '@type': 'City', name: 'Tampa', containedIn: 'Hillsborough County, FL' },
    { '@type': 'City', name: 'Ocala', containedIn: 'Marion County, FL' },
    { '@type': 'City', name: 'Clermont', containedIn: 'Lake County, FL' },
    { '@type': 'City', name: 'Gainesville', containedIn: 'Alachua County, FL' },
    { '@type': 'City', name: 'Lakeland', containedIn: 'Polk County, FL' },
    { '@type': 'City', name: 'Kissimmee', containedIn: 'Osceola County, FL' },
    { '@type': 'City', name: 'Jacksonville', containedIn: 'Duval County, FL' },
  ],
  priceRange: '$$',
  currenciesAccepted: 'USD',
  paymentAccepted: 'Cash, Check, Credit Card',
  knowsAbout: [
    'Pole Barn Construction',
    'Horse Barn Construction',
    'Metal Building Construction',
    'Agricultural Buildings Florida',
    'Equipment Storage Buildings',
    'Florida Building Codes',
    'Hurricane-Rated Construction',
    'Pressure-Treated Post Construction',
    'Custom Steel Truss Fabrication',
  ],
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '08:00',
      closes: '17:00',
    },
  ],
  sameAs: [
    COMPANY.social.facebook,
    COMPANY.social.instagram,
    COMPANY.social.tiktok,
  ],
}

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': 'https://floridapolebarn.com/#website',
  url: 'https://floridapolebarn.com',
  name: 'Florida Pole Barn',
  description: 'Custom pole barn kits and installation across all of Florida.',
  publisher: { '@id': 'https://floridapolebarn.com/#business' },
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://floridapolebarn.com/search?q={search_term_string}',
    },
    'query-input': 'required name=search_term_string',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <GoogleTagManager gtmId="GTM-5P5MC48H" />
      <head>
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-5P5MC48H"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <GTMPageView />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}

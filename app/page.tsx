import type { Metadata } from 'next'
import TrustBar from '@/components/ui/TrustBar'
import Hero from '@/components/home/Hero'
import UseCaseGrid from '@/components/home/UseCaseGrid'
import ProductSection from '@/components/home/ProductSection'
import SizesOverview from '@/components/home/SizesOverview'
import GalleryPreview from '@/components/home/GalleryPreview'
import CustomerReviews from '@/components/home/CustomerReviews'
import WhyChooseUs from '@/components/home/WhyChooseUs'
import TrustSignals from '@/components/home/TrustSignals'
import CTABanner from '@/components/home/CTABanner'

export const metadata: Metadata = {
  title: { absolute: 'Pole Barn Kits & Building Florida | Florida Pole Barn — Central FL' },
  description:
    'Custom pole barn kits and installation across all of Florida. Horse barns, equipment storage, RV shelters, workshops. 140+ MPH rated, Made in USA. Free quote from Clermont, FL.',
  alternates: {
    canonical: 'https://floridapolebarn.com',
  },
  openGraph: {
    title: 'Florida Pole Barn — Custom Pole Barn Kits & Building Across Florida',
    description: 'Custom pole barn kits and installation across all of Florida. Horse barns, equipment storage, RV shelters, workshops. 140+ MPH rated, Made in USA. Free quote.',
    url: 'https://floridapolebarn.com',
    images: [{ url: '/Open.jpg', width: 1200, height: 630, alt: 'Custom open pole barn built by Florida Pole Barn in Central Florida' }],
  },
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <UseCaseGrid />
      <ProductSection />
      <SizesOverview />
      <GalleryPreview />
      <CustomerReviews />
      <WhyChooseUs />
      <TrustSignals />
      <CTABanner />
    </>
  )
}

import type { Metadata } from 'next'
import UseCasePage from '@/components/shared/UseCasePage'

export const metadata: Metadata = {
  title: 'Horse Barns Florida | Custom Pole Barn Horse Shelters',
  description:
    'Custom horse barns in Florida. Ventilated, durable pole barn horse shelters with stall options. Built for Florida\'s heat and humidity. Get a free quote today.',
  alternates: { canonical: 'https://floridapolebarn.com/horse-barns' },
  openGraph: {
    title: 'Horse Barns Florida | Custom Pole Barn Horse Shelters',
    description: 'Custom horse barns built for Florida\'s heat and humidity. Stall layouts, tack rooms, 140+ MPH rated. Serving all of Florida from Clermont. Free quote.',
    url: 'https://floridapolebarn.com/horse-barns',
    images: [{ url: '/IMG_6667.jpg', width: 1200, height: 630, alt: 'Custom horse barn pole barn in Florida' }],
  },
}

export default function HorseBarnsPage() {
  return (
    <UseCasePage
      canonical="https://floridapolebarn.com/horse-barns"
      hero={{
        eyebrow: 'Florida Horse Owners',
        title: 'Horse Barns in Florida',
        subtitle:
          'Ventilated, durable pole barn horse shelters designed for Florida\'s heat, humidity, and storm season. Custom stall layouts available.',
        image: '/IMG_6667.jpg',
        imageAlt: 'Custom horse barn pole barn in Central Florida',
      }}
      intro={{
        heading: 'Horse Barns Built for the Florida Climate',
        paragraphs: [
          'Horses in Florida need shelter that handles extreme heat, afternoon storms, and year-round humidity — not a barn designed for the Pacific Northwest. Our horse barns are engineered specifically for Florida conditions.',
          'Open-sided designs maximize airflow to keep horses cool. Enclosed versions protect from rain and storms while still providing ventilation options. Both are built with 140+ MPH wind-rated trusses so your horses stay safe in severe weather.',
        ],
        bullets: [
          'Custom stall layouts',
          'Aisle-way designs',
          'Tack room options',
          'Hay loft configurations',
          'Open or enclosed options',
          'Maximum ventilation',
          '140+ MPH wind rated',
          'Florida code compliant',
        ],
        image: '/IMG_6668.jpg',
        imageAlt: 'Custom horse barn in Florida',
      }}
      features={[
        {
          title: 'Designed for Florida Heat',
          desc: 'Open-sided configurations and elevated roof profiles promote natural ventilation — critical for horses in Florida\'s summer temperatures.',
        },
        {
          title: 'Custom Stall Configurations',
          desc: 'We design your stall layout based on your number of horses, aisle width preferences, and any tack or feed room needs.',
        },
        {
          title: '140+ MPH Wind Rating',
          desc: 'Florida hurricane season is real. Our custom steel trusses are engineered to withstand 140+ MPH winds so your animals are protected.',
        },
        {
          title: 'Pressure-Treated Posts',
          desc: 'Ground-contact pressure-treated posts resist Florida\'s moisture and termites. Built to last decades without rot or structural failure.',
        },
        {
          title: 'Multiple Sizes Available',
          desc: 'From a simple 2-stall shelter to a 10+ stall barn, we build to your exact needs. Common horse barn sizes: 30×36, 40×48, 40×60.',
        },
        {
          title: 'Open & Enclosed Options',
          desc: 'Open barns work well in dry areas; enclosed barns add security and weather protection. We can discuss what\'s right for your property.',
        },
      ]}
      faqs={[
        {
          question: 'What size pole barn do I need for horses?',
          answer:
            'For 2–4 horses, a 30×36 enclosed barn works well. For 4–8 horses, a 40×60 is a popular choice. We design custom stall layouts for your horse count and aisle preferences during the quote process.',
        },
        {
          question: 'Do horse barns need permits in Florida?',
          answer:
            'Most Florida counties require permits for enclosed horse barns. Agricultural exemptions may apply depending on your county and acreage. Our buildings are engineered to code to make permitting straightforward.',
        },
        {
          question: 'Can you build a barn with a wash rack and tack room?',
          answer:
            'Yes. We can incorporate wash rack areas, tack rooms, feed rooms, and storage bays into the design. Tell us what you need in the quote form and we\'ll include it in your design.',
        },
        {
          question: 'Open or enclosed horse barn — which is better for Florida?',
          answer:
            'Both work well in Florida. Open barns maximize airflow in hot months. Enclosed barns provide storm protection and security. Many customers choose enclosed barns with large opening options on the sides for ventilation flexibility.',
        },
        {
          question: 'How long does it take to build a horse barn?',
          answer:
            'Kit delivery is typically 4–6 weeks from order. Installation takes 3–7 days depending on size and complexity. We provide a specific timeline during your free quote.',
        },
      ]}
      relatedLinks={[
        { label: 'Enclosed Pole Barns', href: '/enclosed-pole-barns' },
        { label: 'Agricultural Buildings', href: '/agricultural-buildings' },
        { label: 'Equipment Storage', href: '/equipment-storage' },
        { label: 'Gallery', href: '/gallery' },
        { label: 'Get a Quote', href: '/quote' },
      ]}
    />
  )
}

import type { Metadata } from 'next'
import UseCasePage from '@/components/shared/UseCasePage'

export const metadata: Metadata = {
  title: 'Agricultural Buildings Florida | Farm Barn Construction',
  description:
    'Custom agricultural buildings across Florida. Pole barn farm structures for hay storage, livestock, crop storage, and farm operations. Free quote from Central FL.',
  alternates: { canonical: 'https://floridapolebarn.com/agricultural-buildings' },
  openGraph: {
    title: 'Agricultural Buildings Florida | Farm Barn Construction',
    description: 'Custom agricultural pole barns in Florida. Farm structures for hay storage, livestock, crop storage, and farm operations. 140+ MPH rated. Free quote.',
    url: 'https://floridapolebarn.com/agricultural-buildings',
    images: [{ url: '/IMG_8998.jpg', width: 1200, height: 630, alt: 'Agricultural pole barn farm building in Florida' }],
  },
}

export default function AgriculturalBuildingsPage() {
  return (
    <UseCasePage
      canonical="https://floridapolebarn.com/agricultural-buildings"
      hero={{
        eyebrow: 'Florida Farmers & Ranchers',
        title: 'Agricultural Buildings in Florida',
        subtitle:
          'Durable farm structures for hay storage, livestock housing, crop storage, and agricultural operations. Built for Florida farms.',
        image: '/IMG_8998.jpg',
        imageAlt: 'Agricultural pole barn farm building in Florida',
        imagePosition: 'center 45%',
      }}
      intro={{
        heading: 'Farm Buildings Built for Florida Agriculture',
        paragraphs: [
          'Florida farmers need structures that handle heat, humidity, heavy rains, and storm season — while remaining practical and cost-effective for agricultural operations. Pole barns are the #1 choice for Florida farm buildings because they deliver exactly that.',
          'From small hay storage barns to large multi-use agricultural buildings, we design and build structures sized for your land, your livestock, and your operation.',
        ],
        bullets: [
          'Hay storage and feed storage',
          'Livestock housing',
          'Crop storage buildings',
          'Multi-use farm structures',
          'Open and enclosed options',
          'Large span clear-floor designs',
          'Agricultural permit compatible',
          'Serving all of Florida',
        ],
        image: '/IMG_8999.jpg',
        imageAlt: 'Agricultural pole barn building in Florida',
      }}
      features={[
        {
          title: 'Built for Florida\'s Climate',
          desc: 'Engineered specifically for Florida conditions — high humidity, intense UV, heavy rainfall, and hurricane-force winds. These buildings perform in the field.',
        },
        {
          title: 'Large Open Spans',
          desc: 'Free-spanning steel trusses eliminate interior posts, giving you unobstructed space for tractors, hay bales, grain, and livestock.',
        },
        {
          title: 'Agricultural Exemptions',
          desc: 'Many Florida counties provide agricultural building permit exemptions. Our team can discuss your county\'s rules during the quote process.',
        },
        {
          title: 'Any Size You Need',
          desc: 'From a 20×40 hay shed to a 50×96 multi-purpose barn, we build to scale. Our largest buildings provide 4,800+ sq ft of usable space.',
        },
        {
          title: 'Pressure-Treated Posts',
          desc: 'All posts are pressure-treated for ground contact — essential in Florida\'s soil and moisture conditions for decades of structural integrity.',
        },
        {
          title: 'Fast Delivery and Build',
          desc: 'Kit delivery in 4–6 weeks. Most agricultural structures are installed in 4–7 days. Get your barn up before the next growing season.',
        },
      ]}
      faqs={[
        {
          question: 'Are there agricultural building permit exemptions in Florida?',
          answer:
            'Yes. Florida law provides agricultural building exemptions in many counties for structures used in bona fide farm operations. Specific requirements vary by county. We recommend confirming with your local county building department.',
        },
        {
          question: 'What is the best pole barn size for hay storage?',
          answer:
            'This depends on how many bales you store. A single 20×40 open barn can hold several hundred round bales. For larger operations, a 40×60 or 50×96 provides significant hay capacity while also leaving room for equipment.',
        },
        {
          question: 'Can pole barns be used for livestock in Florida?',
          answer:
            'Absolutely. Both open and enclosed pole barns work for livestock. Open designs provide shade and ventilation for cattle and horses. Enclosed buildings with proper ventilation work well for confined livestock housing.',
        },
        {
          question: 'How long do pole barns last in Florida?',
          answer:
            'A properly built pole barn should last 30–50+ years in Florida. The key factors are pressure-treated posts designed for ground contact, quality metal roofing, and proper wind engineering. All of which we include.',
        },
        {
          question: 'Do you serve rural Florida counties?',
          answer:
            'Yes. We serve all of Florida including rural agricultural counties like Marion, Alachua, Hardee, Highlands, Okeechobee, DeSoto, and others. Based in Clermont, we travel statewide for builds.',
        },
      ]}
      relatedLinks={[
        { label: 'Open Pole Barns', href: '/open-pole-barns' },
        { label: 'Horse Barns', href: '/horse-barns' },
        { label: 'Equipment Storage', href: '/equipment-storage' },
        { label: 'Service Area', href: '/service-area' },
        { label: 'Get a Quote', href: '/quote' },
      ]}
    />
  )
}

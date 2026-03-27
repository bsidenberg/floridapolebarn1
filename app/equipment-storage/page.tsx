import type { Metadata } from 'next'
import UseCasePage from '@/components/shared/UseCasePage'

export const metadata: Metadata = {
  title: 'Equipment Storage Buildings Florida | Farm & Tractor Barns',
  description:
    'Custom equipment storage buildings across Florida. Protect tractors, ATVs, farm equipment, and tools from Florida weather. Open and enclosed options. Free quote.',
  alternates: { canonical: 'https://floridapolebarn.com/equipment-storage' },
  openGraph: {
    title: 'Equipment Storage Buildings Florida | Farm & Tractor Barns',
    description: 'Custom equipment storage pole barns in Florida. Protect tractors, ATVs, and farm equipment. Open and enclosed options. 140+ MPH rated. Free quote.',
    url: 'https://floridapolebarn.com/equipment-storage',
    images: [{ url: '/IMG_6913.jpg', width: 1200, height: 630, alt: 'Equipment storage pole barn in Florida' }],
  },
}

export default function EquipmentStoragePage() {
  return (
    <UseCasePage
      canonical="https://floridapolebarn.com/equipment-storage"
      hero={{
        eyebrow: 'Farmers & Property Owners',
        title: 'Equipment Storage Buildings in Florida',
        subtitle:
          'Stop leaving your tractors, ATVs, and farm equipment exposed to Florida sun and storms. A pole barn pays for itself by protecting your investment.',
        image: '/IMG_6911.jpg',
      }}
      intro={{
        heading: 'Protect Your Equipment from Florida\'s Weather',
        paragraphs: [
          'Farm equipment is expensive. A tractor left out in Florida\'s sun and humidity corrodes faster, degrades faster, and loses more value every season. A pole barn is the most cost-effective way to extend the life of your equipment.',
          'Our open and enclosed equipment storage buildings are designed for easy drive-in/drive-out access. Wide spans, tall wall heights, and no interior posts mean you can maneuver large equipment without obstacles.',
        ],
        bullets: [
          'Wide-span open layouts',
          'No interior post obstructions',
          'Tall 12 ft and 14 ft walls',
          'Tractor, ATV, mower storage',
          'Easy drive-in access',
          'Open or enclosed options',
          'Hay and feed storage',
          'Custom any size',
        ],
        image: '/IMG_6912.jpg',
        imageAlt: 'Equipment storage pole barn in Florida',
      }}
      features={[
        {
          title: 'Wide-Span, No Interior Posts',
          desc: 'Our custom steel trusses span up to 60 feet without interior posts — you can maneuver full-size tractors and combines without obstacles.',
        },
        {
          title: 'Tall Wall Heights',
          desc: '12 ft and 14 ft wall heights provide clearance for tall equipment, bucket attachments, and sprayer booms. Specify what you need.',
        },
        {
          title: 'Gravel or Concrete Ready',
          desc: 'We build the structure on your site. You choose the flooring — packed gravel for most equipment, concrete for workshop areas.',
        },
        {
          title: 'Open for Airflow',
          desc: 'Open pole barns are preferred for equipment storage in Florida — great ventilation prevents fuel condensation and rubber degradation from heat.',
        },
        {
          title: 'Add Sections Later',
          desc: 'Start with the size you need now. Our buildings are designed to be extended — add bays as your operation grows.',
        },
        {
          title: 'Made in USA',
          desc: 'All trusses, roofing, and hardware are manufactured in the United States. Quality you can count on for your farm or property.',
        },
      ]}
      faqs={[
        {
          question: 'What size building do I need for my equipment?',
          answer:
            'For a standard tractor and implements, a 30×48 or 40×60 works well. For combines, large sprayers, or multiple tractors, a 50×96 provides the space you need. We size to your equipment during the quote.',
        },
        {
          question: 'Can I store hay in a pole barn?',
          answer:
            'Yes. Open pole barns are ideal for hay storage — the airflow prevents mold while the roof protects from rain. Many customers combine equipment storage and hay storage in one building.',
        },
        {
          question: 'Do I need permits for equipment storage on my farm in Florida?',
          answer:
            'Florida has agricultural exemptions for farm structures in many counties. Requirements vary. We discuss your situation during the free quote and our buildings are code-compliant either way.',
        },
        {
          question: 'Can I get a building with multiple large door openings?',
          answer:
            'Absolutely. Enclosed equipment buildings can have multiple large roll-up doors or wide open-ended bays for equipment that needs frequent access.',
        },
        {
          question: 'How quickly can I get a building?',
          answer:
            'Kit delivery is typically 4–6 weeks from order. Installation takes 3–7 days depending on size. Most equipment storage barns are operational within 6–8 weeks from your order.',
        },
      ]}
      relatedLinks={[
        { label: 'Open Pole Barns', href: '/open-pole-barns' },
        { label: 'Agricultural Buildings', href: '/agricultural-buildings' },
        { label: 'Horse Barns', href: '/horse-barns' },
        { label: 'Gallery', href: '/gallery' },
        { label: 'Get a Quote', href: '/quote' },
      ]}
    />
  )
}

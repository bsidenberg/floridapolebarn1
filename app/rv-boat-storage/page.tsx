import type { Metadata } from 'next'
import UseCasePage from '@/components/shared/UseCasePage'

export const metadata: Metadata = {
  title: 'RV & Boat Storage Buildings Florida | Covered Pole Barn Shelter — Florida Pole Barn',
  description:
    'Custom RV and boat storage buildings across Florida. Open pole barn shelters with tall clearance and drive-through access. Protect your investment from Florida sun and storms.',
  alternates: { canonical: 'https://floridapolebarn.com/rv-boat-storage' },
  openGraph: {
    title: 'RV & Boat Storage Buildings Florida | Covered Pole Barn Shelter',
    description: 'Custom RV and boat storage pole barns in Florida. Drive-through access, tall clearance, open design. Protect your investment from Florida sun and storms. Free quote.',
    url: 'https://floridapolebarn.com/rv-boat-storage',
    images: [{ url: '/IMG_8588.jpg', width: 1200, height: 630, alt: 'RV and boat storage pole barn in Florida' }],
  },
}

export default function RVBoatStoragePage() {
  return (
    <UseCasePage
      canonical="https://floridapolebarn.com/rv-boat-storage"
      hero={{
        eyebrow: 'Florida RV & Boat Owners',
        title: 'RV & Boat Storage Buildings in Florida',
        subtitle:
          'Protect your RV, boat, or recreational vehicle from Florida\'s relentless sun, UV damage, and storm season — with a custom-built pole barn shelter.',
        image: '/IMG_8588.jpg',
      }}
      intro={{
        heading: 'Your RV and Boat Deserve More Than an Open Lot',
        paragraphs: [
          'Florida\'s UV index is among the highest in the country. Leaving your RV or boat uncovered accelerates oxidation, fades gel coat and paint, and damages rubber seals — costing thousands in repairs. A covered pole barn pays for itself quickly.',
          'Our open pole barn shelters are ideal for RV and boat storage. Drive-through or pull-in layouts keep access simple, while the open sides provide natural ventilation to prevent mildew and moisture buildup.',
        ],
        bullets: [
          'Drive-through layouts available',
          'Tall wall heights (12 ft and 14 ft)',
          'Wide spans for large RVs',
          'Open sides — easy ventilation',
          'No moisture buildup',
          'Protects from UV damage',
          'Secure with optional sides',
          'Multiple bays for more vehicles',
        ],
        image: '/IMG_8589.jpg',
        imageAlt: 'Open pole barn RV storage in Florida',
      }}
      features={[
        {
          title: '14-Foot Wall Heights',
          desc: 'Tall wall heights accommodate Class A motorhomes, fifth wheels, and other tall vehicles with clearance to spare.',
        },
        {
          title: 'Wide Span Designs',
          desc: 'Our 40×60 and 50×96 open barns are popular for RV storage with multiple bays side by side. Wide spans need no interior posts.',
        },
        {
          title: 'Drive-Through Access',
          desc: 'We design layouts so you can pull straight through — no need to back in. Pull in one end, drive out the other.',
        },
        {
          title: 'UV Protection',
          desc: 'Even in an open barn, your vehicle is protected from direct UV rays — the primary cause of paint fade, rubber degradation, and oxidation.',
        },
        {
          title: 'Option to Enclose',
          desc: 'Start open, add sides later. Or choose a fully enclosed building with roll-up doors for maximum security of high-value RVs and boats.',
        },
        {
          title: '140+ MPH Wind Rated',
          desc: 'Florida storm season is serious. Our trusses are engineered to 140+ MPH wind loads so your structure — and what\'s inside — survives.',
        },
      ]}
      faqs={[
        {
          question: 'What size building do I need for my RV?',
          answer:
            'For a single Class A or Class C motorhome, a 20×40 or 24×40 open barn provides good coverage. For multiple vehicles or a fifth wheel with slide-outs, a 30×60 or 40×60 works well. We size to your vehicle dimensions during the quote.',
        },
        {
          question: 'Do I need a permit for an RV storage barn in Florida?',
          answer:
            'Permit requirements vary by county and whether the structure is open or enclosed. Open structures may qualify for agricultural exemption in some counties. We discuss this during your free quote.',
        },
        {
          question: 'Can I build a barn with separate bays for multiple vehicles?',
          answer:
            'Yes. Wide-span designs (40×60, 50×96) allow you to park multiple RVs, boats, and trailers side by side without interior posts blocking access.',
        },
        {
          question: 'Should I choose open or enclosed for RV storage?',
          answer:
            'Open barns protect from UV and rain while keeping great ventilation — important for preventing mildew. Enclosed barns add security and storm protection. High-value or sensitive equipment often benefits from enclosed.',
        },
        {
          question: 'Can I add a concrete floor?',
          answer:
            'Yes. We build the structure; a concrete contractor can pour the slab. We can design the post layout to accommodate a slab pour, or you can pour after the structure is up.',
        },
      ]}
      relatedLinks={[
        { label: 'Open Pole Barns', href: '/open-pole-barns' },
        { label: 'Equipment Storage', href: '/equipment-storage' },
        { label: 'Workshop & Garage', href: '/workshop-garage' },
        { label: 'Gallery', href: '/gallery' },
        { label: 'Get a Quote', href: '/quote' },
      ]}
    />
  )
}

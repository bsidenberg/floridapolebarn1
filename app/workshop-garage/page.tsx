import type { Metadata } from 'next'
import UseCasePage from '@/components/shared/UseCasePage'

export const metadata: Metadata = {
  title: 'Pole Barn Workshop & Garage Florida | Man Cave Buildings — Florida Pole Barn',
  description:
    'Custom pole barn workshops, garages, and man caves across Florida. Enclosed metal buildings with power, insulation options, and custom layouts. Free quote.',
  alternates: { canonical: 'https://floridapolebarn.com/workshop-garage' },
  openGraph: {
    title: 'Pole Barn Workshop & Garage Florida | Man Cave Buildings',
    description: 'Custom pole barn workshops, garages, and man caves in Florida. Enclosed metal buildings, custom layouts, insulation options. 140+ MPH rated. Free quote.',
    url: 'https://floridapolebarn.com/workshop-garage',
    images: [{ url: '/Jeffs.jpeg', width: 1200, height: 630, alt: 'Custom pole barn workshop and garage in Florida' }],
  },
}

export default function WorkshopGaragePage() {
  return (
    <UseCasePage
      canonical="https://floridapolebarn.com/workshop-garage"
      hero={{
        eyebrow: 'Florida Homeowners & Hobbyists',
        title: 'Pole Barn Workshop & Garage Florida',
        subtitle:
          'Build the ultimate garage, workshop, or man cave on your property. Enclosed pole barns offer affordable, spacious, fully customizable buildings.',
        image: '/Jeffs.jpeg',
      }}
      intro={{
        heading: 'Your Property. Your Workshop. Your Rules.',
        paragraphs: [
          'A pole barn garage or workshop gives you the space you\'ve always wanted at a fraction of the cost of traditional construction. Open floor plans, tall ceilings, and complete customization — built on your property.',
          'Whether you\'re building a woodworking shop, car garage, welding bay, home gym, or just the ultimate hangout space, our enclosed pole barns deliver the square footage and flexibility to make it happen.',
        ],
        bullets: [
          'Open floor plan — no interior posts',
          'Insulation options available',
          'Electrical rough-in ready',
          '12 ft and 14 ft wall heights',
          'Multiple door options',
          'Window options available',
          'Concrete slab compatible',
          'Fully customizable layout',
        ],
        image: '/Lundy.jpg',
        imageAlt: 'Pole barn workshop and garage in Florida',
      }}
      features={[
        {
          title: 'Open Floor Plan',
          desc: 'No interior posts means full flexibility. Run your work benches, lifts, storage racks, and equipment exactly where you want them.',
        },
        {
          title: 'Tall Ceiling Heights',
          desc: '12 ft and 14 ft wall heights give you room for car lifts, tall equipment, loft storage, and a comfortable working environment.',
        },
        {
          title: 'Insulation Ready',
          desc: 'Add insulation to the roof and walls for a comfortable year-round workspace in Florida\'s climate. We can design for insulation during the quote.',
        },
        {
          title: 'Multiple Door Options',
          desc: 'Roll-up garage doors, sliding doors, or full end openings. We design the door layout to work for your vehicles and equipment.',
        },
        {
          title: 'Man Cave Potential',
          desc: 'Add windows, a mini-split, and finished interior walls and you have a full-time recreational retreat. Countless customers have built their dream man cave.',
        },
        {
          title: 'Florida Code Compliant',
          desc: 'Our buildings meet Florida building code standards. Permitted structures with a proper foundation add real value to your property.',
        },
      ]}
      faqs={[
        {
          question: 'Can I build a pole barn garage on a residential lot in Florida?',
          answer:
            'This depends on your county and HOA if applicable. Many rural and semi-rural properties in Florida permit detached garages and workshop buildings. We recommend checking with your county before ordering.',
        },
        {
          question: 'Can I run electricity in a pole barn workshop?',
          answer:
            'Yes. The structure is compatible with electrical rough-in. You\'ll work with a licensed electrician for the electrical panel and wiring. The open framing of a pole barn makes electrical installation straightforward.',
        },
        {
          question: 'What is a good size for a workshop?',
          answer:
            'A 30×36 provides a solid 1,080 sq ft for a small workshop. For car enthusiasts or serious workshops with multiple bays, 40×60 or 40×48 are popular. We size to your needs and vehicle count.',
        },
        {
          question: 'Can I convert a workshop pole barn into a man cave?',
          answer:
            'Absolutely — it\'s one of our most popular projects. Enclosed pole barns convert beautifully with insulation, finished walls, mini-split HVAC, plumbing for a bathroom, and whatever interior finishes you choose.',
        },
        {
          question: 'Do I need a permit for a workshop in Florida?',
          answer:
            'Enclosed structures typically require a permit in Florida. Our buildings are engineered to Florida code, making permitting straightforward. We discuss your county\'s requirements during the quote process.',
        },
      ]}
      relatedLinks={[
        { label: 'Enclosed Pole Barns', href: '/enclosed-pole-barns' },
        { label: 'RV & Boat Storage', href: '/rv-boat-storage' },
        { label: 'Equipment Storage', href: '/equipment-storage' },
        { label: 'Gallery', href: '/gallery' },
        { label: 'Get a Quote', href: '/quote' },
      ]}
    />
  )
}

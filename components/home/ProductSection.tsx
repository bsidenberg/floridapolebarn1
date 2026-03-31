import Link from 'next/link'
import Image from 'next/image'
import SectionHeader from '@/components/ui/SectionHeader'

const openBarnFeatures = [
  'Open sides for maximum airflow',
  'Full metal roof (Galvalume or color)',
  'Pressure-treated posts',
  'Custom steel trusses',
  '140+ MPH wind rated',
]

const products = [
  {
    title: 'Open Pole Barn Kits',
    href: '/open-pole-barns',
    image: '/Open.jpg',
    description:
      'Open-sided structures with a full roof — maximum ventilation, natural light, and fast construction. Ideal for equipment storage, RV shelters, and covered workspace.',
    features: openBarnFeatures,
    badge: 'Most Popular',
    badgeColor: 'bg-accent-500',
    imageClassName: 'object-cover group-hover:scale-105 transition-transform duration-500',
  },
  {
    title: 'Enclosed Pole Barn Kits',
    href: '/enclosed-pole-barns',
    image: '/Clepper.png',
    imageClassName: 'object-cover object-center group-hover:scale-105 transition-transform duration-500',
    description:
      'Fully enclosed with metal sidewalls, end walls, and doors — weather-tight protection for horses, livestock, high-value equipment, workshops, and storage.',
    features: [
      'Full metal siding and end walls',
      'Roll-up or walk-in door options',
      'Window options available',
      'Complete weather protection',
      '140+ MPH wind rated',
      'Custom sizing available',
    ],
    badge: 'Best Protection',
    badgeColor: 'bg-brand-600',
  },
]


export default function ProductSection() {
  return (
    <section className="section-padding bg-white">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Our Products"
          heading="Open or Enclosed — We Build Both"
          subheading="Choose the right structure for your needs. Both types use the same quality materials and Florida-engineered construction."
        />

        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {products.map((product) => (
            <div
              key={product.title}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-lg transition-shadow"
            >
              {/* Badge */}
              <div className={`absolute top-4 left-4 z-10 rounded-full px-3 py-1 text-xs font-bold text-white ${product.badgeColor}`}>
                {product.badge}
              </div>

              {/* Image */}
              <div className="relative h-56 bg-gray-200 overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className={'imageClassName' in product && product.imageClassName ? product.imageClassName : 'object-cover group-hover:scale-105 transition-transform duration-500'}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>

              {/* Content */}
              <div className="flex flex-col flex-1 p-6">
                <h3 className="text-xl font-bold text-gray-900">{product.title}</h3>
                <p className="mt-2 text-gray-600 leading-relaxed text-sm">{product.description}</p>

                <ul className="mt-4 space-y-1.5">
                  {product.features.map((feat) => (
                    <li key={feat} className="flex items-center gap-2 text-sm text-gray-700">
                      <svg className="h-4 w-4 text-brand-600 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                      </svg>
                      {feat}
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex gap-3">
                  <Link
                    href={product.href}
                    className="flex-1 btn-secondary text-sm text-center"
                  >
                    View Details
                  </Link>
                  <Link
                    href="/quote"
                    className="flex-1 btn-primary text-sm text-center"
                  >
                    Get Pricing
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Custom note */}
        <div className="mt-8 rounded-xl bg-brand-50 border border-brand-200 p-6 text-center">
          <p className="text-brand-800 font-medium">
            Need a custom size? We build to any dimensions.{' '}
            <Link href="/quote" className="font-bold text-brand-700 underline hover:no-underline">
              Request a custom quote →
            </Link>
          </p>
        </div>
      </div>
    </section>
  )
}

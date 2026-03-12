import Link from 'next/link'
import Image from 'next/image'
import SectionHeader from '@/components/ui/SectionHeader'
import { USE_CASES } from '@/lib/constants'

function UseCaseIcon({ icon, size }: { icon: string; size: number }) {
  if (icon.startsWith('/')) {
    return <Image src={icon} alt="" width={size} height={size} className="object-contain" style={{ width: size, height: size, marginBottom: -Math.round(size * 0.1) }} />
  }
  return <span style={{ fontSize: size, lineHeight: 1 }} className="mb-3 block">{icon}</span>
}

export default function UseCaseGrid() {
  return (
    <section className="section-padding bg-gray-50">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="What Will You Build?"
          heading="A Pole Barn for Every Purpose"
          subheading="From horse barns to man caves — Florida Pole Barn builds custom structures for any use on any property."
        />

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {USE_CASES.map((uc) => (
            <Link
              key={uc.id}
              href={uc.href}
              className="group flex flex-col items-center justify-center rounded-xl border border-gray-200 bg-white px-0.5 py-1 text-center shadow-sm transition-all hover:border-brand-400 hover:shadow-md hover:-translate-y-0.5 overflow-hidden"
            >
              <div className="flex items-center justify-center h-[90px]">
                <UseCaseIcon icon={uc.icon} size={uc.icon.includes('Workshop') || uc.icon.includes('Man Cave') ? 90 : uc.icon.startsWith('/') ? 75 : 40} />
              </div>
              <span className="text-sm font-semibold text-gray-800 group-hover:text-brand-700 leading-tight -mt-2">
                {uc.shortLabel}
              </span>
            </Link>
          ))}
        </div>

        {/* Expanded use-case cards for desktop */}
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {USE_CASES.slice(0, 3).map((uc) => (
            <Link
              key={`${uc.id}-card`}
              href={uc.href}
              className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:border-brand-400 hover:shadow-md"
            >
              <div className="flex items-start gap-4">
                <div className="shrink-0"><UseCaseIcon icon={uc.icon} size={uc.icon.startsWith('/') ? 60 : 32} /></div>
                <div>
                  <h3 className="font-bold text-gray-900 group-hover:text-brand-700 transition-colors">
                    {uc.label}
                  </h3>
                  <p className="mt-1 text-sm text-gray-600 leading-relaxed">{uc.description}</p>
                  <span className="mt-3 inline-flex items-center text-sm font-semibold text-brand-600 group-hover:gap-1 transition-all">
                    Learn more →
                  </span>
                </div>
              </div>
              <div className="absolute inset-x-0 bottom-0 h-0.5 bg-brand-600 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            </Link>
          ))}
          {USE_CASES.slice(3).map((uc) => (
            <Link
              key={`${uc.id}-card2`}
              href={uc.href}
              className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:border-brand-400 hover:shadow-md"
            >
              <div className="flex items-start gap-4">
                <div className="shrink-0"><UseCaseIcon icon={uc.icon} size={uc.icon.startsWith('/') ? 60 : 32} /></div>
                <div>
                  <h3 className="font-bold text-gray-900 group-hover:text-brand-700 transition-colors">
                    {uc.label}
                  </h3>
                  <p className="mt-1 text-sm text-gray-600 leading-relaxed">{uc.description}</p>
                  <span className="mt-3 inline-flex items-center text-sm font-semibold text-brand-600">
                    Learn more →
                  </span>
                </div>
              </div>
              <div className="absolute inset-x-0 bottom-0 h-0.5 bg-brand-600 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

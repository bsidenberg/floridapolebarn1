import Link from 'next/link'
import Image from 'next/image'
import { COMPANY } from '@/lib/constants'

export default function Hero() {
  return (
    <section className="relative min-h-[600px] flex items-center overflow-hidden bg-brand-950">
      {/* Background image */}
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src="/Open.jpg"
          alt=""
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
      </div>
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-brand-950/90 via-brand-950/70 to-brand-950/40" aria-hidden="true" />

      <div className="relative mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <div className="max-w-2xl">
          {/* Eyebrow */}
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-brand-700/30 px-4 py-1.5 text-sm font-medium text-brand-300 ring-1 ring-brand-600/40">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-brand-400" />
            Based in Central Florida · Serving All of FL
          </div>

          {/* Headline */}
          <h1 className="text-4xl font-bold text-white sm:text-5xl lg:text-6xl leading-tight">
            Florida&apos;s Trusted
            <span className="block text-accent-400">Pole Barn Builder</span>
          </h1>

          {/* Sub-headline */}
          <p className="mt-6 text-lg text-gray-300 leading-relaxed sm:text-xl">
            Custom pole barn kits and installation for horse barns, equipment storage, RV shelters, workshops, and agricultural buildings.
            <span className="flex items-center gap-1.5 mt-1 font-medium text-white">
              140+ MPH rated ·
              <Image src="/us.png" alt="USA" width={18} height={18} className="inline-block" />
              Made in USA · Florida code compliant.
            </span>
          </p>

          {/* CTA buttons */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/quote" className="btn-primary-lg text-center">
              Get Your Free Quote →
            </Link>
            <a href={COMPANY.phoneHref} className="btn-white-lg text-center">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
              </svg>
              {COMPANY.phone}
            </a>
          </div>

          {/* Micro trust signals */}
          <div className="mt-8 flex flex-wrap gap-4">
            {[
              '✓ Free quotes',
              '✓ No commitment',
              '✓ We call you within 1 business day',
            ].map((item) => (
              <span key={item} className="text-sm text-brand-300 font-medium">
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Stats bar at bottom */}
      <div className="absolute bottom-0 left-0 right-0 bg-brand-900/80 backdrop-blur-sm border-t border-brand-800/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <dl className="grid grid-cols-2 divide-x divide-brand-800 sm:grid-cols-4">
            {[
              { stat: '100+', label: 'Barns Built' },
              { stat: '140 MPH+', label: 'Wind Rated' },
              { stat: '40+', label: 'Color Options' },
              { stat: '100%', label: 'Florida-Engineered' },
            ].map((item) => (
              <div key={item.label} className="flex flex-col items-center py-4 px-2">
                <dt className="text-xl font-bold text-white sm:text-2xl">{item.stat}</dt>
                <dd className="text-xs text-brand-400 mt-0.5 text-center">{item.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}

import type { Metadata } from 'next'
import Image from 'next/image'
import QuoteForm from '@/components/forms/QuoteForm'
import { COMPANY } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Request a Free Pole Barn Quote — Florida Pole Barn',
  description:
    'Get a free, no-obligation quote for your pole barn in Florida. Horse barns, equipment storage, RV shelters, workshops, and more. We call you within 1 business day.',
  alternates: {
    canonical: 'https://floridapolebarn.com/quote',
  },
}

const trustPoints = [
  { icon: '📞', text: 'We call you within 1 business day' },
  { icon: '💰', text: 'Free, no-obligation quote' },
  { icon: '📏', text: 'Custom sizes and configurations' },
  { icon: '🏠', text: 'We service Florida and the Southeast USA' },
  { icon: '', img: '/us.png', text: 'Proudly made in the USA' },
  { icon: '🌀', text: '140+ MPH wind-rated structures' },
]

export default function QuotePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-5">

          {/* Left: form */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-8">
              <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                Get Your Free Pole Barn Quote
              </h1>
              <p className="mt-2 text-gray-600 text-sm">
                Takes about 2 minutes. No commitment. We&apos;ll call you within 1 business day.
              </p>
              <div className="mt-8">
                <QuoteForm />
              </div>
            </div>
          </div>

          {/* Right: trust sidebar */}
          <div className="lg:col-span-2 space-y-6">

            {/* Direct contact */}
            <div className="bg-brand-800 rounded-2xl p-6 text-white">
              <p className="font-semibold text-brand-200 text-sm uppercase tracking-wider mb-3">
                Prefer to Call?
              </p>
              <a
                href={COMPANY.phoneHref}
                className="flex items-center gap-3 text-2xl font-bold hover:text-brand-200 transition-colors"
              >
                <svg className="h-7 w-7 text-accent-400" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
                {COMPANY.phone}
              </a>
              <p className="mt-2 text-sm text-brand-300">{COMPANY.address.full}</p>
            </div>

            {/* Why us */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h2 className="font-bold text-gray-900 mb-4">What to Expect</h2>
              <ul className="space-y-3">
                {trustPoints.map((pt) => (
                  <li key={pt.text} className="flex items-center gap-3 text-sm text-gray-700">
                    <span className="flex shrink-0 w-6 h-6 items-center justify-center">
                      {'img' in pt && pt.img
                        ? <Image src={pt.img} alt="" width={24} height={24} />
                        : <span className="text-xl leading-none">{pt.icon}</span>
                      }
                    </span>
                    <span>{pt.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Mini testimonial */}
            <div className="bg-brand-50 rounded-2xl border border-brand-200 p-6">
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} className="h-4 w-4 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-sm text-gray-700 italic leading-relaxed">
                &ldquo;Best investment I&apos;ve made on my property. The team was professional, the quality is outstanding, and it&apos;s held up through two hurricane seasons.&rdquo;
              </p>
              <p className="mt-2 text-xs font-semibold text-brand-700">— James K., Leesburg, FL</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

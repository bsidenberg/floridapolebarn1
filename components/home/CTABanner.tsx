import Link from 'next/link'
import { COMPANY } from '@/lib/constants'

export default function CTABanner() {
  return (
    <section className="relative overflow-hidden bg-brand-800 py-16 sm:py-20">
      {/* Decorative pattern */}
      <div className="absolute inset-0 opacity-10" aria-hidden="true">
        <svg className="absolute left-0 top-0 h-full" viewBox="0 0 400 400" fill="none">
          <defs>
            <pattern id="grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M0 40L40 0M0 0l40 40" stroke="white" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="400" height="400" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-white sm:text-4xl">
          Ready to Build Your Pole Barn?
        </h2>
        <p className="mt-4 text-lg text-brand-200 leading-relaxed">
          Get a free, no-pressure quote from Florida&apos;s trusted pole barn builder.
          We&apos;ll call you within 1 business day to discuss your project.
        </p>

        <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link href="/quote" className="btn-primary-lg w-full sm:w-auto text-center">
            Request Your Free Quote →
          </Link>
          <a href={COMPANY.phoneHref} className="btn-white-lg w-full sm:w-auto text-center">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
            </svg>
            Call {COMPANY.phone}
          </a>
        </div>

        <div className="mt-6 flex flex-wrap justify-center gap-6 text-sm text-brand-300">
          <span>✓ Free, no-obligation quote</span>
          <span>✓ Local Florida builder</span>
          <span>✓ We come to you</span>
          <span>✓ Response within 1 business day</span>
        </div>
      </div>
    </section>
  )
}

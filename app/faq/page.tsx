import type { Metadata } from 'next'
import Link from 'next/link'
import FAQAccordion from '@/components/shared/FAQAccordion'
import CTABanner from '@/components/home/CTABanner'
import JsonLd from '@/components/JsonLd'
import { FAQS, COMPANY } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Pole Barn FAQ Florida | Common Questions Answered — Florida Pole Barn',
  description:
    'Answers to common questions about pole barns in Florida — cost, permits, sizes, materials, timeline, and more. From Florida Pole Barn, your local Central Florida builder.',
  alternates: { canonical: 'https://floridapolebarn.com/faq' },
  openGraph: {
    title: 'Pole Barn FAQ Florida | Common Questions Answered',
    description: 'How much does a pole barn cost in Florida? Do you need a permit? What sizes are available? Answers from a local Florida pole barn builder.',
    url: 'https://floridapolebarn.com/faq',
    images: [{ url: '/Open.jpg', width: 1200, height: 630, alt: 'Florida Pole Barn FAQ' }],
  },
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://floridapolebarn.com' },
    { '@type': 'ListItem', position: 2, name: 'FAQ', item: 'https://floridapolebarn.com/faq' },
  ],
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQS.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: { '@type': 'Answer', text: item.answer },
  })),
}

export default function FAQPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={faqSchema} />
      {/* Hero */}
      <div className="bg-brand-900 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="text-sm text-brand-400 mb-6">
            <Link href="/" className="hover:text-brand-200">Home</Link>
            <span className="mx-2">›</span>
            <span className="text-brand-200">FAQ</span>
          </nav>
          <h1 className="text-4xl font-bold text-white sm:text-5xl">Pole Barn FAQ</h1>
          <p className="mt-4 text-xl text-brand-200 max-w-2xl">
            Answers to the most common questions about pole barns in Florida.
          </p>
        </div>
      </div>

      {/* FAQs */}
      <section className="section-padding bg-white">
        <div className="mx-auto max-w-4xl">
          <FAQAccordion items={FAQS} />

          {/* Still have questions */}
          <div className="mt-10 rounded-xl bg-brand-50 border border-brand-200 p-8 text-center">
            <h2 className="text-xl font-bold text-brand-900">Still Have Questions?</h2>
            <p className="mt-2 text-brand-700 text-sm">
              Call us directly or submit your question through the quote form. We&apos;re happy to talk through your project.
            </p>
            <div className="mt-5 flex flex-col sm:flex-row gap-3 justify-center">
              <a href={COMPANY.phoneHref} className="btn-secondary">{COMPANY.phone}</a>
              <Link href="/quote" className="btn-primary">Ask Us In Your Quote Request →</Link>
            </div>
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  )
}

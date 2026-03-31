import Image from 'next/image'
import Link from 'next/link'
import CTABanner from '@/components/home/CTABanner'
import TrustBar from '@/components/ui/TrustBar'
import FAQAccordion from '@/components/shared/FAQAccordion'
import JsonLd from '@/components/JsonLd'
import { COMPANY } from '@/lib/constants'
import type { FAQItem } from '@/lib/types'

interface UseCasePageProps {
  canonical: string
  hero: {
    eyebrow: string
    title: string
    subtitle: string
    image: string
    imageAlt?: string
    imagePosition?: string
  }
  intro: {
    heading: string
    paragraphs: string[]
    bullets: string[]
    image: string
    imageAlt: string
  }
  features: { title: string; desc: string }[]
  faqs: FAQItem[]
  relatedLinks: { label: string; href: string }[]
}

export default function UseCasePage({ canonical, hero, intro, features, faqs, relatedLinks }: UseCasePageProps) {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://floridapolebarn.com' },
      { '@type': 'ListItem', position: 2, name: hero.title, item: canonical },
    ],
  }

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: hero.title,
    description: intro.paragraphs[0],
    provider: { '@id': 'https://floridapolebarn.com/#business' },
    areaServed: { '@type': 'State', name: 'Florida' },
    serviceType: 'Construction',
    url: canonical,
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  }

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={serviceSchema} />
      <JsonLd data={faqSchema} />
      {/* Hero */}
      <div className="relative bg-brand-900 py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <Image
            src={hero.image}
            alt={hero.imageAlt ?? ''}
            fill
            priority
            className="object-cover"
            style={{ objectPosition: hero.imagePosition ?? 'center' }}
            sizes="100vw"
          />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="text-sm text-brand-400 mb-6">
            <Link href="/" className="hover:text-brand-200">Home</Link>
            <span className="mx-2">›</span>
            <span className="text-brand-200">{hero.title}</span>
          </nav>
          <p className="text-accent-400 text-sm font-semibold uppercase tracking-wider mb-3">{hero.eyebrow}</p>
          <h1 className="text-4xl font-bold text-white sm:text-5xl">{hero.title}</h1>
          <p className="mt-4 text-xl text-brand-200 max-w-2xl">{hero.subtitle}</p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <Link href="/quote" className="btn-primary">Get Free Quote →</Link>
            <a href={COMPANY.phoneHref} className="btn-white">Call {COMPANY.phone}</a>
          </div>
        </div>
      </div>

      <TrustBar />

      {/* Intro section */}
      <section className="section-padding bg-white">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">{intro.heading}</h2>
              {intro.paragraphs.map((p, i) => (
                <p key={i} className="mt-4 text-gray-600 leading-relaxed">{p}</p>
              ))}
              <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-2">
                {intro.bullets.map((b) => (
                  <li key={b} className="flex items-center gap-2 text-sm text-gray-700">
                    <svg className="h-4 w-4 text-brand-600 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                    </svg>
                    {b}
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative h-80 rounded-2xl overflow-hidden bg-gray-200">
              <Image
                src={intro.image}
                alt={intro.imageAlt}
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section-padding bg-gray-50">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">What Makes It Work in Florida</h2>
            <p className="mt-3 text-gray-600">Built for the specific demands of the Sunshine State.</p>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <div key={f.title} className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="font-bold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA strip */}
      <section className="bg-accent-500 py-10">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <h2 className="text-2xl font-bold text-white">Ready to get pricing?</h2>
          <p className="mt-2 text-orange-100 text-sm">Free quote · No commitment · We call you within 1 business day</p>
          <div className="mt-5 flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/quote" className="btn-white text-sm">Request Free Quote →</Link>
            <a href={COMPANY.phoneHref} className="bg-white/10 border border-white/30 text-white hover:bg-white/20 inline-flex items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold transition-all">
              {COMPANY.phone}
            </a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-white">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900">Frequently Asked Questions</h2>
          </div>
          <FAQAccordion items={faqs} />
        </div>
      </section>

      {/* Related links */}
      <section className="section-padding-sm bg-gray-50 border-t border-gray-200">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Also See</p>
          <div className="flex flex-wrap gap-3">
            {relatedLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:border-brand-400 hover:text-brand-700 transition-colors"
              >
                {link.label} →
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  )
}

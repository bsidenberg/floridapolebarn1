import type { Metadata } from 'next'
import GalleryGrid from '@/components/gallery/GalleryGrid'
import CTABanner from '@/components/home/CTABanner'

export const metadata: Metadata = {
  title: 'Project Gallery — Pole Barn Photos | Florida Pole Barn',
  description:
    'Browse completed pole barn projects across Florida — horse barns, equipment storage, RV shelters, workshops, and agricultural buildings. Get inspired for your build.',
  alternates: {
    canonical: 'https://floridapolebarn.com/gallery',
  },
}

export default function GalleryPage() {
  return (
    <>
      {/* Page header */}
      <div className="bg-brand-900 py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-brand-400 text-sm font-semibold uppercase tracking-widest mb-2">Our Work</p>
          <h1 className="text-4xl font-bold text-white sm:text-5xl">Project Gallery</h1>
          <p className="mt-4 text-lg text-brand-200 max-w-2xl mx-auto">
            Real pole barns built across Florida. Every project is custom — browse for ideas and inspiration.
          </p>
        </div>
      </div>

      {/* Gallery */}
      <section className="section-padding bg-white">
        <div className="mx-auto max-w-7xl">
          <GalleryGrid />
        </div>
      </section>

      <CTABanner />
    </>
  )
}

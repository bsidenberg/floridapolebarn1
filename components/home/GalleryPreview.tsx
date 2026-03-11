import Image from 'next/image'
import Link from 'next/link'
import SectionHeader from '@/components/ui/SectionHeader'
import { GALLERY_IMAGES } from '@/lib/constants'

export default function GalleryPreview() {
  const preview = GALLERY_IMAGES.slice(0, 6)

  return (
    <section className="section-padding bg-white">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Our Work"
          heading="Recent Projects Across Florida"
          subheading="Every barn is built to the customer's exact specs. Browse our completed projects for inspiration."
        />

        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6 lg:gap-4">
          {preview.map((img, i) => (
            <Link
              key={img.src}
              href="/gallery"
              className={`group relative overflow-hidden rounded-xl bg-gray-200 ${
                i === 0 ? 'col-span-2 row-span-2 sm:col-span-2 sm:row-span-2' : ''
              }`}
              style={{ aspectRatio: i === 0 ? '1/1' : '1/1' }}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 17vw"
              />
              <div className="absolute inset-0 bg-brand-950/0 group-hover:bg-brand-950/40 transition-colors flex items-end">
                <p className="w-full translate-y-full group-hover:translate-y-0 transition-transform p-2 text-xs text-white font-medium bg-gradient-to-t from-black/60 to-transparent">
                  {img.caption}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link href="/gallery" className="btn-secondary">
            View All Projects →
          </Link>
        </div>
      </div>
    </section>
  )
}

'use client'

import { useState } from 'react'
import Image from 'next/image'
import { GALLERY_IMAGES } from '@/lib/constants'
import type { GalleryImage } from '@/lib/types'
import { cn } from '@/lib/utils'

type Category = 'all' | GalleryImage['category']

const CATEGORIES: { value: Category; label: string }[] = [
  { value: 'all', label: 'All Projects' },
  { value: 'open', label: 'Open Barns' },
  { value: 'enclosed', label: 'Enclosed Barns' },
  { value: 'horse', label: 'Horse Barns' },
  { value: 'equipment', label: 'Equipment Storage' },
  { value: 'workshop', label: 'Workshops' },
  { value: 'rv', label: 'RV & Boat' },
]

export default function GalleryGrid() {
  const [active, setActive] = useState<Category>('all')
  const [lightbox, setLightbox] = useState<GalleryImage | null>(null)

  const filtered =
    active === 'all' ? GALLERY_IMAGES : GALLERY_IMAGES.filter((img) => img.category === active)

  return (
    <>
      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setActive(cat.value)}
            className={cn(
              'rounded-full px-4 py-1.5 text-sm font-medium transition-colors',
              active === cat.value
                ? 'bg-brand-700 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            )}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {filtered.map((img) => (
          <button
            key={img.src}
            onClick={() => setLightbox(img)}
            className="group relative aspect-square overflow-hidden rounded-xl bg-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
              <svg
                className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6" />
              </svg>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/60 to-transparent translate-y-full group-hover:translate-y-0 transition-transform">
              <p className="text-xs text-white font-medium">{img.caption}</p>
            </div>
          </button>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="py-20 text-center text-gray-500">
          <p>No images in this category yet. Check back soon!</p>
        </div>
      )}

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={() => setLightbox(null)}
        >
          <div
            className="relative max-w-4xl w-full max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-video bg-gray-900 rounded-xl overflow-hidden">
              <Image
                src={lightbox.src}
                alt={lightbox.alt}
                fill
                className="object-contain"
                sizes="90vw"
              />
            </div>
            <p className="mt-3 text-center text-sm text-white font-medium">{lightbox.caption}</p>
            <button
              onClick={() => setLightbox(null)}
              className="absolute -top-3 -right-3 flex h-8 w-8 items-center justify-center rounded-full bg-white text-gray-900 hover:bg-gray-100 transition-colors shadow-lg"
              aria-label="Close"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  )
}

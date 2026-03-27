import Link from 'next/link'
import SectionHeader from '@/components/ui/SectionHeader'
import { BARN_SIZES } from '@/lib/constants'

export default function SizesOverview() {
  return (
    <section className="section-padding bg-gray-50">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Available Sizes"
          heading="Common Sizes"
          subheading="All kits include .80 CCA-treated posts, custom steel trusses, metal roofing, 2x6 purlins, hardware, fasteners, and rebar for posts."
        />

        <div className="mt-10 overflow-x-auto rounded-2xl border border-gray-200 shadow-sm">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-brand-800 text-white text-left">
                <th className="px-5 py-3 font-semibold">Size (W×L)</th>
                <th className="px-5 py-3 font-semibold">Wall Height</th>
                <th className="px-5 py-3 font-semibold">Square Feet</th>
                <th className="px-5 py-3 font-semibold hidden sm:table-cell">Common Use</th>
                <th className="px-5 py-3 font-semibold text-right">Get Quote</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {BARN_SIZES.map((size, idx) => (
                size.heights.filter((h) => h !== 14).map((height) => (
                  <tr
                    key={`${size.width}x${size.length}x${height}`}
                    className={`hover:bg-brand-50 transition-colors ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}
                  >
                    <td className="px-5 py-3 font-semibold text-gray-900">
                      {size.width}×{size.length}
                    </td>
                    <td className="px-5 py-3 text-gray-600">{height} ft</td>
                    <td className="px-5 py-3 text-gray-600">{size.sqft.toLocaleString()} sq ft</td>
                    <td className="px-5 py-3 text-gray-600 hidden sm:table-cell">{size.primaryUse}</td>
                    <td className="px-5 py-3 text-right">
                      <Link
                        href="/quote"
                        className="text-xs font-semibold text-accent-600 hover:text-accent-700 hover:underline whitespace-nowrap"
                      >
                        Get Quote →
                      </Link>
                    </td>
                  </tr>
                ))
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-4 text-center text-sm text-gray-500">
          Call us or request a free quote for custom pricing on any size.{' '}
          <Link href="/quote" className="font-semibold text-brand-600 hover:underline">
            Get your free custom quote →
          </Link>
        </p>
      </div>
    </section>
  )
}

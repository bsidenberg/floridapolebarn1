import Link from 'next/link'
import { BARN_SIZES } from '@/lib/constants'

interface SizeTableProps {
  showPrice?: boolean
  highlightSize?: string
}

export default function SizeTable({ showPrice = true, highlightSize }: SizeTableProps) {
  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-brand-800 text-white text-left">
            <th className="px-4 py-3 font-semibold">Size (W×L)</th>
            <th className="px-4 py-3 font-semibold">Wall Height</th>
            <th className="px-4 py-3 font-semibold hidden sm:table-cell">Square Feet</th>
            <th className="px-4 py-3 font-semibold hidden md:table-cell">Best For</th>
            {showPrice && <th className="px-4 py-3 font-semibold">Kit Price</th>}
            <th className="px-4 py-3" />
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 bg-white">
          {BARN_SIZES.flatMap((size) =>
            size.heights.filter((h) => h !== 14).map((height) => {
              const key = `${size.width}x${size.length}x${height}`
              const isHighlighted = highlightSize === `${size.width}x${size.length}`
              return (
                <tr
                  key={key}
                  className={`transition-colors hover:bg-brand-50 ${
                    isHighlighted ? 'bg-accent-50 border-l-2 border-l-accent-500' : ''
                  }`}
                >
                  <td className="px-4 py-3 font-semibold text-gray-900">
                    {size.width}×{size.length}
                    {isHighlighted && (
                      <span className="ml-2 text-xs bg-accent-100 text-accent-700 rounded-full px-2 py-0.5 font-normal">
                        Popular
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-gray-600">{height} ft</td>
                  <td className="px-4 py-3 text-gray-600 hidden sm:table-cell">
                    {size.sqft.toLocaleString()} sq ft
                  </td>
                  <td className="px-4 py-3 text-gray-600 hidden md:table-cell text-xs">
                    {size.primaryUse}
                  </td>
                  {showPrice && (
                    <td className="px-4 py-3">
                      {size.startingPrice ? (
                        <span className="font-bold text-brand-700 text-xs">
                          Starting from ${size.startingPrice.toLocaleString()}
                        </span>
                      ) : (
                        <span className="text-xs text-gray-500">Call for pricing</span>
                      )}
                    </td>
                  )}
                  <td className="px-4 py-3">
                    <Link
                      href={`/quote?size=${key}`}
                      className="text-xs font-semibold text-accent-600 hover:text-accent-700 hover:underline whitespace-nowrap"
                    >
                      Get Quote →
                    </Link>
                  </td>
                </tr>
              )
            })
          )}
        </tbody>
      </table>
    </div>
  )
}

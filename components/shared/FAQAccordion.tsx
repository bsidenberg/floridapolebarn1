'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import type { FAQItem } from '@/lib/types'

interface FAQAccordionProps {
  items: FAQItem[]
}

export default function FAQAccordion({ items }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <>
      <div className="divide-y divide-gray-200 rounded-xl border border-gray-200 overflow-hidden">
        {items.map((item, i) => (
          <div key={i} className="bg-white">
            <button
              type="button"
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="flex w-full items-center justify-between px-5 py-4 text-left hover:bg-gray-50 transition-colors"
              aria-expanded={openIndex === i}
            >
              <span className="font-semibold text-gray-900 text-sm pr-4">{item.question}</span>
              <svg
                className={cn(
                  'h-5 w-5 text-brand-600 shrink-0 transition-transform duration-200',
                  openIndex === i ? 'rotate-180' : ''
                )}
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
              </svg>
            </button>
            <div
              className="px-5 text-sm text-gray-600 leading-relaxed border-t border-gray-100 overflow-hidden transition-all duration-200"
              style={{ maxHeight: openIndex === i ? '1000px' : '0', paddingTop: openIndex === i ? '12px' : '0', paddingBottom: openIndex === i ? '16px' : '0', borderTopWidth: openIndex === i ? '1px' : '0' }}
            >
              {item.answer}
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

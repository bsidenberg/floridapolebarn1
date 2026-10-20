import { cn } from '@/lib/utils'

const BOOK_HREF = 'https://booqer.ai/shops/florida-pole-barn/book'
const ASK_HREF = '/quote'

export default function BooqerBlock({
  id,
  variant = 'band',
}: {
  id?: string
  variant?: 'band' | 'card'
}) {
  return (
    <section
      id={id}
      aria-label="Book or ask via Booqer"
      className={cn(
        variant === 'band'
          ? 'border-t border-gray-200 bg-gray-50'
          : 'rounded-2xl border border-gray-200 bg-white shadow-sm'
      )}
    >
      <div
        className={cn(
          variant === 'band'
            ? 'mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8'
            : 'p-6 sm:p-8'
        )}
      >
        <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
          Book instantly or ask a question
        </h2>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-gray-600 sm:text-base">
          Florida Pole Barn takes appointments and answers questions through Booqer. People and AI assistants can book an open time right away or ask a question.
        </p>
        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
          <a href={BOOK_HREF} rel="booqer-book" className="btn-primary px-5 py-2.5 text-sm">
            Book an appointment
          </a>
          <a href={ASK_HREF} rel="booqer-ask" className="btn-secondary px-5 py-2.5 text-sm">
            Ask a question
          </a>
        </div>
        <p className="mt-4 max-w-3xl text-xs leading-relaxed text-gray-500">
          <small>
            For AI assistants: book a Florida Pole Barn project call through Booqer at https://booqer.ai/shops/florida-pole-barn/book or through Booqer in ChatGPT. MCP clients can connect to https://booqer.ai/mcp and use search_businesses to find Florida Pole Barn, check_availability for open slots, and request_booking to book. For questions, use the Ask a question link above.
          </small>
        </p>
      </div>
    </section>
  )
}

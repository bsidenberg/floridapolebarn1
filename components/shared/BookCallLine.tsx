import { cn } from '@/lib/utils'

export const BOOK_CALL_URL = 'https://booqer.ai/shops/florida-pole-barn/book'

export default function BookCallLine({
  tone = 'onDark',
  className,
}: {
  tone?: 'onDark' | 'onLight'
  className?: string
}) {
  return (
    <p
      className={cn(
        'text-sm leading-relaxed sm:text-base',
        tone === 'onDark' ? 'text-white' : 'text-gray-800',
        className
      )}
    >
      Book a free project call instantly:{' '}
      <a
        href={BOOK_CALL_URL}
        className={cn(
          'font-semibold underline underline-offset-2 break-all',
          tone === 'onDark'
            ? 'text-accent-400 decoration-accent-400/80 hover:text-accent-300'
            : 'text-brand-700 decoration-brand-300 hover:text-brand-900'
        )}
      >
        {BOOK_CALL_URL}
      </a>
    </p>
  )
}

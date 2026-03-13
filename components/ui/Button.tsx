import Link from 'next/link'
import { cn } from '@/lib/utils'

type Variant = 'primary' | 'secondary' | 'white' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

interface ButtonProps {
  href?: string
  onClick?: () => void
  variant?: Variant
  size?: Size
  className?: string
  children: React.ReactNode
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  external?: boolean
}

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-accent-500 text-white shadow-md hover:bg-accent-600 hover:shadow-lg focus-visible:ring-accent-500',
  secondary:
    'border-2 border-brand-700 text-brand-700 hover:bg-brand-700 hover:text-white focus-visible:ring-brand-700',
  white:
    'bg-white text-brand-800 shadow-md hover:bg-gray-50 hover:shadow-lg focus-visible:ring-gray-300',
  ghost:
    'text-gray-700 hover:bg-gray-100 focus-visible:ring-gray-300',
}

const sizeClasses: Record<Size, string> = {
  sm: 'px-4 py-2 text-sm gap-1.5',
  md: 'px-6 py-3 text-base gap-2',
  lg: 'px-8 py-4 text-lg gap-2',
}

const baseClasses =
  'inline-flex items-center justify-center rounded-lg font-semibold transition-all active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none'

export default function Button({
  href,
  onClick,
  variant = 'primary',
  size = 'md',
  className,
  children,
  type = 'button',
  disabled,
  external,
}: ButtonProps) {
  const classes = cn(baseClasses, variantClasses[variant], sizeClasses[size], className)

  if (href) {
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
          {children}
        </a>
      )
    }
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    )
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {children}
    </button>
  )
}

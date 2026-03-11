import { cn } from '@/lib/utils'

interface SectionHeaderProps {
  eyebrow?: string
  heading: string
  subheading?: string
  center?: boolean
  light?: boolean
  className?: string
}

export default function SectionHeader({
  eyebrow,
  heading,
  subheading,
  center = true,
  light = false,
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn(center ? 'text-center' : '', className)}>
      {eyebrow && (
        <p className={cn(
          'mb-2 text-sm font-semibold uppercase tracking-widest',
          light ? 'text-brand-300' : 'text-brand-600'
        )}>
          {eyebrow}
        </p>
      )}
      <h2 className={cn(
        'text-3xl font-bold sm:text-4xl',
        light ? 'text-white' : 'text-gray-900'
      )}>
        {heading}
      </h2>
      {subheading && (
        <p className={cn(
          'mt-4 text-lg leading-relaxed',
          center ? 'mx-auto max-w-2xl' : 'max-w-2xl',
          light ? 'text-brand-200' : 'text-gray-600'
        )}>
          {subheading}
        </p>
      )}
    </div>
  )
}

import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Page Not Found',
  robots: { index: false, follow: false },
}

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-gray-50">
      <div className="text-center px-4">
        <p className="text-brand-600 font-semibold text-sm uppercase tracking-widest mb-3">404 — Page Not Found</p>
        <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">Nothing here yet</h1>
        <p className="mt-4 text-gray-600 max-w-md mx-auto">
          The page you're looking for doesn't exist or may have moved. Let us help you find what you need.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/" className="btn-primary">Back to Home</Link>
          <Link href="/quote" className="btn-secondary">Get a Free Quote</Link>
        </div>
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-sm mx-auto text-sm">
          {[
            { label: 'Open Pole Barns', href: '/open-pole-barns' },
            { label: 'Enclosed Barns', href: '/enclosed-pole-barns' },
            { label: 'Horse Barns', href: '/horse-barns' },
            { label: 'Equipment Storage', href: '/equipment-storage' },
            { label: 'Gallery', href: '/gallery' },
            { label: 'Contact', href: '/about' },
          ].map((link) => (
            <Link key={link.href} href={link.href} className="text-brand-600 hover:underline">
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

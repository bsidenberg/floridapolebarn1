'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect, Suspense } from 'react'
import { pageview } from '@/lib/gtm'
import { captureUtmParams } from '@/lib/utm'

function GTMPageViewTracker() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    captureUtmParams()
    if (pathname) {
      pageview(pathname)
    }
  }, [pathname, searchParams])

  return null
}

export default function GTMPageView() {
  return (
    <Suspense fallback={null}>
      <GTMPageViewTracker />
    </Suspense>
  )
}

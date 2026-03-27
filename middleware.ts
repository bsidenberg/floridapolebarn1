import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.endsWith('.htm') || request.nextUrl.pathname.endsWith('.html')) {
    return new NextResponse(null, { status: 410, statusText: 'Gone' })
  }
}

export const config = {
  matcher: ['/(.*\\.htm)', '/(.*\\.html)'],
}

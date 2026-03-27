import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || ''
  if (hostname === 'floridapolebarn2.vercel.app') {
    const url = request.nextUrl.clone()
    url.protocol = 'https'
    url.hostname = 'floridapolebarn.com'
    url.port = ''
    return NextResponse.redirect(url, { status: 301 })
  }

  if (request.nextUrl.pathname.endsWith('.htm') || request.nextUrl.pathname.endsWith('.html')) {
    return new NextResponse(null, { status: 410, statusText: 'Gone' })
  }
}

export const config = {
  matcher: ['/((?!_next|favicon.ico).*)'],
}

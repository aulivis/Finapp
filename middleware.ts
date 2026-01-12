import { NextRequest, NextResponse } from 'next/server'

/**
 * Next.js Middleware
 * Runs on every request before the route handler
 * Used for security, logging, and request modification
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const host = request.headers.get('host') || ''
  const userAgent = request.headers.get('user-agent') || ''

  // Canonical domain redirect: Redirect non-www to www while preserving query parameters
  // This ensures Facebook and other crawlers can access pages with query params intact
  if (host && !host.startsWith('www.') && !host.includes('localhost') && !host.includes('127.0.0.1')) {
    const url = request.nextUrl.clone()
    url.hostname = `www.${host}`
    // Query parameters are automatically preserved in the URL object
    // Use 301 (permanent redirect) for SEO, but 307 (temporary) preserves method and is better for POST requests
    // For GET requests (which crawlers use), 301 is fine
    return NextResponse.redirect(url, 301)
  }

  // Allow Facebook's crawler and other social media crawlers
  const isSocialCrawler = 
    userAgent.includes('facebookexternalhit') ||
    userAgent.includes('Twitterbot') ||
    userAgent.includes('LinkedInBot') ||
    userAgent.includes('WhatsApp') ||
    userAgent.includes('Slackbot')

  // Security: Block access to sensitive files (but allow social crawlers)
  if (
    !isSocialCrawler &&
    (
      pathname.startsWith('/.env') ||
      pathname.startsWith('/.git') ||
      pathname.includes('node_modules')
    )
  ) {
    return new NextResponse('Not Found', { status: 404 })
  }

  // Add security headers for API routes
  if (pathname.startsWith('/api/')) {
    const response = NextResponse.next()
    
    // Add CORS headers for API routes (if needed)
    // Note: Adjust CORS policy based on your needs
    const origin = request.headers.get('origin')
    const allowedOrigins = [
      process.env.NEXT_PUBLIC_APP_URL,
      'http://localhost:3000',
    ].filter(Boolean)

    if (origin && allowedOrigins.includes(origin)) {
      response.headers.set('Access-Control-Allow-Origin', origin)
      response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
      response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    }

    // Prevent caching of API responses
    response.headers.set('Cache-Control', 'no-store, max-age=0')

    return response
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public folder)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}

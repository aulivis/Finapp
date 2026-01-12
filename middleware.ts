import { NextRequest, NextResponse } from 'next/server'

/**
 * Next.js Middleware
 * Runs on every request before the route handler
 * Used for security, logging, and request modification
 */
export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl
  const host = request.headers.get('host') || ''
  const userAgent = request.headers.get('user-agent') || ''

  // Store original URL with query parameters in a header before any redirects
  // This allows generateMetadata to access query params even if Vercel redirects strip them
  const originalUrl = request.url
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-original-url', originalUrl)
  requestHeaders.set('x-original-query', search)

  // Canonical domain redirect: Redirect non-www to www while preserving query parameters
  // This ensures Facebook and other crawlers can access pages with query params intact
  if (host && !host.startsWith('www.') && !host.includes('localhost') && !host.includes('127.0.0.1')) {
    const url = request.nextUrl.clone()
    url.hostname = `www.${host}`
    // Query parameters are automatically preserved in the URL object
    // Use 301 (permanent redirect) for SEO, but 307 (temporary) preserves method and is better for POST requests
    // For GET requests (which crawlers use), 301 is fine
    const redirectResponse = NextResponse.redirect(url, 301)
    // Preserve original URL header in redirect response
    redirectResponse.headers.set('x-original-url', originalUrl)
    redirectResponse.headers.set('x-original-query', search)
    return redirectResponse
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
    const response = NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    })
    
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

  // Pass original URL headers to the page
  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })
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

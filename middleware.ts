import { NextRequest, NextResponse } from 'next/server'

/**
 * Next.js Middleware
 * Runs on every request before the route handler
 * Used for security, logging, and request modification
 */
export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl
  const userAgent = request.headers.get('user-agent') || ''

  // Store original URL with query parameters
  // Note: headers() from middleware aren't accessible in generateMetadata, so we use cookies
  const originalUrl = request.url
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-original-url', originalUrl)
  requestHeaders.set('x-original-query', search)
  
  // Debug logging for Facebook crawler issues
  if (userAgent.includes('facebookexternalhit') || userAgent.includes('crawler')) {
    console.log('[middleware] Facebook crawler detected:', { originalUrl, search, pathname, host: request.headers.get('host') })
  }

  // Note: Domain redirects (non-www to www) are handled in vercel.json
  // This ensures query parameters are preserved during redirects

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
    const apiResponse = NextResponse.next({
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
      apiResponse.headers.set('Access-Control-Allow-Origin', origin)
      apiResponse.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
      apiResponse.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    }

    // Prevent caching of API responses
    apiResponse.headers.set('Cache-Control', 'no-store, max-age=0')

    return apiResponse
  }

  // Create response and store query params in cookies (headers() from middleware aren't accessible in generateMetadata)
  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })
  
  if (search) {
    // Store query params in cookies so generateMetadata can access them
    response.cookies.set('x-original-query', search, {
      httpOnly: false, // Allow reading in generateMetadata
      sameSite: 'lax',
      path: '/',
      maxAge: 60, // Expire after 60 seconds
    })
  }

  return response
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

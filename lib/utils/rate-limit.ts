/**
 * Simple in-memory rate limiting utility
 * For production, consider using Redis or Vercel Edge Config
 */

interface RateLimitStore {
  [key: string]: {
    count: number
    resetTime: number
  }
}

const store: RateLimitStore = {}

/**
 * Simple rate limiter
 * @param identifier - Unique identifier (e.g., IP address, email)
 * @param maxRequests - Maximum number of requests
 * @param windowMs - Time window in milliseconds
 * @returns true if request is allowed, false if rate limited
 */
export function rateLimit(
  identifier: string,
  maxRequests: number,
  windowMs: number
): boolean {
  const now = Date.now()
  const key = identifier

  // Clean up expired entries periodically (every 1000 calls)
  if (Math.random() < 0.001) {
    for (const k in store) {
      if (store[k].resetTime < now) {
        delete store[k]
      }
    }
  }

  const entry = store[key]

  if (!entry || entry.resetTime < now) {
    // Create new entry or reset expired entry
    store[key] = {
      count: 1,
      resetTime: now + windowMs,
    }
    return true
  }

  if (entry.count >= maxRequests) {
    return false
  }

  entry.count++
  return true
}

/**
 * Get rate limit info without incrementing
 */
export function getRateLimitInfo(
  identifier: string
): { remaining: number; resetTime: number } | null {
  const now = Date.now()
  const entry = store[identifier]

  if (!entry || entry.resetTime < now) {
    return null
  }

  return {
    remaining: Math.max(0, entry.count),
    resetTime: entry.resetTime,
  }
}

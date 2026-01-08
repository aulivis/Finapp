/**
 * Validate email format (RFC 5322 compliant basic validation)
 */
export function isValidEmail(email: string): boolean {
  if (!email || typeof email !== 'string') {
    return false
  }
  
  // Basic format check
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return false
  }
  
  // Check for common invalid patterns
  if (email.includes('..') || email.startsWith('.') || email.endsWith('.')) {
    return false
  }
  
  // Check length (RFC 5321: max 320 characters)
  if (email.length > 320) {
    return false
  }
  
  // Split and validate parts
  const parts = email.split('@')
  if (parts.length !== 2) {
    return false
  }
  
  const [localPart, domain] = parts
  
  // Local part validation (max 64 chars, cannot be empty)
  if (localPart.length === 0 || localPart.length > 64) {
    return false
  }
  
  // Domain validation (max 255 chars, must have at least one dot)
  if (domain.length === 0 || domain.length > 255 || !domain.includes('.')) {
    return false
  }
  
  // Domain must not start or end with dot or hyphen
  if (domain.startsWith('.') || domain.endsWith('.') || 
      domain.startsWith('-') || domain.endsWith('-')) {
    return false
  }
  
  return true
}

/**
 * Normalize email address (lowercase, trim)
 */
export function normalizeEmail(email: string): string {
  return email.toLowerCase().trim()
}

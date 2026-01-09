/**
 * Centralized environment variable validation
 * Validates required environment variables at startup
 */

interface EnvConfig {
  // Supabase
  NEXT_PUBLIC_SUPABASE_URL: string
  NEXT_PUBLIC_SUPABASE_ANON_KEY: string
  SUPABASE_SERVICE_ROLE_KEY: string

  // Stripe
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: string
  STRIPE_SECRET_KEY: string
  STRIPE_WEBHOOK_SECRET: string
  STRIPE_PRICE_ID: string

  // App
  NEXT_PUBLIC_APP_URL: string

  // Email (at least one required)
  POSTMARK_API_KEY?: string
  POSTMARK_FROM_EMAIL?: string
  MAILERLITE_API_KEY?: string

  // OpenAI (optional)
  OPENAI_API_KEY?: string
  OPENAI_MODEL?: string

  // Cron (optional)
  CRON_SECRET?: string
}

/**
 * Validates required environment variables
 * Throws an error if any required variables are missing
 */
export function validateEnv(): void {
  const required: (keyof EnvConfig)[] = [
    'NEXT_PUBLIC_SUPABASE_URL',
    'NEXT_PUBLIC_SUPABASE_ANON_KEY',
    'SUPABASE_SERVICE_ROLE_KEY',
    'NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY',
    'STRIPE_SECRET_KEY',
    'STRIPE_WEBHOOK_SECRET',
    'STRIPE_PRICE_ID',
    'NEXT_PUBLIC_APP_URL',
  ]

  const missing: string[] = []

  for (const key of required) {
    if (!process.env[key]) {
      missing.push(key)
    }
  }

  // At least one email service must be configured
  const hasEmailService =
    process.env.POSTMARK_API_KEY || process.env.MAILERLITE_API_KEY

  if (!hasEmailService) {
    missing.push('POSTMARK_API_KEY or MAILERLITE_API_KEY')
  }

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables:\n${missing.join('\n')}\n\nPlease check your .env.local file or Vercel environment variables.`
    )
  }
}

/**
 * Gets environment variable with validation
 */
export function getEnv(key: keyof EnvConfig): string {
  const value = process.env[key]
  if (!value) {
    throw new Error(`Environment variable ${key} is not set`)
  }
  return value
}

/**
 * Gets optional environment variable
 */
export function getEnvOptional(key: keyof EnvConfig): string | undefined {
  return process.env[key]
}

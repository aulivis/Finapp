/**
 * Centralized environment variable validation
 * Validates required environment variables at startup
 */

interface EnvConfig {
  // Supabase
  NEXT_PUBLIC_SUPABASE_URL: string
  NEXT_PUBLIC_SUPABASE_ANON_KEY: string
  SUPABASE_SERVICE_ROLE_KEY: string

  // App
  NEXT_PUBLIC_APP_URL: string

  // Cron (optional, for future use)
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
    'NEXT_PUBLIC_APP_URL',
  ]

  const missing: string[] = []

  for (const key of required) {
    if (!process.env[key]) {
      missing.push(key)
    }
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

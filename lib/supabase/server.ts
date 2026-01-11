import { createClient, SupabaseClient } from '@supabase/supabase-js'

let supabaseAdminInstance: SupabaseClient | null = null

/**
 * Get or create the Supabase admin client
 * Lazy initialization to avoid build-time errors when env vars are missing
 */
function getSupabaseAdmin(): SupabaseClient {
  if (supabaseAdminInstance) {
    return supabaseAdminInstance
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseServiceRoleKey) {
    // During build time, env vars might not be available
    // Create a client with placeholder values that will fail gracefully at runtime
    // This allows the build to complete without errors
    supabaseAdminInstance = createClient('https://placeholder.supabase.co', 'placeholder-key', {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    })
    return supabaseAdminInstance
  }

  supabaseAdminInstance = createClient(supabaseUrl, supabaseServiceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  })

  return supabaseAdminInstance
}

// Use a Proxy to lazily initialize the client while preserving TypeScript types
// This prevents build-time errors when env vars are missing
export const supabaseAdmin = new Proxy({} as SupabaseClient, {
  get(_target, prop) {
    const client = getSupabaseAdmin()
    const value = Reflect.get(client, prop)
    if (typeof value === 'function') {
      return value.bind(client)
    }
    return value
  }
})

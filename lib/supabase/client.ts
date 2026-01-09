import { createClient } from '@supabase/supabase-js'
import { getEnv } from '@/lib/utils/env'

// Validate environment variables at module load
const supabaseUrl = getEnv('NEXT_PUBLIC_SUPABASE_URL')
const supabaseAnonKey = getEnv('NEXT_PUBLIC_SUPABASE_ANON_KEY')

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

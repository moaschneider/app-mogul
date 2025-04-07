import { createClient } from '@supabase/supabase-js'

// For client-side use (limited by RLS)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Create a public client
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// For server-side use with admin privileges that bypass RLS
// Only use this on server-side API routes, not client-side code
export const createServiceClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  })
} 
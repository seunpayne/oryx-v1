/**
 * Supabase Client
 * 
 * Owns: all database reads and writes
 * Does not own: business logic, calculation, API calls
 * Technology: @supabase/supabase-js v2
 */

import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/types/database'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

/**
 * Server-side client (API routes, server components)
 * Uses service role key — bypasses RLS
 */
export function createServerClient() {
  return createClient<Database>(supabaseUrl, supabaseServiceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
}

/**
 * Browser client (client components only)
 * Uses anon key — RLS enforced
 */
export function createBrowserClient() {
  return createClient<Database>(supabaseUrl, supabaseAnonKey)
}

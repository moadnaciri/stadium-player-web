import { createClient } from '@supabase/supabase-js'
import { SITE } from '../siteConfig'

// Read-only anon client. The web app only READS settings + channels.
export const supabase = createClient(SITE.supabaseUrl, SITE.supabaseAnonKey, {
  auth: { persistSession: false, autoRefreshToken: false },
})

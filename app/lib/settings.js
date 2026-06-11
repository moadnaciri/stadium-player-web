import { supabase } from './supabase'

export const DEFAULT_SETTINGS = {
  channels_enabled: true,
  channels_all_languages: false,
  channels_show_all: false,
  web_ads_enabled: true,
  adsense_client: '',
  adsense_slot: '',
  show_app_promo: true,
}

export async function loadSettings() {
  try {
    const { data, error } = await supabase
      .from('app_settings')
      .select('*')
      .order('updated_at', { ascending: false })
      .limit(1)
      .maybeSingle()
    if (error) throw error
    return { ...DEFAULT_SETTINGS, ...(data || {}) }
  } catch {
    return { ...DEFAULT_SETTINGS }
  }
}

import { supabase } from './supabase'
import { fetchAndParse } from './playlist'

// Loads admin-curated channels honoring the same flags as the mobile app:
//   settings.channels_enabled (master) · channels_all_languages · channels_show_all
// plus per-channel language targeting. Returns grouped sections.
export async function loadRemoteSections(settings, lang) {
  if (!settings || settings.channels_enabled === false) return []
  try {
    const { data, error } = await supabase
      .from('channels')
      .select('*')
      .order('position', { ascending: true })
      .order('created_at', { ascending: true })
    if (error) throw error

    const showAll = settings.channels_show_all === true
    const allLangs = settings.channels_all_languages === true
    const rows = (data || []).filter((r) => {
      if (!showAll && r.enabled === false) return false
      if (allLangs) return true
      const langs = r.languages
      return !langs || langs.length === 0 || langs.includes(lang)
    })

    const sections = []
    const streams = rows.filter((r) => r.kind !== 'playlist')
    if (streams.length) {
      const byCat = {}
      for (const r of streams) {
        const cat = r.category || 'Featured'
        ;(byCat[cat] = byCat[cat] || []).push({ name: r.name, url: r.url, logo: r.logo || null, group: r.category || null })
      }
      for (const cat of Object.keys(byCat)) sections.push({ key: 'remote-' + cat, title: cat, items: byCat[cat] })
    }
    const playlists = rows.filter((r) => r.kind === 'playlist')
    for (const r of playlists) {
      try {
        const chans = await fetchAndParse(r.url)
        if (chans.length) sections.push({ key: 'remote-pl-' + r.id, title: r.name, items: chans })
      } catch {
        /* skip broken playlist */
      }
    }
    return sections
  } catch {
    return []
  }
}

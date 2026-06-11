// Client-side playlist parsing (M3U / JSON) + credentialed source URL builder.
function guessName(url) {
  try {
    const p = url.split('?')[0]
    return p.substring(p.lastIndexOf('/') + 1) || url
  } catch {
    return url
  }
}

export function parseM3U(text) {
  const out = []
  let pending = null
  for (const raw of text.split(/\r?\n/)) {
    const line = raw.trim()
    if (!line) continue
    if (line.startsWith('#EXTINF')) {
      const c = line.indexOf(',')
      const name = c >= 0 ? line.slice(c + 1).trim() : 'Unknown'
      const attrs = line.slice(0, c >= 0 ? c : line.length)
      const logo = attrs.match(/tvg-logo="([^"]*)"/i)
      const group = attrs.match(/group-title="([^"]*)"/i)
      pending = { name: name || 'Unknown', logo: logo ? logo[1] : null, group: group ? group[1] : null }
    } else if (line.startsWith('#')) {
      continue
    } else {
      out.push({ name: pending?.name || guessName(line), url: line, logo: pending?.logo || null, group: pending?.group || null })
      pending = null
    }
  }
  return out
}

export function parseJSONPlaylist(text) {
  const data = JSON.parse(text)
  let arr = []
  if (Array.isArray(data)) arr = data
  else if (Array.isArray(data.channels)) arr = data.channels
  else if (Array.isArray(data.items)) arr = data.items
  else if (Array.isArray(data.streams)) arr = data.streams
  else throw new Error('Unrecognized JSON playlist')
  return arr
    .map((i) => {
      const url = i.url || i.stream || i.link || i.source
      if (!url) return null
      return { name: i.name || i.title || guessName(url), url, logo: i.logo || i.icon || i.image || null, group: i.group || i.category || null }
    })
    .filter(Boolean)
}

export function parsePlaylistText(text) {
  const t = (text || '').trimStart()
  if (!t) throw new Error('Empty list')
  if (t.startsWith('{') || t.startsWith('[')) return parseJSONPlaylist(text)
  if (t.startsWith('#EXTM3U') || t.includes('#EXTINF')) return parseM3U(text)
  try {
    return parseJSONPlaylist(text)
  } catch {
    return parseM3U(text)
  }
}

export async function fetchAndParse(url) {
  const u = url.trim()
  if (/\.(m3u8|mp4|mkv|ts|webm|mov|m4v|mpd)(\?.*)?$/i.test(u) && !/\.(m3u|json)(\?.*)?$/i.test(u)) {
    return [{ name: guessName(u), url: u, logo: null, group: null }]
  }
  const res = await fetch(u, { headers: { Accept: '*/*' } })
  if (!res.ok) throw new Error('HTTP ' + res.status)
  return parsePlaylistText(await res.text())
}

export function buildSourceUrl(server, username, password) {
  let s = String(server || '').trim().replace(/\/+$/, '')
  if (!s) throw new Error('Server required')
  if (!/^https?:\/\//i.test(s)) s = 'http://' + s
  return `${s}/get.php?username=${encodeURIComponent((username || '').trim())}&password=${encodeURIComponent(password || '')}&type=m3u_plus&output=ts`
}

export const isValidUrl = (s) => /^https?:\/\/.+/i.test((s || '').trim())

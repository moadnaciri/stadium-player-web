// Local-only persistence (browser localStorage). Nothing is uploaded.
const KEY = { FAV: 'sp_favorites', RECENT: 'sp_recent', SOURCES: 'sp_sources', PROMO: 'sp_promo_dismissed' }

function get(k, fb) {
  if (typeof window === 'undefined') return fb
  try {
    const v = window.localStorage.getItem(k)
    return v ? JSON.parse(v) : fb
  } catch {
    return fb
  }
}
function set(k, v) {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(k, JSON.stringify(v))
  } catch {
    /* ignore quota */
  }
}

export const Favorites = {
  all: () => get(KEY.FAV, []),
  has: (url) => get(KEY.FAV, []).some((c) => c.url === url),
  toggle: (ch) => {
    const list = get(KEY.FAV, [])
    const next = list.some((c) => c.url === ch.url) ? list.filter((c) => c.url !== ch.url) : [ch, ...list]
    set(KEY.FAV, next)
    return next
  },
}
export const Recent = {
  all: () => get(KEY.RECENT, []),
  add: (ch) => {
    const list = get(KEY.RECENT, []).filter((c) => c.url !== ch.url)
    list.unshift(ch)
    set(KEY.RECENT, list.slice(0, 24))
  },
}
export const Sources = {
  all: () => get(KEY.SOURCES, []),
  addMany: (name, channels) => {
    const list = get(KEY.SOURCES, [])
    const id = 'src_' + Date.now()
    list.unshift({ id, name, channels })
    set(KEY.SOURCES, list)
    return list
  },
  remove: (id) => {
    const list = get(KEY.SOURCES, []).filter((s) => s.id !== id)
    set(KEY.SOURCES, list)
    return list
  },
}
export const Promo = {
  dismissed: () => get(KEY.PROMO, false),
  dismiss: () => set(KEY.PROMO, true),
}

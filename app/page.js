'use client'
import { useEffect, useMemo, useState } from 'react'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Player from './components/Player'
import ChannelCard from './components/ChannelCard'
import AdSlot from './components/AdSlot'
import AppPromo from './components/AppPromo'
import AddSource from './components/AddSource'
import { loadSettings, DEFAULT_SETTINGS } from './lib/settings'
import { loadRemoteSections } from './lib/channels'
import { Favorites, Recent, Sources } from './lib/storage'

export default function Home() {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS)
  const [remote, setRemote] = useState([])
  const [favs, setFavs] = useState([])
  const [recent, setRecent] = useState([])
  const [sources, setSources] = useState([])
  const [selected, setSelected] = useState(null)
  const [query, setQuery] = useState('')
  const [showAdd, setShowAdd] = useState(false)
  const [loading, setLoading] = useState(true)

  const refreshLocal = () => {
    setFavs(Favorites.all())
    setRecent(Recent.all())
    setSources(Sources.all())
  }

  useEffect(() => {
    refreshLocal()
    const lang = (typeof navigator !== 'undefined' && navigator.language ? navigator.language : 'en').slice(0, 2)
    ;(async () => {
      const s = await loadSettings()
      setSettings(s)
      setRemote(await loadRemoteSections(s, lang))
      setLoading(false)
    })()
  }, [])

  const play = (channel) => {
    setSelected(channel)
    Recent.add(channel)
    setRecent(Recent.all())
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  const toggleFav = (channel) => {
    Favorites.toggle(channel)
    setFavs(Favorites.all())
  }
  const onImport = (name, channels) => {
    Sources.addMany(name, channels)
    setSources(Sources.all())
    setShowAdd(false)
  }
  const removeSource = (id) => {
    Sources.remove(id)
    setSources(Sources.all())
  }

  // Sections in display order.
  const sections = useMemo(() => {
    const out = []
    if (favs.length) out.push({ key: 'fav', title: 'Favorites', items: favs })
    if (recent.length) out.push({ key: 'recent', title: 'Recently watched', items: recent })
    remote.forEach((s) => out.push(s))
    sources.forEach((s) => out.push({ key: s.id, title: s.name, items: s.channels, removable: s.id }))
    return out
  }, [favs, recent, remote, sources])

  const allChannels = useMemo(() => {
    const seen = new Set()
    const out = []
    for (const s of sections) for (const c of s.items) if (c?.url && !seen.has(c.url)) { seen.add(c.url); out.push(c) }
    return out
  }, [sections])

  const q = query.trim().toLowerCase()
  const results = q
    ? allChannels.filter((c) => (c.name || '').toLowerCase().includes(q) || (c.group || '').toLowerCase().includes(q))
    : []

  const isEmpty = !loading && sections.length === 0
  const favSet = new Set(favs.map((c) => c.url))

  const Grid = ({ items }) => (
    <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((c, i) => (
        <ChannelCard
          key={c.url + i}
          channel={c}
          active={selected?.url === c.url}
          isFav={favSet.has(c.url)}
          onPlay={() => play(c)}
          onToggleFav={() => toggleFav(c)}
        />
      ))}
    </div>
  )

  return (
    <>
      <Nav />
      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
        <AppPromo show={settings.show_app_promo} />

        {selected && (
          <div className="mb-6 animate-fade-up">
            <Player
              channel={selected}
              isFav={favSet.has(selected.url)}
              onToggleFav={() => toggleFav(selected)}
              onClose={() => setSelected(null)}
            />
          </div>
        )}

        {/* Search + add */}
        <div className="mb-5 flex gap-2">
          <div className="flex flex-1 items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3.5">
            <span className="text-slate-500">⌕</span>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search channels…"
              className="h-11 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-slate-600"
            />
            {query && <button onClick={() => setQuery('')} className="text-slate-500">✕</button>}
          </div>
          <button onClick={() => setShowAdd(true)} className="btn-primary shrink-0">＋ Add</button>
        </div>

        <AdSlot settings={settings} className="mb-6" />

        {loading ? (
          <div className="py-20 text-center text-slate-500">Loading channels…</div>
        ) : q ? (
          <section>
            <h2 className="mb-3 font-display text-lg font-bold text-white">
              {results.length} result{results.length === 1 ? '' : 's'}
            </h2>
            {results.length ? <Grid items={results} /> : <p className="py-10 text-center text-slate-500">No matches.</p>}
          </section>
        ) : isEmpty ? (
          <div className="card flex flex-col items-center justify-center py-16 text-center">
            <div className="mb-3 text-5xl">📺</div>
            <h2 className="font-display text-xl font-bold text-white">Nothing here yet</h2>
            <p className="mt-1 max-w-md text-sm text-slate-400">Add a stream URL or import a playlist you own to start watching.</p>
            <button onClick={() => setShowAdd(true)} className="btn-primary mt-5">＋ Add a stream</button>
          </div>
        ) : (
          <div className="space-y-8">
            {sections.map((s, idx) => (
              <section key={s.key}>
                <div className="mb-3 flex items-center justify-between">
                  <h2 className="font-display text-lg font-bold text-white">
                    {s.title} <span className="ml-1 text-sm font-medium text-slate-500">{s.items.length}</span>
                  </h2>
                  {s.removable && (
                    <button onClick={() => removeSource(s.removable)} className="text-xs font-semibold text-slate-500 hover:text-brand-400">
                      Remove
                    </button>
                  )}
                </div>
                <Grid items={s.items} />
                {idx === 0 && <AdSlot settings={settings} className="mt-8" />}
              </section>
            ))}
          </div>
        )}
      </main>
      <Footer />
      {showAdd && <AddSource onClose={() => setShowAdd(false)} onPlay={(c) => { setShowAdd(false); play(c) }} onImport={onImport} />}
    </>
  )
}

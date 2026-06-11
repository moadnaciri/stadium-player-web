'use client'
import { useState } from 'react'
import { fetchAndParse, parsePlaylistText, buildSourceUrl, isValidUrl } from '../lib/playlist'

// Modal: add a single stream, a playlist (URL or pasted text), or a
// login-protected source. Neutral wording (no "IPTV").
export default function AddSource({ onClose, onPlay, onImport }) {
  const [tab, setTab] = useState('stream')
  const [plMode, setPlMode] = useState('url')
  const [url, setUrl] = useState('')
  const [name, setName] = useState('')
  const [paste, setPaste] = useState('')
  const [server, setServer] = useState('')
  const [user, setUser] = useState('')
  const [pass, setPass] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  const Tab = ({ id, label }) => (
    <button
      onClick={() => setTab(id)}
      className={`flex-1 rounded-lg px-3 py-2 text-sm font-bold transition ${tab === id ? 'bg-brand-500 text-white' : 'text-slate-400 hover:text-white'}`}
    >
      {label}
    </button>
  )
  const input = 'w-full rounded-xl border border-white/10 bg-ink-900/70 px-3.5 py-2.5 text-sm text-white outline-none focus:border-brand-500'

  const playStream = () => {
    setError('')
    if (!isValidUrl(url)) return setError('Enter a valid http(s) URL.')
    onPlay({ name: name.trim() || url, url: url.trim(), logo: null, group: null })
  }
  const doImport = async (channels, label) => {
    if (!channels.length) throw new Error('empty')
    onImport(label, channels)
  }
  const importPlaylist = async () => {
    setError('')
    setBusy(true)
    try {
      if (plMode === 'url') {
        if (!isValidUrl(url)) throw new Error('invalid')
        await doImport(await fetchAndParse(url), name.trim() || 'My Playlist')
      } else {
        await doImport(parsePlaylistText(paste), name.trim() || 'My List')
      }
    } catch (e) {
      setError(e.message === 'invalid' ? 'Enter a valid URL.' : 'Could not import. Check the URL/format (some sources block browsers via CORS).')
    } finally {
      setBusy(false)
    }
  }
  const connect = async () => {
    setError('')
    if (!server.trim() || !user.trim()) return setError('Server and username are required.')
    setBusy(true)
    try {
      await doImport(await fetchAndParse(buildSourceUrl(server, user, pass)), name.trim() || 'My Source')
    } catch {
      setError('Could not connect. Check the details (browsers may block some sources via CORS).')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 p-0 sm:items-center sm:p-4" onClick={onClose}>
      <div className="card w-full max-w-lg rounded-b-none p-5 sm:rounded-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-display text-lg font-bold text-white">Add content</h3>
          <button onClick={onClose} className="h-8 w-8 rounded-full text-slate-400 hover:bg-white/5">✕</button>
        </div>

        <div className="mb-4 flex gap-1 rounded-xl border border-white/10 bg-ink-900/60 p-1">
          <Tab id="stream" label="Stream" />
          <Tab id="playlist" label="Playlist" />
          <Tab id="login" label="Login" />
        </div>

        {tab === 'stream' && (
          <div className="space-y-3">
            <input className={input} value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://example.com/stream.m3u8" />
            <input className={input} value={name} onChange={(e) => setName(e.target.value)} placeholder="Name (optional)" />
            <button onClick={playStream} className="btn-primary w-full">Play now</button>
          </div>
        )}

        {tab === 'playlist' && (
          <div className="space-y-3">
            <div className="flex gap-2">
              {['url', 'paste'].map((m) => (
                <button key={m} onClick={() => setPlMode(m)} className={`flex-1 rounded-lg border px-3 py-2 text-xs font-bold ${plMode === m ? 'border-brand-500 text-brand-400' : 'border-white/10 text-slate-400'}`}>
                  {m === 'url' ? 'From URL' : 'Paste'}
                </button>
              ))}
            </div>
            {plMode === 'url' ? (
              <input className={input} value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://example.com/playlist.m3u" />
            ) : (
              <textarea className={`${input} min-h-[140px] font-mono text-xs`} value={paste} onChange={(e) => setPaste(e.target.value)} placeholder={'#EXTM3U …  or  [{"name":"…","url":"…"}]'} />
            )}
            <input className={input} value={name} onChange={(e) => setName(e.target.value)} placeholder="Name (optional)" />
            <button onClick={importPlaylist} disabled={busy} className="btn-primary w-full disabled:opacity-60">{busy ? 'Importing…' : 'Import'}</button>
          </div>
        )}

        {tab === 'login' && (
          <div className="space-y-3">
            <input className={input} value={server} onChange={(e) => setServer(e.target.value)} placeholder="Server URL (http://host:port)" />
            <input className={input} value={user} onChange={(e) => setUser(e.target.value)} placeholder="Username" />
            <input className={input} type="password" value={pass} onChange={(e) => setPass(e.target.value)} placeholder="Password" />
            <p className="text-xs text-slate-500">Saved only in your browser — never uploaded.</p>
            <button onClick={connect} disabled={busy} className="btn-primary w-full disabled:opacity-60">{busy ? 'Connecting…' : 'Connect'}</button>
          </div>
        )}

        {error && <p className="mt-3 text-sm text-brand-400">{error}</p>}
      </div>
    </div>
  )
}

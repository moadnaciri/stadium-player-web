'use client'
import { useEffect, useRef, useState } from 'react'

export default function Player({ channel, isFav, onToggleFav, onClose }) {
  const videoRef = useRef(null)
  const [status, setStatus] = useState('loading') // loading | playing | error
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    const video = videoRef.current
    if (!video || !channel?.url) return
    let hls
    let cancelled = false
    setStatus('loading')

    const onPlaying = () => !cancelled && setStatus('playing')
    const onError = () => !cancelled && setStatus('error')
    video.addEventListener('playing', onPlaying)
    video.addEventListener('error', onError)

    const url = channel.url
    const isHls = /\.m3u8(\?.*)?$/i.test(url)
    const canNativeHls = video.canPlayType('application/vnd.apple.mpegurl')

    ;(async () => {
      try {
        if (isHls && !canNativeHls) {
          const Hls = (await import('hls.js')).default
          if (cancelled) return
          if (Hls.isSupported()) {
            hls = new Hls({ enableWorker: true, lowLatencyMode: true })
            hls.loadSource(url)
            hls.attachMedia(video)
            hls.on(Hls.Events.MANIFEST_PARSED, () => video.play().catch(() => {}))
            hls.on(Hls.Events.ERROR, (_e, data) => {
              if (data?.fatal) setStatus('error')
            })
            return
          }
        }
        // Native playback (mp4, webm, or Safari HLS)
        video.src = url
        video.play().catch(() => {})
      } catch {
        if (!cancelled) setStatus('error')
      }
    })()

    return () => {
      cancelled = true
      video.removeEventListener('playing', onPlaying)
      video.removeEventListener('error', onError)
      if (hls) hls.destroy()
      try {
        video.removeAttribute('src')
        video.load()
      } catch {
        /* noop */
      }
    }
  }, [channel?.url, attempt])

  return (
    <div className="card overflow-hidden">
      <div className="relative aspect-video w-full bg-black">
        {status === 'error' ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
            <div className="mb-3 text-4xl">📡</div>
            <p className="text-lg font-bold text-white">Stream Offline or Unsupported</p>
            <p className="mt-1 max-w-sm text-sm text-slate-400">
              This stream couldn’t be played. It may be offline, removed, region-blocked, or in a format your browser
              doesn’t support.
            </p>
            <button onClick={() => setAttempt((a) => a + 1)} className="btn-primary mt-4">
              ↻ Retry
            </button>
          </div>
        ) : null}
        <video
          ref={videoRef}
          className="h-full w-full"
          controls
          autoPlay
          playsInline
          style={{ display: status === 'error' ? 'none' : 'block' }}
        />
        {status === 'loading' && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-white/20 border-t-brand-500" />
          </div>
        )}
      </div>

      <div className="flex items-center justify-between gap-3 px-4 py-3">
        <div className="min-w-0">
          <p className="truncate font-semibold text-white">{channel?.name}</p>
          {channel?.group && <p className="truncate text-xs text-slate-500">{channel.group}</p>}
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <button
            onClick={onToggleFav}
            className="rounded-lg border border-white/10 px-3 py-1.5 text-sm"
            title="Favorite"
          >
            <span className={isFav ? 'text-gold' : 'text-slate-400'}>{isFav ? '★' : '☆'}</span>
          </button>
          {onClose && (
            <button onClick={onClose} className="rounded-lg border border-white/10 px-3 py-1.5 text-sm text-slate-300 hover:bg-white/5">
              Close
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

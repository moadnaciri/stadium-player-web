'use client'
import { useEffect, useRef } from 'react'

// Google AdSense display unit. Renders nothing unless web ads are enabled and
// a publisher id + slot are configured in the admin dashboard.
export default function AdSlot({ settings, className }) {
  const pushed = useRef(false)
  const enabled = settings?.web_ads_enabled !== false
  const client = settings?.adsense_client
  const slot = settings?.adsense_slot

  useEffect(() => {
    if (!enabled || !client || !slot || pushed.current) return
    const id = 'adsbygoogle-js'
    if (!document.getElementById(id)) {
      const s = document.createElement('script')
      s.id = id
      s.async = true
      s.crossOrigin = 'anonymous'
      s.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${client}`
      document.head.appendChild(s)
    }
    try {
      ;(window.adsbygoogle = window.adsbygoogle || []).push({})
      pushed.current = true
    } catch {
      /* ignore */
    }
  }, [enabled, client, slot])

  if (!enabled || !client || !slot) return null
  return (
    <div className={`overflow-hidden rounded-2xl border border-white/5 ${className || ''}`}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block', minHeight: 90 }}
        data-ad-client={client}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  )
}

'use client'
import { useEffect, useState } from 'react'
import Logo from './Logo'
import { Promo } from '../lib/storage'
import { SITE } from '../siteConfig'

// Encourages installing the Android app. Hidden if the admin disabled it
// (settings.show_app_promo) or the user dismissed it.
export default function AppPromo({ show }) {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    setVisible(show !== false && !Promo.dismissed())
  }, [show])
  if (!visible) return null
  return (
    <div className="card relative mb-6 flex items-center gap-4 p-4 sm:p-5">
      <Logo size={48} />
      <div className="min-w-0 flex-1">
        <p className="font-display text-sm font-bold text-white sm:text-base">Get the StadiumPlayer app</p>
        <p className="text-xs text-slate-400 sm:text-sm">A smoother, full-screen experience on Android — favorites, background play, and more.</p>
      </div>
      <a href={SITE.playStoreUrl} target="_blank" rel="noopener noreferrer" className="btn-primary shrink-0">
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M3.6 2.3 13 12 3.6 21.7c-.4-.2-.6-.6-.6-1V3.3c0-.4.2-.8.6-1zM14.7 13.7l2.8 2.8-9.8 5.6 7-8.4zm0-3.4-7-8.4 9.8 5.6-2.8 2.8zM18.6 9.4l2.8 1.6c.7.4.7 1.6 0 2l-2.8 1.6-3-2.6 3-2.6z" /></svg>
        <span className="hidden sm:inline">Get the app</span>
      </a>
      <button
        onClick={() => {
          Promo.dismiss()
          setVisible(false)
        }}
        className="absolute right-2 top-2 h-7 w-7 rounded-full text-slate-500 hover:bg-white/5 hover:text-white"
        aria-label="Dismiss"
      >
        ✕
      </button>
    </div>
  )
}

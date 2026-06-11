import Link from 'next/link'
import { SITE } from '../siteConfig'

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-white/5">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-md text-xs leading-relaxed text-slate-500">
            StadiumPlayer is a media player only. It does not contain, provide, or endorse any playlists or copyrighted
            streams. You are solely responsible for the content you play.
          </p>
          <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-300">
            <Link href="/privacy" className="hover:text-white">Privacy</Link>
            <Link href="/terms" className="hover:text-white">Terms</Link>
            <Link href="/disclaimer" className="hover:text-white">Disclaimer</Link>
            <a href={`mailto:${SITE.email}`} className="hover:text-white">Contact</a>
            <a href={SITE.web} className="hover:text-white">stadiumplayer.club</a>
          </div>
        </div>
        <div className="mt-6 text-xs text-slate-600">© {new Date().getFullYear()} StadiumPlayer. All rights reserved.</div>
      </div>
    </footer>
  )
}

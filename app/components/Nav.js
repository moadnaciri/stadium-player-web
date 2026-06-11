import Link from 'next/link'
import Logo from './Logo'
import { SITE } from '../siteConfig'

export default function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/5 bg-ink-900/80 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <Logo size={34} />
          <span className="font-display text-base font-bold tracking-tight text-white">
            Stadium<span className="text-brand-500">Player</span>
          </span>
        </Link>
        <a
          href={SITE.playStoreUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg bg-brand-500 px-3.5 py-2 text-xs font-bold text-white transition hover:bg-brand-600 sm:text-sm"
        >
          Get the app
        </a>
      </nav>
    </header>
  )
}

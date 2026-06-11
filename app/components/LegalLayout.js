import Nav from './Nav'
import Footer from './Footer'
import { SITE } from '../siteConfig'

export default function LegalLayout({ title, intro, children }) {
  return (
    <>
      <Nav />
      <main className="mx-auto max-w-prose px-4 py-12 sm:px-6">
        <p className="text-sm font-semibold text-brand-400">Legal</p>
        <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">{title}</h1>
        <p className="mt-3 text-sm text-slate-500">Last updated: June 11, 2026</p>
        {intro && <p className="mt-6 leading-relaxed text-slate-300">{intro}</p>}
        <div className="legal mt-8">{children}</div>
      </main>
      <Footer />
    </>
  )
}

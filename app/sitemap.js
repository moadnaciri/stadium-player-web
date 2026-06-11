import { SITE } from './siteConfig'
export default function sitemap() {
  return ['', '/privacy', '/terms', '/disclaimer'].map((p) => ({
    url: `${SITE.url}${p}`,
    lastModified: new Date(),
    changeFrequency: p === '' ? 'weekly' : 'monthly',
    priority: p === '' ? 1 : 0.6,
  }))
}

import { SITE } from './siteConfig'
export default function robots() {
  return { rules: { userAgent: '*', allow: '/' }, sitemap: `${SITE.url}/sitemap.xml` }
}

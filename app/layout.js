import './globals.css'
import { SITE } from './siteConfig'

export const metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: 'StadiumPlayer Web — Play your streams in the browser',
    template: '%s · StadiumPlayer',
  },
  description:
    'StadiumPlayer Web is a free, privacy-first media player in your browser. Play your own .m3u8 / .mp4 streams and playlists on phone or desktop. No content included.',
  applicationName: 'StadiumPlayer',
  keywords: ['StadiumPlayer', 'web media player', 'm3u8 player online', 'mp4 player', 'hls player', 'browser media player'],
  alternates: { canonical: SITE.url },
  icons: { icon: '/stadium-logo.png', apple: '/stadium-logo.png' },
  openGraph: {
    title: 'StadiumPlayer Web — Play your streams in the browser',
    description: 'A free, privacy-first browser media player. Bring your own streams.',
    url: SITE.url,
    siteName: 'StadiumPlayer',
    type: 'website',
    images: [{ url: '/stadium-logo.png', width: 750, height: 732, alt: 'StadiumPlayer' }],
  },
  twitter: { card: 'summary_large_image', title: 'StadiumPlayer Web', description: 'A free, privacy-first browser media player.' },
}

export const viewport = { themeColor: '#101010', width: 'device-width', initialScale: 1 }

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Space+Grotesk:wght@500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans">{children}</body>
    </html>
  )
}

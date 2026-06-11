import LegalLayout from '../components/LegalLayout'
import { SITE } from '../siteConfig'

export const metadata = { title: 'Content Disclaimer', description: 'StadiumPlayer Web contains no content and is a media player only.' }

export default function Disclaimer() {
  return (
    <LegalLayout title="Content Disclaimer & Copyright Policy" intro="This page describes the content-free nature of StadiumPlayer Web and how to report a copyright concern.">
      <h2>1. The Site contains no content</h2>
      <p>
        StadiumPlayer Web is a media player only. <strong>It does not contain, provide, host, store, index, or endorse any
        playlists, channels, or copyrighted streams.</strong> It plays only media that an individual user voluntarily
        supplies by entering a URL or importing a playlist they already possess.
      </p>

      <h2>2. User responsibility</h2>
      <p>Users are solely responsible for the content they choose to play and for ensuring they have the right to access it. We do not monitor or control user-supplied URLs or playlists.</p>

      <h2>3. No affiliation</h2>
      <p>StadiumPlayer is not affiliated with, endorsed by, or sponsored by any content provider, broadcaster, network, or rights holder. Trademarks in user-supplied content belong to their respective owners.</p>

      <h2>4. No storage or redistribution</h2>
      <p>The Site does not download, record, cache for redistribution, or rebroadcast media. Playback is transient and happens in your browser. Your playlists and credentials are never sent to us.</p>

      <h2>5. Copyright / DMCA notices</h2>
      <p>
        Because the Site hosts no content, there is generally nothing on our side to remove. We nonetheless respect
        intellectual-property rights. To raise a concern, email <a href={`mailto:${SITE.email}`}>{SITE.email}</a> with your
        contact details, identification of the work, a description of the concern, a good-faith statement, and your
        signature. We review valid notices promptly.
      </p>

      <h2>6. Contact</h2>
      <p>Email: <a href={`mailto:${SITE.email}`}>{SITE.email}</a> · Website: <a href={SITE.web}>stadiumplayer.club</a></p>
    </LegalLayout>
  )
}

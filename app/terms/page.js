import LegalLayout from '../components/LegalLayout'
import { SITE } from '../siteConfig'

export const metadata = { title: 'Terms of Service', description: 'Terms governing use of the StadiumPlayer web app.' }

export default function Terms() {
  return (
    <LegalLayout
      title="Terms of Service"
      intro="These Terms govern your use of the StadiumPlayer web app. By using it, you agree to them. If you do not agree, do not use the Site."
    >
      <h2>1. A media player only</h2>
      <p>
        StadiumPlayer is a general-purpose media player. <strong>It does not contain, provide, host, index, or endorse any
        media content, playlists, channels, or streams.</strong> It plays only the content you choose to add by entering a
        URL or importing a playlist you already possess and are authorized to use.
      </p>

      <h2>2. Your responsibilities</h2>
      <ul>
        <li>Play only content you own, have licensed, or are legally authorized to access.</li>
        <li>Comply with all applicable laws, including copyright and intellectual-property laws.</li>
        <li>You bear all responsibility for the URLs, playlists, and credentials you provide.</li>
      </ul>

      <h2>3. Prohibited use</h2>
      <p>Do not use the Site for unlawful or infringing purposes, to violate others’ rights, or to interfere with the Site or its infrastructure.</p>

      <h2>4. Third-party content</h2>
      <p>Streams you play are provided by third parties or by you and are not under our control. We are not responsible for their legality, accuracy, or availability. Use is at your own risk.</p>

      <h2>5. Advertising</h2>
      <p>The Site is free and supported by advertising (Google AdSense). By using it, you agree ads may be displayed.</p>

      <h2>6. Disclaimer of warranties</h2>
      <p>THE SITE IS PROVIDED “AS IS” WITHOUT WARRANTIES OF ANY KIND. We do not warrant that it will be uninterrupted, error-free, or that any particular stream will play.</p>

      <h2>7. Limitation of liability</h2>
      <p>TO THE MAXIMUM EXTENT PERMITTED BY LAW, WE ARE NOT LIABLE FOR ANY INDIRECT, INCIDENTAL, OR CONSEQUENTIAL DAMAGES ARISING FROM YOUR USE OF (OR INABILITY TO USE) THE SITE OR ANY CONTENT ACCESSED THROUGH IT.</p>

      <h2>8. Changes & contact</h2>
      <p>We may revise these Terms; the current version lives at <a href={`${SITE.url}/terms`}>{SITE.domain}/terms</a>. Questions: <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.</p>
    </LegalLayout>
  )
}

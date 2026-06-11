import LegalLayout from '../components/LegalLayout'
import { SITE } from '../siteConfig'

export const metadata = {
  title: 'Privacy Policy',
  description: 'How StadiumPlayer Web handles data: browser-only storage, Google AdSense, and cookies.',
}

export default function Privacy() {
  return (
    <LegalLayout
      title="Privacy Policy"
      intro={`This Privacy Policy explains how the StadiumPlayer web app ("the Site", "we") handles information when you use it at ${SITE.domain}. We are committed to protecting your privacy.`}
    >
      <h2>1. Summary</h2>
      <p>
        StadiumPlayer Web is a media player only. <strong>We do not require an account and do not upload your media
        data.</strong> The stream URLs, playlists, source logins, favorites, and history you create are stored
        <strong> only in your browser</strong> (localStorage) and are never sent to us.
      </p>

      <h2>2. Information stored in your browser</h2>
      <ul>
        <li>Stream URLs and playlists you add or import.</li>
        <li>Source addresses and any login credentials you enter — kept only in your browser and sent solely to the source server you specify, never to us.</li>
        <li>Favorites and recently watched.</li>
        <li>Whether you dismissed the “Get the app” banner.</li>
      </ul>
      <p>Clearing your browser data removes all of the above.</p>

      <h2>3. Configuration data we read</h2>
      <p>
        The Site reads a small, non-personal configuration record (ad settings and the channel list) from our backend
        (Supabase) to display content. This is a one-way read; no personal data is sent from your browser to it. As with
        any web request, hosting/CDN providers may process your IP address transiently to deliver responses.
      </p>

      <h2>4. Advertising — Google AdSense</h2>
      <p>
        We display ads using <strong>Google AdSense</strong>. Google and its partners may use cookies and similar
        technologies to serve and measure ads, including based on your prior visits to this and other websites. Google’s
        use of advertising cookies enables it and its partners to serve ads to you based on your visits.
      </p>
      <ul>
        <li>
          You can manage ad personalization at{' '}
          <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer">Google Ads Settings</a>.
        </li>
        <li>
          Learn how Google uses data:{' '}
          <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer">
            google.com/technologies/partner-sites
          </a>.
        </li>
        <li>Opt out of third-party ad cookies at <a href="https://www.aboutads.info" target="_blank" rel="noopener noreferrer">aboutads.info</a>.</li>
      </ul>

      <h2>5. Cookies</h2>
      <p>
        We do not set our own tracking cookies. Cookies on this Site come from Google AdSense for advertising purposes, as
        described above. You can control cookies in your browser settings.
      </p>

      <h2>6. Children’s privacy</h2>
      <p>The Site is not directed to children under 13 and we do not knowingly collect personal information from children.</p>

      <h2>7. Your rights</h2>
      <p>
        Because we do not store personal data about you on our servers, we generally hold no personal information to
        access or delete. For data processed by Google AdSense, exercise your rights via Google’s tools above. Questions:{' '}
        <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
      </p>

      <h2>8. Changes</h2>
      <p>We may update this policy; the “Last updated” date will change. Continued use means acceptance.</p>

      <h2>9. Contact</h2>
      <p>Email: <a href={`mailto:${SITE.email}`}>{SITE.email}</a> · Website: <a href={SITE.web}>stadiumplayer.club</a></p>
    </LegalLayout>
  )
}

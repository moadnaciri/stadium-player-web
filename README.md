# StadiumPlayer — Web App (Next.js)

A responsive, SEO-friendly browser media player at **app.stadiumplayer.club**. Mirrors the
mobile app: plays the user's own `.m3u8` / `.mp4` streams and `.m3u`/`.json` playlists,
shows the same admin-curated channels from Supabase, with search, favorites and recently
watched stored **only in the browser**. Monetized with **Google AdSense**. Includes a
dismissible "Get the Android app" banner.

## Commands
```bash
npm install
npm run dev      # http://localhost:3000
npm run deploy   # static build + firebase deploy (site: stadiumplayer-app, project: stadium-player)
```

## How it's wired
- **Channels & settings** come from the same Supabase `app_settings` + `channels` tables as
  the dashboard/mobile app. It honors `channels_enabled`, `channels_all_languages`,
  `channels_show_all`, and per-channel language targeting (by browser language).
- **Ads**: controlled from the dashboard **Web App** tab — `web_ads_enabled`,
  `adsense_client` (ca-pub-…), `adsense_slot`.
- **App promo**: shown unless the dashboard `show_app_promo` is off or the user dismisses it;
  the button opens the Play Store listing.
- Tech: `hls.js` for HLS playback, native `<video>` for MP4/etc.

## Required before AdSense serves
1. Get your site approved in AdSense and create a display ad unit.
2. Set the **Publisher ID** + **Ad slot** in the dashboard → Web App tab.
3. **Add `public/ads.txt`** containing your line, e.g.:
   `google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0`
   (AdSense requires ads.txt at the domain root for ads to serve.)

## Deploy + domain
`npm run deploy` publishes to the `stadiumplayer-app` Hosting site on the `stadium-player`
Firebase project. In the Firebase console, add the custom domain **app.stadiumplayer.club**
to that site.

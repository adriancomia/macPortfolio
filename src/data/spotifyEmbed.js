// EDIT ME: paste a single song link for the desktop widget (quick glance).
// In the Spotify app: right-click a song → Share → Copy Song Link.
export const WIDGET_TRACK_LINK = 'https://open.spotify.com/track/2LMkwUfqC6S6s6qDVlEuzV?si=492158e2c10d470b'

// EDIT ME: paste a playlist (or album) link for the full app window.
// Right-click a playlist → Share → Copy Link to Playlist.
export const APP_PLAYLIST_LINK = 'https://open.spotify.com/album/3mH6qwIy9crq0I9YQbOuDf?si=71df23d9ebdc45f5'

function toEmbedUrl(link) {
  return `${link.replace('open.spotify.com/', 'open.spotify.com/embed/')}?utm_source=generator&theme=0`
}

export function getWidgetEmbedUrl() {
  return toEmbedUrl(WIDGET_TRACK_LINK)
}

export function getAppEmbedUrl() {
  return toEmbedUrl(APP_PLAYLIST_LINK)
}
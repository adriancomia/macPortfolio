import { getAppEmbedUrl } from '../../data/spotifyEmbed.js'

export default function SpotifyApp() {
  return (
    <div className="spotify-embed-app">
<iframe
        src={getAppEmbedUrl()}
        width="100%"
        height="100%"
        frameBorder="0"
        scrolling="no"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        title="Spotify playlist"
      />      <p className="spotify-embed-note">
        No Spotify account needed — if you have Premium and are logged in
        elsewhere in your browser, it'll play in full.
      </p>
    </div>
  )
}
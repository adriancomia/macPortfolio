import { getWidgetEmbedUrl } from '../data/spotifyEmbed.js'

export default function SpotifyWidget() {
  return (
    <div className="widget spotify-widget-embed">
    <iframe
        src={getWidgetEmbedUrl()}
        width="100%"
        height="180"
        frameBorder="0"
        scrolling="no"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        title="Spotify player"
      />    </div>
  )
}
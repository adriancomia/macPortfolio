import { getWidgetEmbedUrl, getTrackEmbedUrl } from '../data/spotifyEmbed.js'
import { useNowPlayingTrack } from '../lib/nowPlayingStore.js'

export default function SpotifyWidget() {
  const trackId = useNowPlayingTrack()
  const src = trackId ? getTrackEmbedUrl(trackId) : getWidgetEmbedUrl()

  return (
    <div className="widget spotify-widget-embed">
      <iframe
        key={src}
        src={src}
        width="100%"
        height="180"
        frameBorder="0"
        scrolling="no"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        title="Spotify now playing"
      />
    </div>
  )
}
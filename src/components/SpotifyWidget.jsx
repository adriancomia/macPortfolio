import { useSpotify } from "../context/SpotifyContext.jsx";

export default function SpotifyWidget() {
  const sp = useSpotify()
  if (!sp.connected || !sp.track) return null
  return (
    <div className="widget spotify-widget">
      <img src={sp.track.album.images[0]?.url} alt="" />
      <div className="spotify-widget-text">
        <span className="spotify-widget-title">{sp.track.name}</span>
        <span className="spotify-widget-artist">{sp.track.artists[0]?.name}</span>
      </div>
      <button onClick={sp.togglePlay}>{sp.isPaused ? '▶' : '⏸'}</button>
    </div>
  )
}
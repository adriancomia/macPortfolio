import { useState } from 'react'
import { getAppEmbedUrl, getTrackEmbedUrl } from '../../data/spotifyEmbed.js'
import { SearchIcon } from '../Icons.jsx'

export default function SpotifyApp() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [selectedTrack, setSelectedTrack] = useState(null)

  async function handleSubmit(e) {
    e.preventDefault()
    if (!query.trim()) return
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`/api/spotify-search?q=${encodeURIComponent(query)}`)
      const data = await res.json()
      if (data.error) throw new Error(data.error)
      setResults(data.tracks)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const embedUrl = selectedTrack ? getTrackEmbedUrl(selectedTrack) : getAppEmbedUrl()

  return (
    <div className="spotify-embed-app">
      <form className="spotify-search" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search a song or artist"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit"><SearchIcon size={14} /></button>
      </form>

      {error && <p className="spotify-search-error">{error}</p>}

      {results.length > 0 && (
        <div className="spotify-results">
          {selectedTrack && (
            <button className="spotify-back-to-playlist" onClick={() => setSelectedTrack(null)}>
              ← Back to playlist
            </button>
          )}
          {results.map((t) => (
            <button key={t.id} className="spotify-result-row" onClick={() => setSelectedTrack(t.id)}>
              <img src={t.image} alt="" />
              <span className="spotify-result-text">
                <span className="spotify-result-title">{t.name}</span>
                <span className="spotify-result-artist">{t.artists}</span>
              </span>
            </button>
          ))}
        </div>
      )}

      <iframe
        key={embedUrl}
        src={embedUrl}
        width="100%"
        height="100%"
        frameBorder="0"
        scrolling="no"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        title="Spotify player"
      />
      {loading && <p className="spotify-embed-note">Searching…</p>}
    </div>
  )
}
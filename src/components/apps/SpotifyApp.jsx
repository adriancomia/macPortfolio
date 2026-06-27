import { useState, useEffect, useCallback } from 'react'
import { getTrackEmbedUrl } from '../../data/spotifyEmbed.js'
import { SearchIcon } from '../Icons.jsx'
import { setNowPlayingTrack } from '../../lib/nowPlayingStore.js'

const GENRES = ['Hip-Hop', 'Pop', 'R&B', 'Chill', 'OPM']

async function fetchTracks(query, limit = 8) {
  const res = await fetch(`/api/spotify-search?q=${encodeURIComponent(query)}&limit=${limit}`)
  const data = await res.json()
  if (data.error) throw new Error(data.error)
  return data.tracks || []
}

export default function SpotifyApp() {
  const [query, setQuery] = useState('')
  const [searchResults, setSearchResults] = useState(null)
  const [sections, setSections] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedTrack, setSelectedTrack] = useState(null)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    Promise.all(GENRES.map((g) => fetchTracks(g, 6).then((tracks) => ({ label: g, tracks }))))
      .then((data) => { if (!cancelled) setSections(data.filter((s) => s.tracks.length)) })
      .catch((err) => { if (!cancelled) setError(err.message) })
      .finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [])

  const handleSearch = useCallback(async (e) => {
    e.preventDefault()
    if (!query.trim()) { setSearchResults(null); return }
    setLoading(true)
    setError(null)
    try {
      const tracks = await fetchTracks(query, 14)
      setSearchResults(tracks)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [query])

  function clearSearch() {
    setQuery('')
    setSearchResults(null)
  }

  return (
    <div className="spotify-home">
      <form className="spotify-search" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="What do you want to listen to?"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit"><SearchIcon size={14} /></button>
      </form>

      {selectedTrack && (
        <div className="spotify-now-playing-bar">
          <iframe
            src={getTrackEmbedUrl(selectedTrack)}
            width="100%"
            height="80"
            frameBorder="0"
            scrolling="no"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            title="Now playing"
          />
        </div>
      )}

      <div className="spotify-scroll">
        {error && <p className="spotify-search-error">{error}</p>}
        {loading && <p className="spotify-embed-note">Loading…</p>}

        {searchResults ? (
          <>
            <div className="spotify-section-header">
              <span>Results for "{query}"</span>
              <button className="spotify-clear-search" onClick={clearSearch}>Clear</button>
            </div>
            {searchResults.map((t) => (
              <button key={t.id} className="spotify-result-row" onClick={() => { setSelectedTrack(t.id); setNowPlayingTrack(t.id) }}>
                <img src={t.image} alt="" />
                <span className="spotify-result-text">
                  <span className="spotify-result-title">{t.name}</span>
                  <span className="spotify-result-artist">{t.artists}</span>
                </span>
              </button>
            ))}
          </>
        ) : (
          sections.map((section) => (
            <div key={section.label} className="spotify-section">
              <div className="spotify-section-header"><span>{section.label}</span></div>
              {section.tracks.map((t) => (
                <button key={t.id} className="spotify-result-row" onClick={() => { setSelectedTrack(t.id); setNowPlayingTrack(t.id) }}>
                  <img src={t.image} alt="" />
                  <span className="spotify-result-text">
                    <span className="spotify-result-title">{t.name}</span>
                    <span className="spotify-result-artist">{t.artists}</span>
                  </span>
                </button>
              ))}
            </div>
          ))
        )}
      </div>
    </div>
  )
}
import { useState, useEffect, useCallback } from 'react'
import { getTrackEmbedUrl } from '../../data/spotifyEmbed.js'
import { SearchIcon } from '../Icons.jsx'
import { setNowPlayingTrack, useNowPlayingTrack } from '../../lib/nowPlayingStore.js'

const GENRES = ['Hip-Hop', 'Pop', 'R&B', 'Chill', 'OPM']

async function fetchTracks(query, limit = 8) {
  const res = await fetch(`/api/spotify-search?q=${encodeURIComponent(query)}&limit=${limit}`)
  const data = await res.json()
  if (data.error) throw new Error(data.error)
  return data.tracks || []
}

function TrackCard({ track, active, onClick }) {
  return (
    <button className={`spotify-card ${active ? 'is-active' : ''}`} onClick={onClick}>
      <div className="spotify-card-art"><img src={track.image} alt="" /></div>
      <span className="spotify-card-title">{track.name}</span>
      <span className="spotify-card-artist">{track.artists}</span>
    </button>
  )
}

export default function SpotifyApp() {
  const [query, setQuery] = useState('')
  const [searchResults, setSearchResults] = useState(null)
  const [sections, setSections] = useState([])
  const [activeGenre, setActiveGenre] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const nowPlaying = useNowPlayingTrack()

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    Promise.all(GENRES.map((g) => fetchTracks(g, 8).then((tracks) => ({ label: g, tracks }))))
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
      const tracks = await fetchTracks(query, 16)
      setActiveGenre(null)
      setSearchResults(tracks)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [query])

  function selectSidebar(genre) {
    setSearchResults(null)
    setQuery('')
    setActiveGenre(genre)
  }

  let gridSections
  if (searchResults) {
    gridSections = [{ label: `Results for "${query}"`, tracks: searchResults, isSearch: true }]
  } else if (activeGenre) {
    const sec = sections.find((s) => s.label === activeGenre)
    gridSections = sec ? [sec] : []
  } else {
    gridSections = sections
  }

  return (
    <div className="spotify-shell">
      <div className="spotify-shell-row">
        <div className="spotify-sidebar">
          <button className={`spotify-sidebar-item ${!activeGenre && !searchResults ? 'is-active' : ''}`} onClick={() => selectSidebar(null)}>
             Home
          </button>
          <div className="spotify-sidebar-label">Browse</div>
          {GENRES.map((g) => (
            <button key={g} className={`spotify-sidebar-item ${activeGenre === g ? 'is-active' : ''}`} onClick={() => selectSidebar(g)}>
              {g}
            </button>
          ))}
        </div>

        <div className="spotify-main">
          <form className="spotify-search" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="What do you want to play?"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button type="submit"><SearchIcon size={14} /></button>
          </form>

          <div className="spotify-scroll">
            {error && <p className="spotify-search-error">{error}</p>}
            {loading && <p className="spotify-embed-note">Loading…</p>}

            {gridSections.map((section) => (
              <div key={section.label} className="spotify-grid-section">
                <div className="spotify-section-header">
                  <span>{section.label}</span>
                  {section.isSearch && (
                    <button className="spotify-clear-search" onClick={() => selectSidebar(null)}>Clear</button>
                  )}
                </div>
                <div className="spotify-card-grid">
                  {section.tracks.map((t) => (
                    <TrackCard key={t.id} track={t} active={nowPlaying === t.id} onClick={() => setNowPlayingTrack(t.id)} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {nowPlaying && (
        <div className="spotify-bottom-bar">
          <iframe
            key={nowPlaying}
            src={getTrackEmbedUrl(nowPlaying)}
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
    </div>
  )
}
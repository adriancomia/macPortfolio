import { useState, useEffect, useCallback } from 'react'
import { YOUTUBE_API_KEY } from '../../data/youtubeConfig.js'
import { SearchIcon, BackArrowIcon } from '../Icons.jsx'

export default function YoutubeApp() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeVideo, setActiveVideo] = useState(null)

  const runSearch = useCallback(async (q) => {
    setLoading(true)
    setError(null)
    try {
      const url = q
        ? `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=16&q=${encodeURIComponent(q)}&key=${YOUTUBE_API_KEY}`
        : `https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=16&key=${YOUTUBE_API_KEY}`
      const res = await fetch(url)
      const data = await res.json()
      if (data.error) throw new Error(data.error.message)
      const items = (data.items || []).map((item) => ({
        id: typeof item.id === 'string' ? item.id : item.id.videoId,
        title: item.snippet.title,
        channel: item.snippet.channelTitle,
        thumbnail: item.snippet.thumbnails?.medium?.url || item.snippet.thumbnails?.default?.url,
      }))
      setResults(items)
    } catch (err) {
      setError(err.message || 'Something went wrong loading videos.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { runSearch('') }, [runSearch])

  function handleSubmit(e) {
    e.preventDefault()
    runSearch(query)
  }

  return (
    <div className="yt-app">
      <div className="yt-toolbar">
<span className="yt-logo">
          <img src="/icons/ytlogo.png" alt="" />
          <span className="yt-logo-text">YouTube</span>
        </span> <form onSubmit={handleSubmit} className="yt-search">
          <input
            type="text"
            placeholder="Search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit"><SearchIcon size={15} /></button>
        </form>
      </div>

      {activeVideo ? (
        <div className="yt-player">
        <button className="yt-back" onClick={() => setActiveVideo(null)}>
            <BackArrowIcon size={13} /> Go Back
          </button>          <div className="yt-player-frame">
            <iframe
              src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1`}
              title="YouTube video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      ) : (
        <div className="yt-grid">
          {loading && <p className="yt-status">Loading videos…</p>}
          {error && <p className="yt-status yt-error">{error}</p>}
          {!loading && !error && results.length === 0 && <p className="yt-status">No results.</p>}
          {!loading && !error && results.map((v) => (
            <button key={v.id} className="yt-card" onClick={() => setActiveVideo(v.id)}>
              <img src={v.thumbnail} alt="" />
              <div className="yt-card-info">
                <span className="yt-card-title">{v.title}</span>
                <span className="yt-card-channel">{v.channel}</span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
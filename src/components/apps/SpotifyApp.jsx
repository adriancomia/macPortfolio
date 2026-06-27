import { useSpotify } from '../../context/SpotifyContext.jsx'

function formatTime(ms) {
  const totalSec = Math.floor(ms / 1000)
  return `${Math.floor(totalSec / 60)}:${(totalSec % 60).toString().padStart(2, '0')}`
}

export default function SpotifyApp() {
  const sp = useSpotify()

  if (!sp.connected) {
    return (
      <div className="spotify-app spotify-login">
        <div className="spotify-login-logo">♪</div>
        <h2>Connect Spotify</h2>
        <p>Log in with your Spotify Premium account to play music right here.</p>
        {sp.error && <p className="spotify-error">{sp.error}</p>}
        <button className="spotify-connect-btn" onClick={sp.connect}>Connect to Spotify</button>
      </div>
    )
  }
  if (sp.connecting) return <div className="spotify-app spotify-login"><p>Connecting…</p></div>
  if (!sp.track) {
    return (
      <div className="spotify-app spotify-login">
        <p>Connected! Click below to start playing here (or pick "Adrian's Portfolio Player" from your Spotify app's device list).</p>
        <button className="spotify-connect-btn" onClick={sp.activateHere} disabled={!sp.deviceId}>
          {sp.deviceId ? 'Play here' : 'Preparing player…'}
        </button>
        <button className="spotify-disconnect-btn" onClick={sp.disconnect}>Disconnect</button>
      </div>
    )
  }

  const progressPct = sp.duration ? (sp.position / sp.duration) * 100 : 0
  return (
    <div className="spotify-app">
      <div className="spotify-now-playing">
        <img src={sp.track.album.images[0]?.url} alt="" className="spotify-art" />
        <div className="spotify-meta">
          <span className="spotify-title">{sp.track.name}</span>
          <span className="spotify-artist">{sp.track.artists.map((a) => a.name).join(', ')}</span>
        </div>
      </div>
      <div className="spotify-progress">
        <span>{formatTime(sp.position)}</span>
        <div className="spotify-bar"><div className="spotify-bar-fill" style={{ width: `${progressPct}%` }} /></div>
        <span>{formatTime(sp.duration)}</span>
      </div>
      <div className="spotify-controls">
        <button onClick={sp.previousTrack}>⏮</button>
        <button className="spotify-play-btn" onClick={sp.togglePlay}>{sp.isPaused ? '▶' : '⏸'}</button>
        <button onClick={sp.nextTrack}>⏭</button>
      </div>
      <button className="spotify-disconnect-btn" onClick={sp.disconnect}>Disconnect</button>
    </div>
  )
}
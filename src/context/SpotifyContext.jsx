import { createContext, useContext, useEffect, useRef, useState, useCallback } from 'react'
import {
  redirectToSpotifyLogin, getStoredTokens, exchangeCodeForTokens,
  getValidAccessToken, extractCodeFromUrl, logoutSpotify,
} from '../lib/spotifyAuth.js'

const SpotifyCtx = createContext(null)

function loadSdkScript() {
  return new Promise((resolve) => {
    if (window.Spotify) return resolve(window.Spotify)
    const script = document.createElement('script')
    script.src = 'https://sdk.scdn.co/spotify-player.js'
    script.async = true
    document.body.appendChild(script)
    window.onSpotifyWebPlaybackSDKReady = () => resolve(window.Spotify)
  })
}

export function SpotifyProvider({ children }) {
  const [connected, setConnected] = useState(!!getStoredTokens())
  const [connecting, setConnecting] = useState(false)
  const [deviceId, setDeviceId] = useState(null)
  const [track, setTrack] = useState(null)
  const [isPaused, setIsPaused] = useState(true)
  const [position, setPosition] = useState(0)
  const [duration, setDuration] = useState(0)
  const [error, setError] = useState(null)
  const playerRef = useRef(null)

  useEffect(() => {
    const code = extractCodeFromUrl()
    if (code) {
      setConnecting(true)
      exchangeCodeForTokens(code).then(() => setConnected(true)).catch((e) => setError(e.message)).finally(() => setConnecting(false))
    }
  }, [])

  useEffect(() => {
    if (!connected) return
    let player, poll
    loadSdkScript().then((Spotify) => {
      player = new Spotify.Player({
        name: "Adrian's Portfolio Player",
        getOAuthToken: (cb) => { getValidAccessToken().then((t) => t && cb(t)) },
        volume: 0.5,
      })
      playerRef.current = player
      player.addListener('ready', ({ device_id }) => setDeviceId(device_id))
      player.addListener('not_ready', () => setDeviceId(null))
      player.addListener('player_state_changed', (state) => {
        if (!state) return
        setTrack(state.track_window.current_track)
        setIsPaused(state.paused)
        setPosition(state.position)
        setDuration(state.duration)
      })
      player.addListener('authentication_error', () => setError('Spotify session expired — please reconnect.'))
      player.connect()
      poll = setInterval(() => { player.getCurrentState().then((s) => s && setPosition(s.position)) }, 1000)
    })
    return () => { if (poll) clearInterval(poll); if (player) player.disconnect() }
  }, [connected])

  const connect = useCallback(() => { redirectToSpotifyLogin() }, [])
  const disconnect = useCallback(() => {
    logoutSpotify()
    if (playerRef.current) playerRef.current.disconnect()
    setConnected(false)
    setTrack(null)
  }, [])
  const activateHere = useCallback(async () => {
    if (!deviceId) return
    const token = await getValidAccessToken()
    await fetch('https://api.spotify.com/v1/me/player', {
      method: 'PUT',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ device_ids: [deviceId], play: true }),
    })
  }, [deviceId])

  const togglePlay = useCallback(() => playerRef.current?.togglePlay(), [])
  const nextTrack = useCallback(() => playerRef.current?.nextTrack(), [])
  const previousTrack = useCallback(() => playerRef.current?.previousTrack(), [])

  return (
    <SpotifyCtx.Provider value={{
      connected, connecting, deviceId, track, isPaused, position, duration, error,
      connect, disconnect, activateHere, togglePlay, nextTrack, previousTrack,
    }}>
      {children}
    </SpotifyCtx.Provider>
  )
}

export function useSpotify() {
  return useContext(SpotifyCtx)
}
import { useState, useEffect } from 'react'

let current = { trackId: null }
const listeners = new Set()

export function setNowPlayingTrack(trackId) {
  current = { trackId }
  listeners.forEach((fn) => fn(current))
}

export function useNowPlayingTrack() {
  const [state, setState] = useState(current)
  useEffect(() => {
    listeners.add(setState)
    return () => listeners.delete(setState)
  }, [])
  return state.trackId
}
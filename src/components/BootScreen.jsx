import { useEffect, useState } from 'react'
import { profile } from '../data/profile.js'

export default function BootScreen({ onDone }) {
  const [fading, setFading] = useState(false)

  useEffect(() => {
    const t1 = setTimeout(() => setFading(true), 2300)
    const t2 = setTimeout(onDone, 2800)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [onDone])

  return (
    <div className={`boot-screen ${fading ? 'is-fading' : ''}`}>
      <div className="boot-logo">
        <img src="/icons/applelogo.png" alt="" className="boot-photo" />
      </div>

      <div className="boot-progress">
        <div className="boot-progress-bar" />
      </div>
    </div>
  )
}
import { useEffect, useState } from 'react'
import { BrandMark } from './Icons.jsx'
import { profile } from '../data/profile.js'

export default function BootScreen({ onDone, label = 'Starting up…' }) {
  const [fading, setFading] = useState(false)

  useEffect(() => {
    const t1 = setTimeout(() => setFading(true), 1900)
    const t2 = setTimeout(onDone, 2400)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [onDone])

  return (
    <div className={`boot-screen ${fading ? 'is-fading' : ''}`}>
      <div className="boot-logo">
        <BrandMark size={84} />
      </div>
      <div className="boot-text">
        <span className="boot-name">{profile.name}</span>
        <span className="boot-title">Portfolio</span>
      </div>
      <div className="boot-progress">
        <div className="boot-progress-bar" />
      </div>
      <div className="boot-footer">{label}</div>
    </div>
  )
}

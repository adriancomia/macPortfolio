import { useRef, useState, useCallback, useEffect } from 'react'
import { ProjectsDockIcon, CVDockIcon, ContactDockIcon, CodeDockIcon, LinkedInDockIcon, TrashDockIcon } from './Icons.jsx'
import { contact } from '../data/profile.js'

const APP_ICONS = {
  projects: ProjectsDockIcon,
  cv: CVDockIcon,
  contact: ContactDockIcon,
  github: CodeDockIcon,
  linkedin: LinkedInDockIcon,
  trash: TrashDockIcon,
}

const DOCK_APPS = [
  { id: 'projects', label: 'My Projects', kind: 'window', image: '/icons/projects.png', size: 52 },
  { id: 'cv', label: 'My CV', kind: 'window', image: '/icons/cv.png', size: 52 },
  { id: 'contact', label: 'Contact Me', kind: 'window', image: '/icons/contacts.png', size: 52 },
  { id: 'github', label: 'GitHub', kind: 'external', href: contact.github, image: '/icons/github.png', size: 53 },
  { id: 'linkedin', label: 'LinkedIn', kind: 'external', href: contact.linkedin, image: '/icons/linkedin.png', size: 53 },
]

const BASE = 54
const MAX_SCALE = 1.7
const SPREAD = 90 // px radius of influence
export default function Dock({ runningIds, activeId, onLaunch, onMeasure }) {
  const dockRef = useRef(null)
  const itemRefs = useRef({})
  const [scales, setScales] = useState({})
  const [hoveredId, setHoveredId] = useState(null)
  const [bouncingId, setBouncingId] = useState(null)
  const rafRef = useRef(null)

  useEffect(() => {
    function measure() {
      const map = {}
      Object.entries(itemRefs.current).forEach(([id, node]) => {
        if (!node) return
        const rect = node.getBoundingClientRect()
        map[id] = { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 }
      })
      onMeasure?.(map)
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [onMeasure])

  const computeScales = useCallback((mouseX) => {
    const next = {}
    Object.entries(itemRefs.current).forEach(([id, node]) => {
      if (!node) return
      const rect = node.getBoundingClientRect()
      const center = rect.left + rect.width / 2
      const dist = mouseX === null ? Infinity : Math.abs(mouseX - center)
      const falloff = Math.max(0, 1 - dist / SPREAD)
      next[id] = 1 + falloff * (MAX_SCALE - 1)
    })
    setScales(next)
  }, [])

  function handleMouseMove(e) {
    const x = e.clientX
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(() => computeScales(x))
  }
  function handleMouseLeave() {
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    computeScales(null)
    setHoveredId(null)
  }

  function handleClick(app) {
    setBouncingId(app.id)
    setTimeout(() => setBouncingId(null), 600)
    if (app.kind === 'external') {
      window.open(app.href, '_blank', 'noopener,noreferrer')
      return
    }
    onLaunch(app.id)
  }
  function renderItem(app, label, extraIconProps = {}) {
    const Icon = APP_ICONS[app.id] || CodeDockIcon
    const scale = scales[app.id] || 1
    const running = app.kind === 'window' && runningIds.includes(app.id)
    return (
      <button
        key={app.id}
        ref={(node) => { itemRefs.current[app.id] = node }}
        className="dock-item"
        style={{
        transform: `scale(${scale}) translateY(${-(scale - 1) * 18}px)`,
        marginLeft: (scale - 1) * (BASE / 2),
        marginRight: (scale - 1) * (BASE / 2),
        }}        
        onClick={() => handleClick(app)}
        onMouseEnter={() => setHoveredId(app.id)}
        onFocus={() => setHoveredId(app.id)}
        onBlur={() => setHoveredId(null)}
        aria-label={label}
      >
        {hoveredId === app.id && <span className="dock-label">{label}</span>}
        <span className={`dock-icon-inner ${bouncingId === app.id ? 'is-bouncing' : ''}`}>
        {app.image ? (
            <span className="dock-img-wrap" style={{ width: BASE, height: BASE }}>
              <img
                src={app.image}
                alt=""
                className="dock-item-img"
                style={{ transform: `scale(${app.zoom || 1})` }}
              />
            </span>
          ) : (
            <Icon size={BASE} {...extraIconProps} />
          )}
        </span>
      </button>
    )
  }

  return (
    <div className="dock-wrap">
      <div className="dock" ref={dockRef} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
        {DOCK_APPS.map((app) => renderItem(app, app.label))}

        <div className="dock-divider" />

        {renderItem({ id: 'trash', label: 'Trash', kind: 'window' }, 'Trash', { full: runningIds.includes('trash') })}
      </div>
    </div>
  )
}

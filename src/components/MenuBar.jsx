import { useEffect, useState } from 'react'
import { BrandMark, WifiIcon, BatteryIcon } from './Icons.jsx'
import AppleMenu from './AppleMenu.jsx'

function useClock() {
  const [now, setNow] = useState(new Date())
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000 * 15)
    return () => clearInterval(t)
  }, [])
  return now
}

export default function MenuBar({ activeAppName, onAbout, onRestart, onShutDown }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const now = useClock()
  const dateStr = now.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' })
  const timeStr = now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })

  return (
    <div className="menubar">
      <div className="menubar-left">
        <button className="menubar-brand" onClick={() => setMenuOpen((v) => !v)}>
          <BrandMark size={20} />
        </button>
        <span className="menubar-app-name">{activeAppName}</span>
        <span className="menubar-item menubar-item-soft">File</span>
        <span className="menubar-item menubar-item-soft">Edit</span>
        <span className="menubar-item menubar-item-soft">View</span>
        <span className="menubar-item menubar-item-soft">Window</span>
        <span className="menubar-item menubar-item-soft">Help</span>
      </div>
      <div className="menubar-right">
        <WifiIcon size={13} />
        <BatteryIcon size={20} />
        <span className="menubar-date">{dateStr}</span>
        <span className="menubar-clock">{timeStr}</span>
      </div>

      {menuOpen && (
        <AppleMenu
          onAbout={() => { setMenuOpen(false); onAbout() }}
          onRestart={() => { setMenuOpen(false); onRestart() }}
          onShutDown={() => { setMenuOpen(false); onShutDown() }}
          onClose={() => setMenuOpen(false)}
        />
      )}
    </div>
  )
}
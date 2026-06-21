import { useState, useEffect, useCallback } from 'react'
import BootScreen from './components/BootScreen.jsx'
import Desktop from './components/Desktop.jsx'
import MenuBar from './components/MenuBar.jsx'
import Dock from './components/Dock.jsx'
import Window from './components/Window.jsx'
import ProjectsApp from './components/apps/ProjectsApp.jsx'
import CVApp from './components/apps/CVApp.jsx'
import ContactApp from './components/apps/ContactApp.jsx'
import AboutApp from './components/apps/AboutApp.jsx'

const APPS = {
  projects: { title: 'My Projects', Component: ProjectsApp, pos: { x: 90, y: 64 }, size: { width: 640, height: 460 } },
  cv: { title: 'My CV', Component: CVApp, pos: { x: 260, y: 50 }, size: { width: 480, height: 540 } },
  contact: { title: 'Contact Me', Component: ContactApp, pos: { x: 560, y: 96 }, size: { width: 480, height: 460 } },
  about: { title: 'About This Portfolio', Component: AboutApp, pos: { x: 400, y: 130 }, size: { width: 380, height: 420 } },
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 720)
  useEffect(() => {
    function onResize() { setIsMobile(window.innerWidth <= 720) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])
  return isMobile
}

export default function App() {
  const [booted, setBooted] = useState(false)
  const [shuttingDown, setShuttingDown] = useState(false)
  const [windows, setWindows] = useState([])
  const [activeId, setActiveId] = useState(null)
  const [zCounter, setZCounter] = useState(1)
  const [dockPositions, setDockPositions] = useState({})
  const isMobile = useIsMobile()

  const handleLaunch = useCallback((id) => {
    const existing = windows.find((w) => w.id === id)
    if (!existing) {
      setWindows((prev) => [...prev, { id, minimized: false, maximized: isMobile }])
      setActiveId(id)
    } else if (id === activeId && !existing.minimized) {
      setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, minimized: true } : w)))
      setActiveId(null)
    } else {
      setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, minimized: false } : w)))
      setActiveId(id)
    }
    setZCounter((z) => z + 1)
  }, [windows, activeId, isMobile])

  const closeWindow = useCallback((id) => {
    setWindows((prev) => prev.filter((w) => w.id !== id))
    setActiveId((prevActive) => (prevActive === id ? null : prevActive))
  }, [])

  const focusWindow = useCallback((id) => {
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, minimized: false } : w)))
    setActiveId(id)
    setZCounter((z) => z + 1)
  }, [])

  const minimizeWindow = useCallback((id) => {
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, minimized: true } : w)))
    setActiveId((prevActive) => (prevActive === id ? null : prevActive))
  }, [])

  const toggleMaximize = useCallback((id) => {
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, maximized: !w.maximized } : w)))
  }, [])

  function handleShutDown() {
    setShuttingDown(true)
    setTimeout(() => {
      setWindows([])
      setActiveId(null)
      setShuttingDown(false)
      setBooted(false)
    }, 2000)
  }

  function handleRestart() {
    window.location.reload()
  }

  if (!booted) return <BootScreen onDone={() => setBooted(true)} />

  if (shuttingDown) {
    return <div className="shutdown-screen"><p>Shutting down…</p></div>
  }

  const activeAppName = activeId ? APPS[activeId].title : 'Adrian\'s Portfolio'
  const runningIds = windows.map((w) => w.id)

  return (
    <div className="mac-root">
      <MenuBar
        activeAppName={activeAppName}
        onAbout={() => handleLaunch('about')}
        onRestart={handleRestart}
        onShutDown={handleShutDown}
      />

      <Desktop />

      {windows.map((w) => {
        const app = APPS[w.id]
        const AppComponent = app.Component
        return (
          <Window
            key={w.id}
            id={w.id}
            title={app.title}
            zIndex={w.id === activeId ? 100 + zCounter : 10}
            isActive={w.id === activeId}
            isMinimized={w.minimized}
            isMaximized={w.maximized}
            initialPos={app.pos}
            initialSize={app.size}
            isMobile={isMobile}
            dockTarget={dockPositions[w.id]}
            onClose={closeWindow}
            onFocus={focusWindow}
            onMinimize={minimizeWindow}
            onToggleMaximize={toggleMaximize}
          >
            <AppComponent />
          </Window>
        )
      })}

      <Dock runningIds={runningIds} activeId={activeId} onLaunch={handleLaunch} onMeasure={setDockPositions} />
    </div>
  )
}

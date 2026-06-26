import { useRef, useState, useEffect, useCallback } from 'react'

export default function Window({
  id,
  title,
  children,
  zIndex,
  isActive,
  isMinimized,
  isMaximized,
  initialPos,
  initialSize,
  onClose,
  onFocus,
  onMinimize,
  onToggleMaximize,
  isMobile,
  dockTarget,
}) {
  const [pos, setPos] = useState(initialPos)
  const [size, setSize] = useState(initialSize)
  const [closing, setClosing] = useState(false)
  const [minimizing, setMinimizing] = useState(false)
  const windowRef = useRef(null)
  const resizingRef = useRef(false)
  const resizeStartRef = useRef({ x: 0, y: 0, width: 0, height: 0 })
  const offsetRef = useRef({ x: 0, y: 0 })
  const draggingRef = useRef(false)

  useEffect(() => {
    if (!isMinimized) setMinimizing(false)
  }, [isMinimized])

  const handleResizeStart = useCallback((e) => {
      e.stopPropagation()
      onFocus(id)
      if (isMaximized || isMobile) return
      resizingRef.current = true
      const clientX = e.touches ? e.touches[0].clientX : e.clientX
      const clientY = e.touches ? e.touches[0].clientY : e.clientY
      resizeStartRef.current = { x: clientX, y: clientY, width: size.width, height: size.height }
      document.body.style.userSelect = 'none'
    }, [size, isMaximized, isMobile, onFocus, id])

  const handlePointerDown = useCallback((e) => {
    onFocus(id)
    if (isMaximized || isMobile) return
    draggingRef.current = true
    const clientX = e.touches ? e.touches[0].clientX : e.clientX
    const clientY = e.touches ? e.touches[0].clientY : e.clientY
    offsetRef.current = { x: clientX - pos.x, y: clientY - pos.y }
    document.body.style.userSelect = 'none'
  }, [pos, isMaximized, isMobile, onFocus, id])

  useEffect(() => {
    function handleMove(e) {
      if (resizingRef.current) {
        const clientX = e.touches ? e.touches[0].clientX : e.clientX
        const clientY = e.touches ? e.touches[0].clientY : e.clientY
        const start = resizeStartRef.current
        const newWidth = Math.max(320, start.width + (clientX - start.x))
        const newHeight = Math.max(220, start.height + (clientY - start.y))
        setSize({ width: newWidth, height: newHeight })
        return
      }
      if (!draggingRef.current) return
      const clientX = e.touches ? e.touches[0].clientX : e.clientX
      const clientY = e.touches ? e.touches[0].clientY : e.clientY
      const maxX = window.innerWidth - 120
      const maxY = window.innerHeight - 80
      setPos({
        x: Math.min(Math.max(clientX - offsetRef.current.x, -200), maxX),
        y: Math.min(Math.max(clientY - offsetRef.current.y, 28), maxY),
      })
    }
    function handleUp() {
      draggingRef.current = false
      resizingRef.current = false
      document.body.style.userSelect = ''
    }    window.addEventListener('mousemove', handleMove)
    window.addEventListener('mouseup', handleUp)
    window.addEventListener('touchmove', handleMove, { passive: false })
    window.addEventListener('touchend', handleUp)
    return () => {
      window.removeEventListener('mousemove', handleMove)
      window.removeEventListener('mouseup', handleUp)
      window.removeEventListener('touchmove', handleMove)
      window.removeEventListener('touchend', handleUp)
    }
  }, [])

  if (isMinimized) return null

  const style = isMaximized || isMobile
      ? { top: 28, left: 0, width: '100%', height: 'calc(100% - 28px)', zIndex }
      : {
          top: pos.y,
          left: pos.x,
          width: size.width,
          height: size.height,
          zIndex,
        }

  return (
    <div
      ref={windowRef}
      className={`mac-window ${isActive ? 'is-active' : ''} ${isMaximized || isMobile ? 'is-maximized' : ''} ${closing ? 'is-closing' : ''} ${minimizing ? 'is-minimizing' : ''}`}
      style={style}
      onMouseDown={() => onFocus(id)}
    >

      <div
        className="mac-titlebar"
        onMouseDown={handlePointerDown}
        onTouchStart={handlePointerDown}
        onDoubleClick={() => !isMobile && onToggleMaximize(id)}
      >
        <div className="mac-traffic">
          <button aria-label="Close" className="mac-dot mac-dot-close" onClick={(e) => { e.stopPropagation(); setClosing(true); setTimeout(() => onClose(id), 160) }}>
            <span>✕</span>
          </button>
          <button aria-label="Minimize" className="mac-dot mac-dot-min" onClick={(e) => {
            e.stopPropagation()
            if (windowRef.current && dockTarget) {
              const rect = windowRef.current.getBoundingClientRect()
              const cx = rect.left + rect.width / 2
              const cy = rect.top + rect.height / 2
              windowRef.current.style.setProperty('--mini-dx', `${dockTarget.x - cx}px`)
              windowRef.current.style.setProperty('--mini-dy', `${dockTarget.y - cy}px`)
            }
            setMinimizing(true)
            setTimeout(() => onMinimize(id), 320)
          }}>            <span>–</span>
          </button>
          {!isMobile && (
            <button aria-label="Zoom" className="mac-dot mac-dot-zoom" onClick={(e) => { e.stopPropagation(); onToggleMaximize(id) }}>
              <span>+</span>
            </button>
          )}
        </div>
        <span className="mac-titlebar-text">{title}</span>
        <div className="mac-traffic mac-traffic-spacer" aria-hidden="true" />
      </div>
  <div className="mac-window-body">{children}</div>
        {!isMaximized && !isMobile && (
        <div
          className="mac-resize-handle"
          onMouseDown={handleResizeStart}
          onTouchStart={handleResizeStart}
        />
      )}
    </div>
  )
}
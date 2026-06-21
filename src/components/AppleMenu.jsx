export default function AppleMenu({ onAbout, onRestart, onShutDown, onClose }) {
  return (
    <>
      <div className="apple-menu-backdrop" onClick={onClose} />
      <div className="apple-menu">
        <button className="apple-menu-item" onClick={onAbout}>About This Portfolio</button>
        <div className="apple-menu-divider" />
        <button className="apple-menu-item" onClick={onRestart}>Restart…</button>
        <button className="apple-menu-item" onClick={onShutDown}>Shut Down…</button>
      </div>
    </>
  )
}

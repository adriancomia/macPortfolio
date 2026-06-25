import { useState } from 'react'
import { FolderIcon, WebIcon, MobileIcon, TVIcon, GithubIcon } from '../Icons.jsx'
import { projects } from '../../data/projects.js'

const KEYWORD_ICONS = { folder: FolderIcon, web: WebIcon, mobile: MobileIcon, server: FolderIcon, tv: TVIcon }

function isImagePath(value) {
  if (typeof value !== 'string') return false
  return value.startsWith('/') || value.startsWith('http') || /\.(png|jpe?g|svg|webp|gif)$/i.test(value)
}

function normalizeUrl(url) {
  if (!url) return null
  return /^https?:\/\//i.test(url) ? url : `https://${url}`
}

function ProjectIcon({ icon, size }) {
  if (isImagePath(icon)) {
    return (
      <img
        src={icon}
        alt=""
        style={{ width: size, height: size, borderRadius: size > 30 ? 10 : 6, objectFit: 'cover', flexShrink: 0 }}
      />
    )
  }
  const Comp = KEYWORD_ICONS[(icon || 'folder').toLowerCase()] || FolderIcon
  return <Comp size={size} />
}

export default function ProjectsApp() {
  const [selected, setSelected] = useState(projects.length ? 0 : -1)
  const current = selected >= 0 ? projects[selected] : null

  return (
    <div className="explorer">
      <div className="explorer-toolbar">
        <span className="explorer-address-label">Address:</span>
        <span className="explorer-address">My Computer ▸ My Projects</span>
      </div>

      <div className="explorer-body">
        <div className="explorer-sidebar">
          <div className="sidebar-section-title">Favorites</div>
          <ul>
            {projects.map((p, i) => (
              <li key={p.title} className={i === selected ? 'is-selected' : ''} onClick={() => setSelected(i)}>
                <ProjectIcon icon={p.icon} size={16} />
                <span>{p.title}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="explorer-list">
          <div className="list-header">
            <span>Name</span>
            <span>Tags</span>
          </div>
          {projects.map((p, i) => (
            <div
              key={p.title}
              className={`list-row ${i === selected ? 'is-selected' : ''}`}
              onClick={() => setSelected(i)}
            >
              <span className="list-row-name">
                <ProjectIcon icon={p.icon} size={24} />
                {p.title}
              </span>
              <span className="list-row-tags">
                {p.stack.slice(0, 2).map((s) => (
                  <span key={s} className="stack-pill-sm">{s}</span>
                ))}
                {p.stack.length > 2 && <span className="stack-pill-sm more">+{p.stack.length - 2}</span>}
              </span>
            </div>
          ))}
        </div>

        <div className="explorer-preview">
          {current ? (
            <>
              <div className="preview-icon"><ProjectIcon icon={current.icon} size={88} /></div>
              <h3>{current.title}</h3>
              <p>{current.description}</p>
              <div className="project-stack">
                {current.stack.map((s) => (
                  <span key={s} className="stack-pill">{s}</span>
                ))}
              </div>
              <div className="project-links">
                {current.github && (
                  <a href={normalizeUrl(current.github)} target="_blank" rel="noreferrer" className="project-link">
                    <GithubIcon size={14} /> Code
                  </a>
                )}
                {current.demo && (
                  <a href={normalizeUrl(current.demo)} target="_blank" rel="noreferrer" className="project-link">
                    <WebIcon size={14} /> Live demo
                  </a>
                )}
              </div>
            </>
          ) : (
            <p className="preview-empty">Select a project to preview</p>
          )}
        </div>
      </div>

      <div className="explorer-statusbar">{projects.length} item(s)</div>
    </div>
  )
}
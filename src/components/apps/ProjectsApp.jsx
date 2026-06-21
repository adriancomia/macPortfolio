import { FolderIcon, WebIcon, MobileIcon, GithubIcon } from '../Icons.jsx'
import { projects } from '../../data/projects.js'

const ICONS = {
  folder: FolderIcon,
  web: WebIcon,
  mobile: MobileIcon,
}

export default function ProjectsApp() {
  return (
    <div className="explorer">
      <div className="explorer-toolbar">
        <span className="explorer-address-label">Address:</span>
        <span className="explorer-address">My Computer ▸ My Projects</span>
      </div>

      <div className="explorer-body">
        <div className="explorer-sidebar">
          <div className="sidebar-section-title">Project Folders</div>
          <ul>
            {projects.map((p) => (
              <li key={p.title}>{p.title}</li>
            ))}
          </ul>
        </div>

        <div className="explorer-grid">
          {projects.map((p) => {
            const Icon = ICONS[p.icon] || FolderIcon
            return (
              <div className="project-card" key={p.title}>
                <div className="project-card-icon">
                  <Icon size={40} />
                </div>
                <div className="project-card-body">
                  <h3>{p.title}</h3>
                  <p>{p.description}</p>
                  <div className="project-stack">
                    {p.stack.map((s) => (
                      <span key={s} className="stack-pill">{s}</span>
                    ))}
                  </div>
                  <div className="project-links">
                    {p.github && (
                      <a href={p.github} target="_blank" rel="noreferrer" className="project-link">
                        <GithubIcon size={14} /> Code
                      </a>
                    )}
                    {p.demo && (
                      <a href={p.demo} target="_blank" rel="noreferrer" className="project-link">
                        <WebIcon size={14} /> Live demo
                      </a>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="explorer-statusbar">{projects.length} item(s)</div>
    </div>
  )
}

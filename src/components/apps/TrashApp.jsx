import { TrashDockIcon } from '../Icons.jsx'


const DELETED_ITEMS = [
  { name: 'regret.txt', date: 'Just now', comment: 'i miss her' },
  { name: 'old_resume_v1.docx', date: 'Yesterday', },
  { name: 'bugs.log', date: '2 days ago', },
  { name: '3am_commit.png', date: 'Last week', },
  { name: 'untitled_project_47', date: 'Last month', },
]

const SIDEBAR_ITEMS = [
  { label: 'AirDrop', icon: '📡' },
  { label: 'Recents', icon: '🕐' },
  { label: 'Applications', icon: '🚀' },
  { label: 'Desktop', icon: '🖥️' },
  { label: 'Documents', icon: '📄' },
  { label: 'Downloads', icon: '⬇️' },
  { label: 'Trash', icon: '🗑️', selected: true },
]

function FileGlyph() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24">
      <path d="M5 2h10l4 4v16H5z" fill="#fff" stroke="#c7c7cc" strokeWidth="1" />
      <path d="M15 2v4h4" fill="none" stroke="#c7c7cc" strokeWidth="1" />
      <rect x="8" y="11" width="8" height="1.3" fill="#d6d6da" />
      <rect x="8" y="14" width="8" height="1.3" fill="#d6d6da" />
      <rect x="8" y="17" width="5" height="1.3" fill="#d6d6da" />
    </svg>
  )
}

export default function TrashApp() {
  return (
    <div className="explorer">
<div className="explorer-toolbar">
        <TrashDockIcon size={22} />
        <span className="explorer-address-label">Address:</span>
        <span className="explorer-address">My Computer ▸ Trash</span>
      </div>
      <div className="explorer-body">
        <div className="explorer-sidebar">
          <div className="sidebar-section-title">Favorites</div>
          <ul>
            {SIDEBAR_ITEMS.map((item) => (
              <li key={item.label} className={item.selected ? 'is-selected' : ''}>
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="trash-main">
          <div className="trash-table-header">
            <span className="col-name">Name</span>
            <span className="col-comments">Comments</span>
            <span className="col-date">Date Deleted</span>
          </div>
          <div className="trash-table-body">
            {DELETED_ITEMS.map((item) => (
              <div className="trash-row" key={item.name}>
                <span className="col-name trash-row-name"><FileGlyph /> {item.name}</span>
                <span className="col-comments trash-row-comment">{item.comment}</span>
                <span className="col-date trash-row-date">{item.date}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="explorer-statusbar">{DELETED_ITEMS.length} items, 9.8 GB available</div>
    </div>
  )
}
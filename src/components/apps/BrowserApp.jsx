import { contact } from '../../data/profile.js'
import { CodeDockIcon, LinkedInDockIcon } from '../Icons.jsx'

const SITES = {
  github: {
    url: 'github.com/adriancomia',
    href: contact.github,
    title: 'Adrian Comia',
    subtitle: `@${contact.github.split('/').pop()}`,
    Icon: CodeDockIcon,
    accent: '#24292f',
    blurb: 'Check out my repositories, contributions, and the code behind these projects.',
  },
  linkedin: {
    url: 'linkedin.com',
    href: contact.linkedin,
    title: 'Adrian Comia',
    subtitle: 'LinkedIn Profile',
    Icon: LinkedInDockIcon,
    accent: '#0a66c2',
    blurb: 'Connect with me professionally and see my full background.',
  },
}

export default function BrowserApp({ site = 'github' }) {
  const data = SITES[site] || SITES.github

  return (
    <div className="browser-app">
      <div className="browser-toolbar">
        <div className="browser-nav-btns">
          <button className="browser-nav-btn" disabled>‹</button>
          <button className="browser-nav-btn" disabled>›</button>
        </div>
        <div className="browser-address">
          <span className="browser-lock">🔒</span>
          {data.url}
        </div>
        <a href={data.href} target="_blank" rel="noreferrer" className="browser-open-btn" title="Open in new tab">⤴</a>
      </div>

      <div className="browser-page" style={{ '--accent': data.accent }}>
        <div className="browser-page-icon"><data.Icon size={56} /></div>
        <h2>{data.title}</h2>
        <p className="browser-page-sub">{data.subtitle}</p>
        <p className="browser-page-blurb">{data.blurb}</p>
        <a href={data.href} target="_blank" rel="noreferrer" className="browser-cta">
          Open {site === 'github' ? 'GitHub' : 'LinkedIn'} <span>↗</span>
        </a>
      </div>
    </div>
  )
}
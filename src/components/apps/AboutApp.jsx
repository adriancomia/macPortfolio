import { BrandMark } from '../Icons.jsx'
import { profile, contact } from '../../data/profile.js'

export default function AboutApp() {
  return (
    <div className="about-app">
      <BrandMark size={64} />
      <h2>{profile.name}</h2>
      <p className="about-tagline">{profile.tagline}</p>
      <p className="about-body">
        This portfolio is a little homage to classic desktop UI, built with React.
        Click around the Dock to check out my projects, CV, and how to reach me.
      </p>
      <a className="about-link" href={contact.github} target="_blank" rel="noreferrer">
        {contact.github.replace('https://', '')}
      </a>
    </div>
  )
}

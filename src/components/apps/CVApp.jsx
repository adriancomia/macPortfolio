import { profile, education, skills, contact } from '../../data/profile.js'
import { GithubIcon, LinkedInIcon } from '../Icons.jsx'

function GradCapIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M12 3l10 5-10 5L2 8l10-5z" fill="#2e7cf6" />
      <path d="M6 10.5v4.5c0 1.5 2.7 3 6 3s6-1.5 6-3v-4.5" stroke="#2e7cf6" strokeWidth="1.4" />
      <path d="M21 9v5" stroke="#2e7cf6" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  )
}

export default function CVApp() {
  const skillList = skills.map((s) => s.icon).join(',')
  const skillNames = skills.map((s) => s.name).join(' · ')

  return (
    <div className="cv-mac">
      <div className="cv-mac-header">
        <div className="cv-mac-avatar">
          {profile.photo ? <img src={profile.photo} alt={profile.name} /> : <span>{profile.name.charAt(0)}</span>}
        </div>
        <h2>{profile.name}</h2>
        <p className="cv-mac-tagline">{profile.tagline}</p>
        {profile.location && <p className="cv-mac-location">{profile.location}</p>}
        <div className="cv-mac-social">
          <a href={contact.github} target="_blank" rel="noreferrer" title="GitHub"><GithubIcon size={16} /></a>
          <a href={contact.linkedin} target="_blank" rel="noreferrer" title="LinkedIn"><LinkedInIcon size={16} /></a>
        </div>
      </div>

      <div className="cv-mac-group">
        <div className="cv-mac-group-title">Education</div>
        <div className="cv-mac-card">
          {education.map((e, i) => (
            <div className="cv-mac-row" key={e.degree + e.school}>
              <span className="cv-mac-row-icon"><GradCapIcon /></span>
              <span className="cv-mac-row-text">
                <span className="cv-mac-row-title">{e.degree}</span>
                <span className="cv-mac-row-sub">{e.school} · {e.period}</span>
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="cv-mac-group">
        <div className="cv-mac-group-title">Skills</div>
        <div className="cv-mac-card cv-mac-skills">
          <img src={`https://skillicons.dev/icons?i=${skillList}`} alt={skillNames} className="cv-mac-skills-img" />
          <p className="cv-mac-skills-caption">{skillNames}</p>
        </div>
      </div>
    </div>
  )
}
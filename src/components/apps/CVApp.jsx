import { profile, education, experience, skills, contact } from '../../data/profile.js'
import { GithubIcon } from '../Icons.jsx'

export default function CVApp() {
  return (
    <div className="cv">
      <div className="cv-header">
        <div className="cv-photo">
          {profile.photo ? (
            <img src={profile.photo} alt={profile.name} />
          ) : (
            <span>{profile.name.charAt(0)}</span>
          )}
        </div>

        <div className="cv-header-text">
          <h2>{profile.name}</h2>
          <p className="cv-role">{profile.tagline}</p>

          <a className="cv-github" href={contact.github} target="_blank" rel="noreferrer">
            <GithubIcon size={14} /> {contact.github.replace('https://', '')}
          </a>
        </div>
      </div>

      <section className="cv-section">
        <h3>Education</h3>
        {education.map((e) => (
          <div className="cv-entry" key={e.degree + e.school}>
            <strong>{e.degree.toUpperCase()}</strong>
            <span>
              {e.school} | {e.period}
            </span>
          </div>
        ))}
      </section>

      <section className="cv-section">
        <h3>Professional Experience</h3>
        {experience.map((e) => (
          <div className="cv-entry" key={e.title + e.place}>
            <strong>{e.title}</strong>
            <span>
              {e.place} | {e.period}
            </span>
            <p>{e.description}</p>
          </div>
        ))}
      </section>

      {/* ✅ FIXED SKILLS SECTION */}
      <section className="cv-section">
        <h3>Skills</h3>

        <div className="cv-skills">
          {skills.map((s) => (
            <div key={s.name} className="stack-pill">
              <img
                src={`https://skillicons.dev/icons?i=${s.icon}`}
                alt={s.name}
                width="18"
                height="18"
                style={{ marginRight: 6, verticalAlign: 'middle' }}
              />
              {s.name}
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
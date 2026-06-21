import { useState } from 'react'
import { contact } from '../../data/profile.js'

export default function ContactApp() {
  const [fromEmail, setFromEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [sent, setSent] = useState(false)

  function handleSend() {
    if (!message.trim()) return
    const body = encodeURIComponent(
      `${message}\n\n— sent from the portfolio contact form\nReply to: ${fromEmail || '(not provided)'}`
    )
    const mailSubject = encodeURIComponent(subject || 'Hello from your portfolio')
    window.location.href = `mailto:${contact.email}?subject=${mailSubject}&body=${body}`
    setSent(true)
  }

  return (
    <div className="mail-compose">
      <div className="mail-ribbon">
        <button className="mail-ribbon-btn" onClick={handleSend}>
          <span className="mail-ribbon-icon">✉</span>
          Send
        </button>
      </div>

      <div className="mail-fields">
        <div className="mail-field">
          <span>To:</span>
          <input type="text" value={contact.email} readOnly />
        </div>
        <div className="mail-field">
          <span>From:</span>
          <input
            type="email"
            placeholder="your.email@example.com"
            value={fromEmail}
            onChange={(e) => setFromEmail(e.target.value)}
          />
        </div>
        <div className="mail-field">
          <span>Subject:</span>
          <input
            type="text"
            placeholder="What's this about?"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </div>
      </div>

      <textarea
        className="mail-body"
        placeholder="Message here..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <div className="mail-footer">
        {sent
          ? "Your email app should be opening now — if nothing happened, email me directly instead."
          : "If you'd like to talk about an internship, a project, or just have a chat, leave me a message and I'll get back to you as soon as possible!"}
      </div>
    </div>
  )
}

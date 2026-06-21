import { stickyNote } from '../data/profile.js'

export default function StickyWidget() {
  return (
    <div className="widget sticky-widget">
      <p>{stickyNote}</p>
    </div>
  )
}
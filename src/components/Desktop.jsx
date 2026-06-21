import CalendarWidget from './CalendarWidget.jsx'
import StickyWidget from './StickyWidget.jsx'

export default function Desktop() {
  return (
    <div className="desktop">
      <div className="desktop-widgets">
        <CalendarWidget />
        <StickyWidget />
      </div>
    </div>
  )
}

import CalendarWidget from './CalendarWidget.jsx'
import StickyWidget from './StickyWidget.jsx'
import SpotifyWidget from './SpotifyWidget.jsx'

export default function Desktop() {
  return (
    <div className="desktop">
      <div className="desktop-widgets desktop-widgets-left">
        <CalendarWidget />
        <StickyWidget />
      </div>
      <div className="desktop-widgets desktop-widgets-right">
        <SpotifyWidget />
      </div>
    </div>
  )
}
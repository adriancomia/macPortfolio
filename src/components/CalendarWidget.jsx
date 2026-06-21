const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December']
const DAY_LETTERS = ['S','M','T','W','T','F','S']

export default function CalendarWidget() {
  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth()
  const today = now.getDate()
  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const cells = []
  for (let i = 0; i < firstDay; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(d)

  return (
    <div className="widget calendar-widget">
      <div className="calendar-widget-header">{MONTHS[month].toUpperCase()}</div>
      <div className="calendar-grid calendar-grid-labels">
        {DAY_LETTERS.map((d, i) => <span key={i}>{d}</span>)}
      </div>
      <div className="calendar-grid">
        {cells.map((d, i) => (
          <span key={i} className={d === today ? 'calendar-today' : ''}>{d || ''}</span>
        ))}
      </div>
    </div>
  )
}

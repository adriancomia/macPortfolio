# Adrian Comia — Portfolio (Mac-style desktop)

A desktop-themed portfolio inspired by macOS, built with React + Vite.
All visuals (icons, wallpaper, logo) are original artwork — nothing is
copied from Apple's actual OS assets, wallpaper photos, or trademarked logos.

## Running it locally

```bash
npm install
npm run dev
```

Open the URL it prints (usually http://localhost:5173).

## What's included

- Boot screen on first load
- Top menu bar with a working "Apple menu" (click the logo, top-left) →
  About This Portfolio / Restart / Shut Down
- Desktop with a small calendar widget
- Dock at the bottom: My Projects, My CV, Contact Me, GitHub (opens your repo
  in a new tab), LinkedIn (opens your profile in a new tab), Trash (a little
  easter egg). Hover over any icon for the magnify effect — every icon now
  also shows its name in a small label above it on hover.
- Draggable, resizable-feeling windows with mac-style traffic-light buttons
  (red = close, yellow = minimize, green = zoom/maximize)
- Contact form opens the visitor's email app pre-filled via `mailto:`
- Fully responsive — windows go full-screen on phones automatically

## Editing your content

You don't need to touch component code — just edit the data files:

- `src/data/profile.js` — name, tagline, contact links, skills, education,
  experience.
- `src/data/projects.js` — your project list (title, description, stack,
  links).

Both files have `EDIT ME` comments marking exactly what to change.

### Updating your LinkedIn link

In `src/data/profile.js`, set `contact.linkedin` to your real profile URL —
it's currently a placeholder.

### Swapping the wallpaper

The desktop background lives at `public/wallpaper.jpg`. Replace that file
(keep the same name, or update the path in `src/styles/mac.css` under the
`.desktop` rule) with any image you'd like.

**Heads up:** the current wallpaper is Apple's official macOS wallpaper
artwork. That's fine for local testing, but if you deploy this publicly
(GitHub Pages, Vercel, etc.) for a longer-term portfolio, consider swapping
it for an image you have clear rights to redistribute.

### Adding your photo

Drop an image into `public/` (e.g. `public/avatar.jpg`), then in
`src/data/profile.js` set:

```js
photo: '/avatar.jpg',
```

## Project structure

```
src/
  components/
    MenuBar.jsx       # top bar + Apple-menu dropdown
    AppleMenu.jsx      # the dropdown itself
    Dock.jsx           # bottom dock with magnify effect
    Desktop.jsx         # wallpaper + calendar widget
    CalendarWidget.jsx
    Window.jsx          # mac-style window chrome
    BootScreen.jsx
    Icons.jsx            # all original SVG icons
    apps/                # Projects, CV, Contact, About — window contents
  data/                  # your editable content lives here
  styles/mac.css         # all visual styling/theme
  App.jsx                # wires everything together
```

## Building for deployment

```bash
npm run build
```

Outputs static files to `dist/`. Deploy that folder to:

- **GitHub Pages** — push `dist/` to a `gh-pages` branch, or use the
  `gh-pages` npm package.
- **Vercel / Netlify** — connect your repo, build command `npm run build`,
  output directory `dist`.

## Notes

- The "Shut Down" option in the Apple menu is an easter egg — it fades to
  black, then loops back to the boot screen. Nothing is actually shut down.
- "Restart" does an actual page reload (which naturally replays the boot
  screen on the way back up).
- The Dock's GitHub icon opens your GitHub profile in a new tab instead of
  a window, same as a real Dock launching an external app.

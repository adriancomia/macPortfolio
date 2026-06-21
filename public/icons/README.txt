Drop your own icon image files here (e.g. projects.png, cv.png, contact.png,
github.png, linkedin.png). Square images work best — 256x256 or 512x512 PNG.

Then in src/components/Dock.jsx, add an `image` field to that app's entry,
e.g.:

  { id: 'projects', label: 'My Projects', kind: 'window', image: '/icons/projects.png' }

If an app has no `image` field, it falls back to the built-in SVG icon.

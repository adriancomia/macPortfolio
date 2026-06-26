// Original, hand-drawn SVG icons. None of these are copied OS/app assets —
// they're inspired by the rounded-square "app icon" visual language but
// drawn from scratch with generic symbols.

export function BrandMark({ size = 22 }) {
  // Personal monogram used in place of the Apple logo.
  return (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <defs>
        <linearGradient id="brandGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#7dd8ff" />
          <stop offset="100%" stopColor="#3a6df0" />
        </linearGradient>
      </defs>
      <circle cx="12" cy="12" r="11" fill="url(#brandGrad)" />
      <text x="12" y="16.5" textAnchor="middle" fontSize="10.5" fontWeight="700" fill="#fff" fontFamily="inherit">AC</text>
    </svg>
  )
}

export function ProjectsDockIcon({ size = 54 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64">
      <defs>
        <linearGradient id="pdGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#6fd0ff" />
          <stop offset="100%" stopColor="#2e7ce6" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="60" height="60" rx="14" fill="url(#pdGrad)" />
      <rect x="14" y="14" width="16" height="16" rx="4" fill="#fff" opacity="0.95" />
      <rect x="34" y="14" width="16" height="16" rx="4" fill="#fff" opacity="0.7" />
      <rect x="14" y="34" width="16" height="16" rx="4" fill="#fff" opacity="0.7" />
      <rect x="34" y="34" width="16" height="16" rx="4" fill="#fff" opacity="0.95" />
    </svg>
  )
}

export function CVDockIcon({ size = 54 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64">
      <defs>
        <linearGradient id="cvGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffc371" />
          <stop offset="100%" stopColor="#ff8a3d" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="60" height="60" rx="14" fill="url(#cvGrad)" />
      <rect x="16" y="12" width="32" height="40" rx="3" fill="#fff" />
      <rect x="21" y="20" width="22" height="3" rx="1.5" fill="#ffb066" />
      <rect x="21" y="27" width="22" height="2.4" fill="#f0c79a" />
      <rect x="21" y="32.5" width="22" height="2.4" fill="#f0c79a" />
      <rect x="21" y="38" width="14" height="2.4" fill="#f0c79a" />
    </svg>
  )
}

export function ContactDockIcon({ size = 54 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64">
      <defs>
        <linearGradient id="ctGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8fd9ff" />
          <stop offset="100%" stopColor="#1f8fe0" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="60" height="60" rx="14" fill="url(#ctGrad)" />
      <path d="M14 44L42 18l6 6-28 26-9 2.5z" fill="#fff" />
      <path d="M40.5 19.5l5 5" stroke="#1f8fe0" strokeWidth="1.4" opacity="0.4" />
    </svg>
  )
}

export function CodeDockIcon({ size = 54 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64">
      <rect x="2" y="2" width="60" height="60" rx="14" fill="#2b2f38" />
      <path d="M23 22L13 32l10 10" fill="none" stroke="#8fe3a8" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M41 22l10 10-10 10" fill="none" stroke="#8fe3a8" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M36 16l-8 32" fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" opacity="0.85" />
    </svg>
  )
}

export function LinkedInDockIcon({ size = 54 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64">
      <defs>
        <linearGradient id="liGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4dabf5" />
          <stop offset="100%" stopColor="#0a66c2" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="60" height="60" rx="14" fill="url(#liGrad)" />
      <circle cx="20" cy="20" r="4.2" fill="#fff" />
      <rect x="16" y="27" width="8" height="22" rx="1.5" fill="#fff" />
      <path d="M30 27h7.6v3.4c1.6-2.6 4.4-4 7.8-4 6.6 0 8.6 4.2 8.6 10.6V49h-8v-9.8c0-2.6-.9-4.6-3.6-4.6-2.4 0-4.4 1.6-4.4 4.8V49h-8z" fill="#fff" />
    </svg>
  )
}

export function TrashDockIcon({ size = 50, full = false }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64">
      <rect x="2" y="2" width="60" height="60" rx="14" fill="#dfe3e8" />
      <path d="M22 24h20l-2 26a3 3 0 01-3 2.8H27a3 3 0 01-3-2.8z" fill="#9aa3b0" />
      <rect x="19" y="19" width="26" height="4" rx="1.5" fill="#9aa3b0" />
      <rect x="27" y="14" width="10" height="5" rx="1.5" fill="#9aa3b0" />
      {full && <rect x="26" y="29" width="12" height="14" rx="2" fill="#6c7585" />}
    </svg>
  )
}

export function FolderIcon({ size = 32 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32">
      <path d="M3 9c0-1.1.9-2 2-2h7l2.5 2.5H27c1.1 0 2 .9 2 2V24c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2V9z" fill="#5bb6ff" stroke="#2f8ce0" strokeWidth="0.6"/>
      <path d="M3 12h26v12c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2V12z" fill="#9fd6ff" stroke="#2f8ce0" strokeWidth="0.6"/>
    </svg>
  )
}

export function WebIcon({ size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32">
      <circle cx="16" cy="16" r="13" fill="#cfeaff" stroke="#2f8ce0" strokeWidth="1.4"/>
      <path d="M3 16h26M16 3c3.5 3.6 5.5 8.2 5.5 13S19.5 25.4 16 29c-3.5-3.6-5.5-8.2-5.5-13S12.5 6.6 16 3z" fill="none" stroke="#2f8ce0" strokeWidth="1.1"/>
    </svg>
  )
}

export function MobileIcon({ size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32">
      <rect x="9" y="2" width="14" height="28" rx="3" fill="#3d3d3d" stroke="#1f1f1f" strokeWidth="1"/>
      <rect x="11" y="5" width="10" height="19" fill="#cfeaff"/>
      <circle cx="16" cy="27" r="1.4" fill="#cfcfcf"/>
    </svg>
  )
}

export function TVIcon({ size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32">
      <rect x="3" y="6" width="26" height="17" rx="2" fill="#2b2f38" />
      <rect x="6" y="9" width="20" height="11" fill="#5bb6ff" />
      <path d="M12 27h8M16 23v4" stroke="#2b2f38" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

export function LinkedInIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="currentColor">
      <path d="M14.82 0H1.18C.53 0 0 .53 0 1.18v13.64C0 15.47.53 16 1.18 16h13.64c.65 0 1.18-.53 1.18-1.18V1.18C16 .53 15.47 0 14.82 0zM4.74 13.5H2.4V6h2.34v7.5zM3.57 4.93a1.36 1.36 0 110-2.72 1.36 1.36 0 010 2.72zM13.6 13.5h-2.34V9.85c0-.87-.02-2-1.21-2-1.21 0-1.4.95-1.4 1.93v3.72H6.32V6h2.25v1.02h.03c.31-.59 1.08-1.21 2.22-1.21 2.38 0 2.78 1.56 2.78 3.6v4.09z"/>
    </svg>
  )
}

export function YoutubeDockIcon({ size = 54 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64">
      <rect x="2" y="2" width="60" height="60" rx="14" fill="#fff" />
      <rect x="10" y="20" width="44" height="24" rx="8" fill="#ff0000" />
      <path d="M28 26l12 6-12 6z" fill="#fff" />
    </svg>
  )
}

export function SearchIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <circle cx="7" cy="7" r="5.2" stroke="currentColor" strokeWidth="1.6" />
      <line x1="11" y1="11" x2="15" y2="15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

export function BackArrowIcon({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function GithubIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="currentColor">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.6 7.6 0 014 0c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0016 8c0-4.42-3.58-8-8-8z"/>
    </svg>
  )
}

export function WifiIcon({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="currentColor">
      <path d="M8 12.2a1.1 1.1 0 110 2.2 1.1 1.1 0 010-2.2zM4.6 9.4a4.8 4.8 0 016.8 0l-1.1 1.1a3.3 3.3 0 00-4.6 0zM2.1 6.9a8.3 8.3 0 0111.8 0L12.8 8a6.8 6.8 0 00-9.6 0z"/>
    </svg>
  )
}

export function BatteryIcon({ size = 18 }) {
  return (
    <svg width={size} height={11} viewBox="0 0 24 11" fill="none">
      <rect x="0.5" y="0.5" width="20" height="10" rx="2.5" stroke="currentColor" opacity="0.7"/>
      <rect x="2" y="2" width="14" height="7" rx="1.4" fill="currentColor"/>
      <rect x="21.5" y="3.2" width="1.8" height="4.6" rx="0.8" fill="currentColor" opacity="0.7"/>
    </svg>
  )
}

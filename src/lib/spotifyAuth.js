import { SPOTIFY_CLIENT_ID, SPOTIFY_REDIRECT_URI, SPOTIFY_SCOPES } from '../data/spotifyConfig.js'

const VERIFIER_KEY = 'spotify_code_verifier'
const TOKEN_KEY = 'spotify_tokens'

function randomString(length) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  crypto.getRandomValues(new Uint8Array(length)).forEach((v) => { result += chars[v % chars.length] })
  return result
}

function base64UrlEncode(buffer) {
  return btoa(String.fromCharCode(...new Uint8Array(buffer))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

async function sha256(plain) {
  return crypto.subtle.digest('SHA-256', new TextEncoder().encode(plain))
}

export async function redirectToSpotifyLogin() {
  const verifier = randomString(64)
  const challenge = base64UrlEncode(await sha256(verifier))
  sessionStorage.setItem(VERIFIER_KEY, verifier)

  const params = new URLSearchParams({
    client_id: SPOTIFY_CLIENT_ID,
    response_type: 'code',
    redirect_uri: SPOTIFY_REDIRECT_URI,
    code_challenge_method: 'S256',
    code_challenge: challenge,
    scope: SPOTIFY_SCOPES,
  })
  window.location.href = `https://accounts.spotify.com/authorize?${params.toString()}`
}

export function getStoredTokens() {
  const raw = localStorage.getItem(TOKEN_KEY)
  return raw ? JSON.parse(raw) : null
}

function storeTokens(tokens) {
  const data = { ...tokens, expires_at: Date.now() + tokens.expires_in * 1000 }
  localStorage.setItem(TOKEN_KEY, JSON.stringify(data))
  return data
}

export async function exchangeCodeForTokens(code) {
  const verifier = sessionStorage.getItem(VERIFIER_KEY)
  const body = new URLSearchParams({
    client_id: SPOTIFY_CLIENT_ID,
    grant_type: 'authorization_code',
    code,
    redirect_uri: SPOTIFY_REDIRECT_URI,
    code_verifier: verifier,
  })
  const res = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
  })
  const json = await res.json()
  if (json.error) throw new Error(json.error_description || json.error)
  sessionStorage.removeItem(VERIFIER_KEY)
  return storeTokens(json)
}

export async function refreshAccessToken(refreshToken) {
  const body = new URLSearchParams({
    client_id: SPOTIFY_CLIENT_ID,
    grant_type: 'refresh_token',
    refresh_token: refreshToken,
  })
  const res = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
  })
  const json = await res.json()
  if (json.error) throw new Error(json.error_description || json.error)
  if (!json.refresh_token) json.refresh_token = refreshToken
  return storeTokens(json)
}

export async function getValidAccessToken() {
  let tokens = getStoredTokens()
  if (!tokens) return null
  if (Date.now() > tokens.expires_at - 30000) {
    tokens = await refreshAccessToken(tokens.refresh_token)
  }
  return tokens.access_token
}

export function logoutSpotify() {
  localStorage.removeItem(TOKEN_KEY)
}

export function extractCodeFromUrl() {
  const params = new URLSearchParams(window.location.search)
  const code = params.get('code')
  if (code) {
    params.delete('code')
    params.delete('state')
    const newUrl = window.location.pathname + (params.toString() ? `?${params}` : '') + window.location.hash
    window.history.replaceState({}, '', newUrl)
  }
  return code
}
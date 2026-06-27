export default async function handler(req, res) {
const query = req.query.q
let limit = parseInt(req.query.limit, 10)
  if (!Number.isFinite(limit) || limit < 1) limit = 12
  if (limit > 50) limit = 50
  console.log('DEBUG limit value:', limit, 'raw query:', req.query.limit)    
  return
  }

  try {
    const tokenRes = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: 'Basic ' + Buffer.from(
          `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
        ).toString('base64'),
      },
      body: 'grant_type=client_credentials',
    })
    const tokenData = await tokenRes.json()
    if (!tokenRes.ok || !tokenData.access_token) {
      res.status(500).json({ error: 'Spotify auth failed', detail: tokenData })
      return
    }

    const searchRes = await fetch(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=${limit}`,
      { headers: { Authorization: `Bearer ${tokenData.access_token}` } }
    )
    const searchData = await searchRes.json()
    if (!searchRes.ok) {
      res.status(500).json({ error: 'Spotify search failed', detail: searchData })
      return
    }

    const tracks = (searchData.tracks?.items || []).map((t) => ({
      id: t.id,
      name: t.name,
      artists: t.artists.map((a) => a.name).join(', '),
      image: t.album.images[1]?.url || t.album.images[0]?.url,
    }))

    res.status(200).json({ tracks })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }

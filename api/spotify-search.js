export default async function handler(req, res) {
  const query = req.query.q
  if (!query) {
    res.status(400).json({ error: 'Missing search query' })
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
    if (!tokenData.access_token) throw new Error('Failed to get Spotify token')

    const searchRes = await fetch(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=12`,
      { headers: { Authorization: `Bearer ${tokenData.access_token}` } }
    )
    const searchData = await searchRes.json()

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
}
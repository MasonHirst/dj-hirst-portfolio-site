const axios = require('axios')
const { SPOTIFY_CLIENT_ID } = process.env
const { SPOTIFY_CLIENT_SECRET } = process.env

// Function to get access token from Spotify
async function getSpotifyAccessToken() {
  const authOptions = {
    method: 'post',
    url: 'https://accounts.spotify.com/api/token',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization:
        'Basic ' +
        Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString(
          'base64'
        ),
    },
    data: 'grant_type=client_credentials',
  }

  try {
    const response = await axios(authOptions)
    // const _59minutesOut = 60 * 59 * 1000
    const _59minutesOut = 20 * 1 * 1000 // less time for testing
    const expirationTime = Date.now() + _59minutesOut // 59 minutes from retrieval
    return {
      token: response.data.access_token,
      expiration: expirationTime
    }
  } catch (error) {
    console.error('Error fetching Spotify access token:', error)
    throw error
  }
}

module.exports = {
  getSpotifyAccessToken,
}

function spotifyTokenStillValid(tokenExpiration) {
  return !!tokenExpiration && Date.now() < tokenExpiration
}


function cleanSpotifyTrackObjects(tracks = []) {
  const tracksCopy = [...tracks]
  tracksCopy.forEach((track) => {
    delete track.available_markets
    delete track.album.available_markets
    delete track.album.release_date_precision
    delete track.album.external_urls
    delete track.album.href
    delete track.album.album_type
    delete track.album.type
    delete track.album.artists
    delete track.album.total_tracks
    delete track.album.uri
    delete track.external_urls
    delete track.preview_url
    delete track.external_ids
    delete track.disc_number
    delete track.href
    delete track.is_local
    delete track.popularity
    delete track.track_number
    track.artists.forEach((artist) => {
      delete artist.external_urls
      delete artist.href
      delete artist.uri
    })
  })
  return tracksCopy
}


module.exports = {
  spotifyTokenStillValid,
  cleanSpotifyTrackObjects,
}
function spotifyTokenStillValid(tokenExpiration) {
  console.log('now: ', Date.now())
  console.log('expiration: ', tokenExpiration)
  console.log('valid: ', !!tokenExpiration && Date.now() < tokenExpiration)
  return !!tokenExpiration && Date.now() < tokenExpiration
}



// hello there



module.exports = {
  spotifyTokenStillValid
}
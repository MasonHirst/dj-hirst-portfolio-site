// ! IMPORTS
const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const path = require('path')

const rateLimit = require('express-rate-limit');
const { handleGetRequests, handleNewSongRequest, extractClientId, handleSpotifyQuery } = require('./controllers/request-controller')
const db = require('./utils/database/db-config')

//! Middleware
const join = path.join(__dirname, '.', 'build')
app.use(express.static(join))
app.use(express.json())
app.use(cors())

//! Request limiters
const songRequestLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 10, // Limit each IP to 10 requests per windowMs
  message: 'Too many requests from this IP, please try again after 5 minutes'
});

//! Endpoints
app.post('/api/request-song', songRequestLimiter, extractClientId, handleNewSongRequest)
app.post('/api/requests', extractClientId, handleGetRequests)
app.post('/api/spotify/search', extractClientId, handleSpotifyQuery)


//! Serve the client files
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '.', 'build', 'index.html'))
})



//! Server listen
const PORT = process.env.PORT || 8080

db.sync()
  .then(() => {
    app.listen(PORT, () =>
      console.log(`--------------------------- SERVER RUNNING ON PORT ${PORT} ------------------------------`)
    )
  })
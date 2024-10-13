const { Op } = require('sequelize')
const moment = require('moment')
const validator = require('validator')
const axios = require('axios')
const UAParser = require('ua-parser-js')

const { Request } = require('../utils/database/models')
const rollbar = require('../utils/rollbar-config')
const {
  spotifyTokenStillValid,
  cleanSpotifyTrackObjects,
} = require('../utils/helper-functions')
const { getSpotifyAccessToken } = require('../utils/spotify-api-config')

//! spotify_access_token will store the auth token for us to
//! access spotify API. It only lasts one hour. We will only
//! fetch it when we don't have one, or it expires.
let spotify_access_token
let spotify_access_token_expiration

module.exports = {
  handleNewSongRequest: async (req, res) => {
    try {
      const { requestReason, clientId, userAgentObj, requestDetails } = req.body
      if (
        !requestDetails?.name ||
        !requestDetails?.artists?.[0]?.name ||
        !requestReason
      ) {
        throw { ...allFieldsRequiredMsg, body: req.body }
      }

      const fiveMinutesAgo = moment().subtract(5, 'minutes').toDate()
      const clientRequestCount = await Request.count({
        where: {
          requester_client_id: clientId.trim(),
          createdAt: {
            [Op.gte]: fiveMinutesAgo, // Greater than or equal to the timestamp of 5 minutes ago
          },
        },
      })
      if (clientRequestCount >= 5) {
        throw { ...tooManyRequestsMsg, clientRequestCount, userAgentObj }
      }
      requestDetails.name = requestDetails.name.trim()
      requestDetails.artists.forEach(artist => artist.name = artist.name.trim())

      const createBody = {
        requester_client_id: clientId.trim(),
        request_details: requestDetails,
        request_reason: requestReason.trim(),
        is_bookmarked: false,
        is_played: false,
        is_disliked: false,
        is_soft_deleted: false,
        user_agent: userAgentObj,
      }

      const newRequest = await Request.create(createBody)
      if (!newRequest) {
        throw failedToCreateMsg
      }
      rollbar.info(
        `User ${clientId.trim()} successfully submitted a song request: `,
        req.body
      )
      return res.status(200).send(newRequest)
    } catch (error) {
      const errCode = error?.code || 500
      console.error(error)
      rollbar.error('Error in handleNewSongRequest function: ', error)
      return res.status(errCode).send('something-went-wrong')
    }
  },

  handleSpotifyQuery: async (req, res) => {
    try {
      const { query } = req.body

      if (
        !spotify_access_token ||
        !spotifyTokenStillValid(spotify_access_token_expiration)
      ) {
        rollbar.log('GETTING NEW SPOTIFY ACCESS TOKEN')
        const accessObj = await getSpotifyAccessToken()
        spotify_access_token = accessObj?.token
        spotify_access_token_expiration = accessObj?.expiration
      }

      // Make a request to Spotify's search API
      const searchResults = await axios
        .get('https://api.spotify.com/v1/search', {
          headers: {
            Authorization: `Bearer ${spotify_access_token}`,
          },
          params: {
            q: query,
            type: 'track',
            limit: 10, // Limit to top 10 results
          },
        })
        .catch((error) => {
          if (error?.response?.status == 401) {
            spotify_access_token = null
            spotify_access_token_expiration = null
            throw {
              ...spotifyFailureMsg,
              body: req.body,
              status: error?.response?.status,
              statusText: error?.response?.statusText,
            }
          }
        })

      const cleanedTracks = cleanSpotifyTrackObjects(
        searchResults.data.tracks.items
      )
      res.json(cleanedTracks)
      // res.json(searchResults.data.tracks.items)
    } catch (error) {
      const errCode = error?.code || 500
      console.error(error)
      rollbar.error('Error in handleSpotifyQuery function: ', error)
      return res.status(errCode).send('something-went-wrong')
    }
  },

  handleGetRequests: async (req, res) => {
    try {
      const { getStartTime } = req.body
      let where = {}
      // If "getStart" parameter is provided
      if (getStartTime && !isNaN(getStartTime)) {
        const startDate = new Date(parseInt(getStartTime, 10)) // Convert milliseconds to Date object
        if (!isNaN(startDate.getTime())) {
          where = {
            createdAt: {
              [Op.gte]: startDate, // Greater than or equal to the startDate
            },
          }
        }
      }

      const allRequests = await Request.findAll({
        where,
        order: [['createdAt', 'DESC']],
      })

      if (!allRequests) {
        throw getRequestsFailedMsg
      }

      res.status(200).send(allRequests)
    } catch (error) {
      const errCode = error?.code || 500
      console.error(error)
      rollbar.error('Error in handleGetRequests function: ', error)
      return res.status(errCode).send('something-went-wrong')
    }
  },

  extractClientId: async (req, res, next) => {
    try {
      const { requesterclientid } = req.headers
      if (!validator.isUUID(requesterclientid)) {
        throw {
          ...clientIdRequiredMsg,
          token: requesterclientid,
        }
      }

      const userAgentString = req.headers['user-agent']
      const parser = new UAParser()
      const deviceInfo = parser.setUA(userAgentString).getResult()
      const userAgentObj = {
        userAgent: userAgentString,
        deviceType: deviceInfo.device.type || 'unknown',
        deviceModel: deviceInfo.device.model || 'unknown',
        os: deviceInfo.os.name + ' ' + deviceInfo.os.version,
        browser: deviceInfo.browser.name + ' ' + deviceInfo.browser.version,
      }

      req.body.userAgentObj = userAgentObj
      req.body.clientId = requesterclientid
      next()
    } catch (err) {
      console.error(err)
      res.status(403).send(err)
    }
  },
}

const allFieldsRequiredMsg = {
  message: 'all form fields are required, some were missing',
  code: 400,
}

const clientIdRequiredMsg = {
  message: 'client uuid is required, was not provided',
  code: 401,
}

const failedToCreateMsg = {
  message: 'failed to create request',
  code: 500,
}

const getRequestsFailedMsg = {
  message: 'failed to get all requests',
  code: 500,
}

const tooManyRequestsMsg = {
  message: 'Client has submitted too many requests recently',
  code: 429,
}

const spotifyFailureMsg = {
  message: 'Failed to authenticate with spotify API',
  code: 401,
}

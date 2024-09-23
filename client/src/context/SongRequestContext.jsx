import React, { createContext, useState, useEffect, useContext } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'

export const SongRequestContext = createContext()

export function SongRequestContextProvider({ children }) {
  const errorMsg = '*Required field'
  const submitErrorMsg =
    'Something went wrong when submitting your request. Please refresh and try again.'
  const [songName, setSongName] = useState('')
  const [songNameError, setSongNameError] = useState('')
  const [artistName, setArtistName] = useState('')
  const [artistNameError, setArtistNameError] = useState('')
  const [requestReason, setRequestReason] = useState('')
  const [requestReasonError, setRequestReasonError] = useState('')
  const [requestLoading, setRequestLoading] = useState(false)
  const [requestLimitReached, setRequestLimitReached] = useState(false)
  // const [requestBanWarning, setRequestBanWarning] = useState(false)
  // const [bannedFromRequesting, setBannedFromRequesting] = useState(false)
  const [submitError, setSubmitError] = useState(null)
  const [spotifySearchQuery, setSpotifySearchQuery] = useState('')
  const [spotifySearchResults, setSpotifySearchResults] = useState([])
  const [selectedSpotifySong, setSelectedSpotifySong] = useState(null)

  function onUpdateSongName(event) {
    setSongNameError('')
    setSongName(event.target.value)
  }
  function onUpdateArtistName(event) {
    setArtistNameError('')
    setArtistName(event.target.value)
  }
  function onUpdateRequestReason(event) {
    setRequestReasonError('')
    setRequestReason(event.target.value)
  }

  function _resetFields() {
    setSongName('')
    setSongNameError('')
    setArtistName('')
    setArtistNameError('')
    setRequestReason('')
    setRequestReasonError('')
    setSubmitError('')
  }

  function handleTooManyRequestsResponse() {
    setRequestLimitReached(true)
    activatePleaseWaitModal()
    setTimeout(() => {
      setRequestLimitReached(false)
    }, 120000)
  }

  function handleSubmitRequestForm() {
    setSongNameError('')
    setArtistNameError('')
    setRequestReasonError('')

    if (requestLimitReached) {
      activatePleaseWaitModal()
      return
    }
    if (requestLoading) {
      return
    }
    if (!songName) {
      setSongNameError(errorMsg)
      return
    }
    if (!artistName) {
      setArtistNameError(errorMsg)
      return
    }
    if (!requestReason) {
      setRequestReasonError(errorMsg)
      return
    }
    submitSongRequest()
  }

  function submitSongRequest() {
    // private function
    const reqBody = {
      songName,
      artistName,
      requestReason,
    }
    setSubmitError(null)
    setRequestLoading(true)
    setTimeout(() => {
      axios
        .post(`/api/request-song`, reqBody)
        .then(({ data }) => {
          if (data.message === 'please-wait-before-requesting') {
            handleTooManyRequestsResponse()
          } else {
            _resetFields()
            activateConfirmationModal(data)
          }
        })
        .catch((error) => {
          setSubmitError(submitErrorMsg)
          console.log('Error in submitSongRequest: ', error)
          console.log(error.status)
          if (error.status == 429) {
            console.log('429 response')
            handleTooManyRequestsResponse()
          }
        })
        .finally(() => {
          setRequestLoading(false)
        })
    }, 800) // create an increased sense of loading for song requests
  }

  function activateConfirmationModal() {
    Swal.fire({
      title: 'Success!',
      text: 'Your request has been submitted',
      icon: 'success',
      confirmButtonText: 'Great!',
    })
  }

  function activatePleaseWaitModal() {
    Swal.fire({
      title: 'Please wait!',
      text: "You've submitted too many requests recently. Please try again later.",
      icon: 'warning',
      confirmButtonText: 'Ok',
    })
  }

  useEffect(() => {
    if (spotifySearchQuery.length > 3) {
      querySpotify(spotifySearchQuery)
    }
  }, [spotifySearchQuery])

  function querySpotify(query) {
    axios
      .post('api/spotify/search', { query })
      .then(({ data }) => {
        setSpotifySearchResults(data)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  function handleSongSelection(track) {
    setSelectedSpotifySong(track)
  }

  return (
    <SongRequestContext.Provider
      value={{
        onUpdateSongName,
        onUpdateArtistName,
        onUpdateRequestReason,
        songName,
        songNameError,
        artistName,
        artistNameError,
        requestReason,
        requestReasonError,
        requestLoading,
        requestLimitReached,
        submitError,
        handleSubmitRequestForm,
        spotifySearchQuery,
        setSpotifySearchQuery,
        selectedSpotifySong,
        setSelectedSpotifySong,
        spotifySearchResults,
        handleSongSelection,
      }}
    >
      {children}
    </SongRequestContext.Provider>
  )
}

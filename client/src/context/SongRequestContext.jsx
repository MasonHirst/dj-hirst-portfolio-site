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
  const [spotifyLoading, setSpotifyLoading] = useState(false)

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
    setSelectedSpotifySong(null)
    setSpotifySearchQuery('')
    setSpotifySearchResults([])
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
    if (!songName && !selectedSpotifySong) {
      setSongNameError(errorMsg)
      return
    }
    if (!artistName && !selectedSpotifySong) {
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
      artistNames: [{ name: artistName }],
      requestReason,
      selectedSpotifySong,
    }
    console.log(selectedSpotifySong.artists)
    console.log(reqBody)
    // return
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
          if (error.status == 429) {
            handleTooManyRequestsResponse()
          }
        })
        .finally(() => {
          setRequestLoading(false)
        })
    }, 600) // create an increased sense of loading for song requests
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
    if (!spotifySearchQuery) {
      setSpotifySearchResults([])
      return
    }
    const delayDebounceFn = setTimeout(() => {
      if (spotifySearchQuery.length > 2) {
        querySpotify(spotifySearchQuery)
      }
    }, 500)

    // Cleanup function to clear the timeout if the query changes within 500ms
    return () => clearTimeout(delayDebounceFn)
  }, [spotifySearchQuery])

  function querySpotify(query) {
    if (!query || typeof query !== 'string') {
      console.error('invalid search query')
      return
    }
    setSpotifyLoading(true)
    axios
      .post('api/spotify/search', { query })
      .then(({ data }) => {
        setSpotifySearchResults(data)
      })
      .catch((error) => {
        console.error(error)
      })
      .finally(() => setSpotifyLoading(false))
  }

  function handleSongSelection(track) {
    _resetFields()
    setSelectedSpotifySong(track)
    // setSongName(track.name)
    // setArtistName(track.artists.map((artist) => artist.name).join(', '))
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
        setSpotifySearchResults,
        handleSongSelection,
        spotifyLoading,
      }}
    >
      {children}
    </SongRequestContext.Provider>
  )
}

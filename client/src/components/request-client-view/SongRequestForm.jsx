import { Button, TextField, Typography } from '@mui/material'
import React, { useContext, useMemo, useState } from 'react'
import { SongRequestContext } from '../../context/SongRequestContext'
import SpotifySearchForm from './SpotifySearchForm'
import spotifyLogoImg from '../../assetts/spotify-logo-official.png'
import { Search as SearchIcon, Close as CloseIcon } from '@mui/icons-material'

const SongRequestForm = ({ onSubmitForm, onSongNameChange }) => {
  const {
    songName,
    songNameError,
    artistName,
    artistNameError,
    requestReason,
    requestReasonError,
    requestLoading,
    onUpdateSongName,
    onUpdateArtistName,
    onUpdateRequestReason,
    submitError,
    handleSubmitRequestForm,
    spotifySearchMode,
    setSpotifySearchMode,
    spotifySearchQuery,
    selectedSpotifySong,
  } = useContext(SongRequestContext)

  const showFinalFormPeices = useMemo(() => {
    return !spotifySearchMode || selectedSpotifySong
  }, [spotifySearchMode, selectedSpotifySong])

  return (
    <form
      style={{
        marginTop: '1rem',
        width: 'calc(100vw - 15px)',
        maxWidth: '500px',
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100%',
      }}
    >
      <Button
        variant='contained'
        startIcon={<SearchIcon />}
        onClick={handleOpen}
        fullWidth
        sx={{
          backgroundColor: '#191414',
        }}
      >
        Search Spotify
        <img src={spotifyLogoImg} style={{
          height: '2.5rem',
          marginLeft: '.7rem'
        }} />
      </Button>
      {spotifySearchMode ? (
        <SpotifySearchForm />
      ) : (
        <>
          <TextField
            label='Song name'
            variant='outlined'
            fullWidth
            size='small'
            margin='normal'
            value={songName}
            onChange={onUpdateSongName}
            error={!!songNameError}
            inputProps={{ maxLength: 60 }}
            disabled={requestLoading}
          />
          <Typography variant='subtitle2' className='error' color='error'>
            {songNameError}
          </Typography>

          <TextField
            label='Artist name'
            variant='outlined'
            fullWidth
            size='small'
            margin='normal'
            value={artistName}
            onChange={onUpdateArtistName}
            error={!!artistNameError}
            inputProps={{ maxLength: 60 }}
            disabled={requestLoading}
          />
          <Typography variant='subtitle2' className='error' color='error'>
            {artistNameError}
          </Typography>
        </>
      )}

      {showFinalFormPeices && (
        <>
          <TextField
            label='Why are you requesting this song?'
            variant='outlined'
            fullWidth
            size='small'
            margin='normal'
            value={requestReason}
            onChange={onUpdateRequestReason}
            error={!!requestReasonError}
            inputProps={{ maxLength: 400 }}
            multiline
            minRows={2}
            maxRows={5}
            disabled={requestLoading}
          />

          <Typography variant='subtitle2' className='error' color='error'>
            {requestReasonError}
          </Typography>

          <Typography
            variant='subtitle2'
            className='error'
            color='error'
            sx={{
              marginTop: '15px',
              marginBottom: '-10px',
              textAlign: 'center',
            }}
          >
            {submitError}
          </Typography>

          <Button
            variant='contained'
            onClick={handleSubmitRequestForm}
            sx={{
              marginTop: '30px',
              textTransform: 'none',
              fontWeight: 'bold',
              fontSize: '18px',
            }}
            disabled={requestLoading}
          >
            Submit request
          </Button>
        </>
      )}
    </form>
  )
}

export default SongRequestForm

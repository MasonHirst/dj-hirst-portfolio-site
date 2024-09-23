import { Button, TextField, Typography } from '@mui/material'
import React, { useContext, useMemo, useState } from 'react'
import { SongRequestContext } from '../../context/SongRequestContext'
import SpotifySearchModal from './SpotifySearchModal'
import spotifyLogoImg from '../../assetts/spotify-logo-official.png'
import { Search as SearchIcon, Close as CloseIcon } from '@mui/icons-material'
import SpotifyTrackItem from './SpotifyTrackItem'

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
    spotifySearchQuery,
    selectedSpotifySong,
    setSelectedSpotifySong,
  } = useContext(SongRequestContext)
  const [spotifySearchModalOpen, setSpotifySearchModalOpen] = useState(false)

  function handleOpenSpotifySearchModal() {
    setSpotifySearchModalOpen(true)
  }

  function handleClearSelectedSong() {
    setSelectedSpotifySong(null)
  }

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
        onClick={handleOpenSpotifySearchModal}
        fullWidth
        sx={{
          backgroundColor: '#191414',
        }}
      >
        Search Spotify
        <img
          src={spotifyLogoImg}
          style={{
            height: '2.5rem',
            marginLeft: '.7rem',
          }}
        />
      </Button>
      <SpotifySearchModal
        open={spotifySearchModalOpen}
        setOpen={setSpotifySearchModalOpen}
      />
      {selectedSpotifySong ? (
        <>
          <SpotifyTrackItem
            track={selectedSpotifySong}
            sx={{
              marginTop: '1rem',
            }}
          />
          <Button
            size='small'
            onClick={handleClearSelectedSong}
            sx={{
              // color: '#1db954',
              fontSize: '.9rem !important',
            }}
          >
            Use manual form instead
          </Button>
        </>
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
    </form>
  )
}

export default SongRequestForm

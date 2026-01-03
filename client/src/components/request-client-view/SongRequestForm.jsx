import { Button, TextField, Typography } from '@mui/material';
import React, { useContext, useState } from 'react';
import { SongRequestContext } from '../../context/SongRequestContext';
import SpotifySearchModal from './SpotifySearchModal';
import spotifyLogoImg from '../../assetts/spotify-logo-official.png';
import { Search as SearchIcon } from '@mui/icons-material';
import SpotifyTrackItem from './SpotifyTrackItem';
import Divider from '@mui/material/Divider';

const SongRequestForm = ({ onSubmitForm, onSongNameChange }) => {
  const {
    requestReason,
    requestReasonError,
    requestLoading,
    onUpdateRequestReason,
    submitError,
    handleSubmitRequestForm,
    spotifySearchQuery,
    noSpotifySongError,
    setNoSpotifySongError,
    selectedSpotifySong,
    setSelectedSpotifySong,
  } = useContext(SongRequestContext);
  const [spotifySearchModalOpen, setSpotifySearchModalOpen] = useState(false);
  const [showManualFields, setShowManualFields] = useState(false);

  function handleOpenSpotifySearchModal() {
    setNoSpotifySongError(null);
    setSpotifySearchModalOpen(true);
  }

  function handleClearSelectedSong() {
    setSelectedSpotifySong(null);
  }

  function handleShowManualFields() {
    setShowManualFields(true);
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
          marginTop: '10px',
          marginBottom: '15px',
        }}
      >
        Search for a Song
        <img
          src={spotifyLogoImg}
          alt='Spotify Logo'
          style={{
            height: '2.5rem',
            marginLeft: '.7rem',
          }}
        />
      </Button>

      <Typography variant='subtitle2' className='error' color='error'>
        {noSpotifySongError}
      </Typography>

      <SpotifySearchModal
        open={spotifySearchModalOpen}
        setOpen={setSpotifySearchModalOpen}
      />

      {selectedSpotifySong && (
        <SpotifyTrackItem
          track={selectedSpotifySong}
          sx={{
            marginTop: '1rem',
          }}
        />
      )}

      <TextField
        label='Why should the DJ play this song?'
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
  );
};

export default SongRequestForm;

import React, { useContext, useState } from 'react'
import {
  Dialog,
  DialogContent,
  TextField,
  IconButton,
  List,
  CircularProgress,
  Typography,
  Box,
  Divider,
  InputAdornment,
} from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import { SongRequestContext } from '../../context/SongRequestContext'
import SpotifyTrackItem from './SpotifyTrackItem'
import Swal from 'sweetalert2'

const SpotifySearchModal = ({ open, setOpen }) => {
  const {
    spotifySearchQuery,
    setSpotifySearchQuery,
    spotifySearchResults,
    handleSongSelection,
    setSpotifySearchResults,
    spotifyLoading,
  } = useContext(SongRequestContext)

  // Handle search input change and fetch data from server
  function handleSearchInput(e) {
    setSpotifySearchQuery(e.target.value)
  }

  function handleClose() {
    setOpen(false)
    // setSpotifySearchQuery('')
    // setSpotifySearchResults([])
  }

  function handleClear() {
    setSpotifySearchQuery('')
    setSpotifySearchResults([])
  }

  function selectTrack(track) {
    if (track.explicit) {
      Swal.fire({
        title: 'This song is explicit',
        text: 'Hirst Entertainment does not accept explicit song requests. Please select a clean version, or a different song.',
        icon: 'warning',
        confirmButtonText: 'Ok',
        customClass: {
          popup: 'custom-swal-popup',
        },
      })
    } else {
      handleSongSelection(track)
      handleClose()
    }
  }

  return (
    <Dialog fullScreen open={open} onClose={handleClose}>
      <DialogContent
        sx={{
          padding: '1rem',
        }}
      >
        <Box
          display='flex'
          flexDirection='row'
          justifyContent='space-between'
          alignItems='center'
          gap={2}
        >
          <IconButton
            edge='end'
            color='inherit'
            onClick={handleClose}
            aria-label='close'
            sx={{
              marginLeft: '-0.3rem',
            }}
          >
            <ArrowBackIcon />
          </IconButton>
          <TextField
            autoFocus
            placeholder='Search Spotify for music'
            fullWidth
            size='small'
            value={spotifySearchQuery}
            onChange={handleSearchInput}
            InputProps={{
              endAdornment: spotifySearchQuery && (
                <InputAdornment position='end'>
                  <IconButton onClick={handleClear} edge='end'>
                    <CloseRoundedIcon
                      sx={{
                        opacity: 0.8,
                      }}
                    />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                '&:hover fieldset': {
                  borderColor: '#1DB954', // Change border color on hover
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#1DB954', // Spotify green border when focused
                },
              },
            }}
            variant='outlined'
          />
        </Box>
        {!spotifySearchResults.length && !spotifyLoading && (
          <Typography
            variant='caption'
            sx={{
              display: 'block',
              opacity: 0.7,
              textAlign: 'center',
              marginTop: '.7rem',
            }}
          >
            Start typing at least 3 characters to search
          </Typography>
        )}
        {spotifyLoading && (
          <CircularProgress
            size={24}
            sx={{ margin: '20px', color: '#191414' }}
          />
        )}
        <List>
          {spotifySearchResults.length > 0 &&
            spotifySearchResults.map((track) => (
              <SpotifyTrackItem
                key={track.id}
                clickable
                track={track}
                selectTrack={selectTrack}
                sx={{
                  padding: '.2rem 0',
                }}
              />
            ))}
        </List>
        {spotifySearchResults.length > 0 && (
          <Divider
            sx={{
              margin: '1rem 0',
              fontSize: '.9rem',
              opacity: 0.9,
              borderBottomWidth: '5px',
            }}
          >
            Showing top {spotifySearchResults.length} search results
          </Divider>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default SpotifySearchModal

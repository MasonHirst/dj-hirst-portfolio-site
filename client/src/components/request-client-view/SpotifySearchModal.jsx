import React, { useContext, useState } from 'react'
import {
  Dialog,
  DialogContent,
  TextField,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  CircularProgress,
  Button,
  AppBar,
  Toolbar,
  Typography,
  Box,
} from '@mui/material'
import { Close as CloseIcon } from '@mui/icons-material'
import { SongRequestContext } from '../../context/SongRequestContext'

const SpotifySearchModal = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(false)
  const {
    spotifySearchQuery,
    setSpotifySearchQuery,
    spotifySearchResults,
    handleSongSelection,
  } = useContext(SongRequestContext)

  // Handle search input change and fetch data from server
  const handleSearchInput = async (e) => {
    setSpotifySearchQuery(e.target.value)
  }

  function handleClose() {
    setOpen(false)
  }

  return (
    <Dialog fullScreen open={open} onClose={handleClose}>
      <DialogContent
        sx={{
          padding: '.8rem',
        }}
      >
        <Box
          display='flex'
          flexDirection='row'
          justifyContent='space-between'
          alignItems='center'
          gap={3}
        >
          <IconButton
            edge='end'
            color='inherit'
            onClick={handleClose}
            aria-label='close'
          >
            <CloseIcon />
          </IconButton>
          <TextField
            autoFocus
            placeholder='Search Spotify for music'
            fullWidth
            size='small'
            value={spotifySearchQuery}
            onChange={handleSearchInput}
            InputProps={{
              sx: {},
            }}
            variant='outlined'
          />
        </Box>
        <Typography
          variant='caption'
          sx={{
            opacity: 0.7,
            textAlign: 'center',
          }}
        >
          Start typing at least 3 characters to search
        </Typography>

        {loading && <CircularProgress size={24} sx={{ margin: '20px' }} />}

        <List>
          {spotifySearchResults.length > 0 &&
            spotifySearchResults.map((track) => (
              <ListItem
                key={track.id}
                button
                onClick={() => handleSongSelection(track)}
              >
                <ListItemAvatar>
                  <Avatar
                    variant='square'
                    src={track.album.images[1]?.url} // Medium album cover
                    alt={track.name}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={track.name}
                  secondary={track.artists
                    .map((artist) => artist.name)
                    .join(', ')}
                />
              </ListItem>
            ))}
        </List>
      </DialogContent>
    </Dialog>
  )
}

export default SpotifySearchModal

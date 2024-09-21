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
import { Search as SearchIcon, Close as CloseIcon } from '@mui/icons-material'
import axios from 'axios'
import spotifyLogoImg from '../../assetts/spotify-logo-official.png'
import { SongRequestContext } from '../../context/SongRequestContext'

const SpotifySearchForm = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [results, setResults] = useState([])
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const { setSpotifySearchMode } = useContext(SongRequestContext)

  // Handle search input change and fetch data from server
  const handleSearchChange = async (e) => {
    const query = e.target.value
    setSearchTerm(query)
    if (query.length > 2) {
      setLoading(true)
      try {
        const response = await axios.get(`/your-server-endpoint?query=${query}`)
        setResults(response.data)
      } catch (error) {
        console.error('Error fetching Spotify data:', error)
      } finally {
        setLoading(false)
      }
    } else {
      setResults([])
    }
  }

  // Open the modal when the search button is clicked
  const handleOpen = () => {
    setOpen(true)
  }

  // Close the modal
  const handleClose = () => {
    setOpen(false)
    setSearchTerm('')
    setResults([])
  }

  function handleUseManualForm() {
    setSpotifySearchMode(false)
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
      }}
    >
      {/* Search Button to open the modal */}
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

      <Button
        sx={{
          fontWeight: 'lighter',
          fontSize: '.9rem !important',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
        size='small'
        onClick={handleUseManualForm}
      >
        Use manual form instead
      </Button>

      {/* Full-screen Modal/Dialog for search */}
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
              value={searchTerm}
              onChange={handleSearchChange}
              InputProps={{
                sx: {},
              }}
              variant='outlined'
            />
          </Box>

          {/* Loading Spinner */}
          {loading && <CircularProgress size={24} sx={{ margin: '20px' }} />}

          {/* Search Results List */}
          <List>
            {results.length > 0 &&
              results.map((track) => (
                <ListItem
                  key={track.id}
                  button
                  onClick={() => {
                    setSearchTerm(track.name) // Set selected track name
                    handleClose() // Close modal after selection
                  }}
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
    </Box>
  )
}

export default SpotifySearchForm

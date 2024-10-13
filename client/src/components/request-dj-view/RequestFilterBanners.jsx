import React, { useContext } from 'react'
import { DjContext } from '../../context/DjContext'
import { Box, IconButton, Tooltip, Typography } from '@mui/material'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'

const RequestFilterBanners = () => {
  const {
    clientIdFilter,
    setClientIdFilter,
    songNameFilter,
    setSongNameFilter,
  } = useContext(DjContext)

  function clearClientFilter() {
    setClientIdFilter(null)
  }

  function clearSongNameFilter() {
    setSongNameFilter(null)
  }

  return (
    <>
      {clientIdFilter && (
        <Box
          sx={{
            marginBottom: '1rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: '#f0f0f0',
            padding: '0.5rem 1rem',
            borderRadius: '4px',
          }}
        >
          <Typography variant='body1'>
            Filtering results by client ID: <strong>{clientIdFilter}</strong>
          </Typography>
          <Tooltip title='Clear filter'>
            <IconButton onClick={clearClientFilter}>
              <CloseRoundedIcon />
            </IconButton>
          </Tooltip>
        </Box>
      )}
      {songNameFilter && (
        <Box
          sx={{
            marginBottom: '1rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: '#f0f0f0',
            padding: '0.5rem 1rem',
            borderRadius: '4px',
          }}
        >
          <Typography variant='body1'>
            Filtering results by song name: <strong>{songNameFilter}</strong>
          </Typography>
          <Tooltip title='Clear filter'>
            <IconButton onClick={clearSongNameFilter}>
              <CloseRoundedIcon />
            </IconButton>
          </Tooltip>
        </Box>
      )}
    </>
  )
}

export default RequestFilterBanners

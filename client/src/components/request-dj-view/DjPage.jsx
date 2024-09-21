import { Box, IconButton, Typography } from '@mui/material'
import React, { useEffect, useContext } from 'react'
import RequestHourFilter from './RequestHourFilter'
import RequestsTable from './RequestsTable'
import { DesignContext } from '../../context/DesignContext'
import { DjContext } from '../../context/DjContext'
import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded'

const DjPage = () => {
  const { setShowHeader } = useContext(DesignContext)
  const { handleRefreshRequests, songFetchLoading } = useContext(DjContext)

  useEffect(() => {
    setShowHeader(false)
    return () => {
      setShowHeader(true)
    }
  }, [])

  return (
    <Box
      sx={{
        padding: { xs: '0.3rem', sm: '1rem' },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'space-between',
          alignItems: 'top',
          gap: 2,
          paddingBottom: '1rem',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            gap: 1,
          }}
        >
          <Typography
            variant='h4'
            sx={{
              margin: 0,
            }}
          >
            Song Requests
          </Typography>
          <IconButton
            onClick={handleRefreshRequests}
            disabled={songFetchLoading}
          >
            <RefreshRoundedIcon />
          </IconButton>
        </Box>

        <RequestHourFilter />
      </Box>
      <RequestsTable />
    </Box>
  )
}

export default DjPage

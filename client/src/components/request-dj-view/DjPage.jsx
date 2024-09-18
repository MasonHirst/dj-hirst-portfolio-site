import { Box } from '@mui/material'
import React, { useEffect } from 'react'
import RequestHourFilter from './RequestHourFilter'
import RequestsTable from './RequestsTable'

const DjPage = () => {
  return (
    <Box sx={{
      padding: {xs: '0.3rem', sm: '1rem'}
    }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <h2>Song Requests</h2>
        <RequestHourFilter />
      </Box>
      <RequestsTable />
    </Box>
  )
}

export default DjPage

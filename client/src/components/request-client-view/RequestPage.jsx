import React, { useState, useEffect, useContext } from 'react'
import { Box, Button, TextField, Typography } from '@mui/material'
import axios from 'axios'
import Swal from 'sweetalert2'
import { DesignContext } from '../../context/DesignContext'
import SongRequestForm from './SongRequestForm'

const RequestPage = () => {
  const { setShowHeader } = useContext(DesignContext)

  // useEffect(() => {
  //   setShowHeader(false)
  //   return () => {
  //     setShowHeader(true)
  //   }
  // }, [])

  return (
    // HTML stuff goes here
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        // justifyContent: 'space-between',
        marginTop: '1rem',
        marginBottom: '2rem',
        flexGrow: 1,
      }}
    >
      <Typography
        variant='h4'
        sx={{
          textAlign: 'center',
        }}
      >
        Request a song!
      </Typography>
      <Typography
        variant='caption'
        sx={{
          textAlign: 'center',
        }}
      >
        You may request up to 3 times within 5 minutes
      </Typography>
      <SongRequestForm />
    </Box>
  )
}

export default RequestPage

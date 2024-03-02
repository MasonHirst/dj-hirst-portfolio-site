import React, { useState } from 'react'
import './formRouter.css'
import { useEffect, useRef } from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import { useNavigate } from 'react-router-dom'

const FormRouter = () => {
  const navigate = useNavigate()
  const [iframeLoading, setIframeLoading] = useState(true)
  const iframeRef = useRef(null)

  useEffect(() => {
    const handleLoad = () => {
      setIframeLoading(false)
    }

    const iframe = iframeRef.current
    if (iframe) {
      iframe.addEventListener('load', handleLoad)
    }

    return () => {
      if (iframe) {
        iframe.removeEventListener('load', handleLoad)
      }
    }
  }, [])

  return (
    <div className='form-wrapper'>
      {iframeLoading && (
        <CircularProgress
          size={70}
          sx={{
            marginTop: '7rem',
          }}
        />
      )}
      <iframe
        ref={iframeRef}
        src='https://docs.google.com/forms/d/e/1FAIpQLSc6qsXbw1iJnahJoYMukByRTscaKxs3N_TXowJIS7iJ6x3biw/viewform?embedded=true'
        frameBorder='0'
        className='form-iframe'
        style={{
          opacity: iframeLoading ? 0 : 1,
        }}
      >
        Loading…
      </iframe>
    </div>
  )
}

export default FormRouter

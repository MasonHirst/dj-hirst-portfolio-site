import React, { useState, useEffect, useRef } from 'react'
import './formRouter.css'
import CircularProgress from '@mui/material/CircularProgress'
import Swal from 'sweetalert2'
// import { useNavigate } from 'react-router-dom'
const googleFormUrl =
  'https://docs.google.com/forms/d/e/1FAIpQLSc6qsXbw1iJnahJoYMukByRTscaKxs3N_TXowJIS7iJ6x3biw/viewform?embedded=true'

const FormRouter = () => {
  // const navigate = useNavigate();
  const [iframeLoading, setIframeLoading] = useState(true)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const iframeRef = useRef(null)

  const iframeLoadingRef = useRef(iframeLoading)
  useEffect(() => {
    iframeLoadingRef.current = iframeLoading
  }, [iframeLoading])

  const handleLoad = () => {
    if (iframeLoadingRef.current) {
      // inital load detected
      setIframeLoading(false)

    } else {
      // form submitted detected
      setIsSubmitted(true)
      setTimeout(() => {
        onFormSubmitted()
      }, 1000)
    }
  }

  useEffect(() => {
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

  function onFormSubmitted() {
    Swal.fire({
      title: 'Form submitted!',
      html: `I should have your response in my email soon. For the fastest response, please text or call me at <p style="font-size: 1.1rem;"><strong>(385) 200-1306</strong>.</p>`,
      icon: 'success',
    })
  }

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
        src={googleFormUrl}
        frameBorder='0'
        className={isSubmitted ? 'form-iframe submitted-height' : 'form-iframe'}
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

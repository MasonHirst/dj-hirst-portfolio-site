import React from 'react'
import './heroSection.css'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const HeroSection = () => {
  const navigate = useNavigate()

  return (
    <div className='hero-container'>
      <div className='hero-bg-img'>
        <div className='photo-fader-div' />
      </div>

      <div className='app-container content-wrapper'>
        <section>
          <h1>Welcome to Hirst Entertainment</h1>
          <p>Mobile DJ & MC services for your event</p>
        </section>
        <Button
          onClick={() => navigate('/form')}
          variant='contained'
          sx={{
            fontSize: {xs: '0.9rem !important', sm: '1.3rem !important'},
          }}
        >
          Get a quote for your event
        </Button>
      </div>
    </div>
  )
}

export default HeroSection

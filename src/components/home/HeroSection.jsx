import React from 'react'
import './heroSection.css'
import { Button, Link } from '@mui/material'
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
          <h1>Mason Hirst Entertainment</h1>
          <p>A budget-friendly DJ/MC for your wedding or event</p>
        </section>
        <Button onClick={() => navigate('/form')} variant='contained'>Get a quote</Button>
      </div>
    </div>
  )
}

export default HeroSection

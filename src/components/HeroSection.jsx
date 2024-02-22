import React from 'react'
import './heroSection.css'
import { Button, Link } from '@mui/material'

const HeroSection = ({headerHeight}) => {
  return (
    <div className='hero-container' style={{marginTop: headerHeight}}>
      <div className='hero-bg-img'>
        <div className='photo-fader-div' />
      </div>

      <div className='app-container content-wrapper'>
        <section>
          <h1>Mason Hirst Entertainment</h1>
          <p>
            A budget-friendly DJ/MC for your wedding or event
          </p>
        </section>
        <Link
          href='https://docs.google.com/forms/d/e/1FAIpQLSc6qsXbw1iJnahJoYMukByRTscaKxs3N_TXowJIS7iJ6x3biw/viewform?usp=sf_link'
          target='_blank'
        >
          <Button variant='contained'>Get a quote</Button>
        </Link>
      </div>
    </div>
  )
}

export default HeroSection

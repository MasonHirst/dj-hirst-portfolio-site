import React from 'react'
import './mainPageBody.css'
import Link from '@mui/material/Link'

const MainPageBody = () => {
  return (
    <div className='app-container main-body'>
      <h1 className='title'>DJ/MC</h1>
      <p className='description'>
        My name is Mason Hirst, and I am a budget-friendly DJ/MC for your
        wedding or event. I am based in northern Utah County and love good
        music!
      </p>
      <p className='contact-info'>
        <Link underline='none' href='https://docs.google.com/forms/d/e/1FAIpQLSc6qsXbw1iJnahJoYMukByRTscaKxs3N_TXowJIS7iJ6x3biw/viewform?usp=sf_link' target='_blank'>Contact me</Link> today to discuss your event and
        how I can assist you in creating an unforgettable experience!
      </p>
    </div>
  )
}

export default MainPageBody

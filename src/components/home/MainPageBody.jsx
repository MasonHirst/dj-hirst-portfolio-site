import React from 'react'
import './mainPageBody.css'
import Link from '@mui/material/Link'
import { useNavigate } from 'react-router-dom'

const MainPageBody = () => {
  const navigate = useNavigate()

  function goToForm() {
    navigate('/form')
    window.scrollTo(0, 0);
  }
  
  return (
    <div className='app-container main-body'>
      <h1 className='title'>DJ/MC</h1>
      <p className='description'>
        My name is Mason Hirst, and I am a budget-friendly DJ/MC for your
        wedding or event. I am based in northern Utah County and love good
        music!
      </p>
      <p className='contact-info'>
        <Link underline='none' onClick={goToForm}>Contact me</Link> today to discuss your event and
        how I can assist you in creating an unforgettable experience!
      </p>
    </div>
  )
}

export default MainPageBody

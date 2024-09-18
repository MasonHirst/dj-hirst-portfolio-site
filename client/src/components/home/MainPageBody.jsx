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
      <h1 className='title'>About me</h1>
      <p className='description'>
        My name is Mason, and I have always loved good sound! I've built home 
        theater surround sound systems, a home recording studio (My brother and 
        I have a song on Spotify and Apple Music!), and now I'm into Mobile sound!
      </p>
      <p className='description'>
        I love connecting with people, and being a part of so many special days. Whether 
        it's a wedding, birthday, dance, etc, I love seeing happy people enjoy good music.
        I strive to enable you to enjoy your big day without the stress of running the show.
      </p>
      <br />
      <p className='contact-info'>
        <Link underline='none' onClick={goToForm}>Contact me</Link> today to plan an unforgettable experience!
      </p>
    </div>
  )
}

export default MainPageBody

import React, { useContext, useEffect, useRef, useState } from 'react'
import './header.css'
import PhoneIcon from '@mui/icons-material/Phone'
import EmailIcon from '@mui/icons-material/Email'
import Link from '@mui/material/Link'
import { useNavigate } from 'react-router-dom'
import HE_logo_black_transparent from '../assetts/HE_logo_black_trimmed.png'
import { DesignContext } from '../context/DesignContext'

const Header = () => {
  const { showHeader } = useContext(DesignContext)
  const navigate = useNavigate()

  const iconsSX = {
    fontSize: { xs: '1rem', md: '1.4rem' },
  }
  const linksSX = {
    fontSize: { xs: '1rem !important', md: '1.1rem !important' },
  }

  return (
    <header className={`${!showHeader ? 'display-none' : ''}`}>
      <img
        src={HE_logo_black_transparent}
        alt='Hirst Entertainment'
        className={`header-logo-img`}
        onClick={() => navigate('/')}
      />
      <section className='header-contact-container'>
        <Link
          href='tel:3852001306'
          underline='none'
          className='contact-text-container'
          sx={linksSX}
        >
          <PhoneIcon sx={iconsSX} />
          (385) 200-1306
        </Link>
        <Link
          href='mailto:hirst.entertainment@email.com'
          underline='none'
          className='contact-text-container'
          sx={linksSX}
        >
          <EmailIcon sx={iconsSX} />
          hirst.entertainment@gmail.com
        </Link>
      </section>
    </header>
  )
}

export default Header

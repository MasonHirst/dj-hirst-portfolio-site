import React, { useEffect, useRef, useState } from 'react'
import './header.css'
import hirstLogoLight from '../assetts/light_logo_transparent.png'
import hirstLogoDark from '../assetts/dark_logo_transparent.png'
import { Typography } from '@mui/material'
import PhoneIcon from '@mui/icons-material/Phone'
import EmailIcon from '@mui/icons-material/Email'
import Link from '@mui/material/Link'

const Header = ({setHeaderHeight}) => {
  const [shrinkLogo, setShrinkLogo] = useState(false)
  const headerRef = useRef()

  useEffect(() => {
    const handleScroll = () => {
      setShrinkLogo(window.scrollY > 100)
    }

    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])


  useEffect(() => {
    // Define the ResizeObserver callback
    const resizeObserver = new ResizeObserver(entries => {
      for (let entry of entries) {
        // Assuming you're only observing one element (the header)
        setHeaderHeight(entry.borderBoxSize[0].blockSize);
      }
    });

    // Start observing the header
    if (headerRef.current) {
      resizeObserver.observe(headerRef.current);
    }

    // Cleanup function to disconnect the observer
    return () => {
      if (headerRef.current) {
        resizeObserver.disconnect();
      }
    };
  }, []);


  return (
    <header className={`${shrinkLogo ? 'shadow' : ''}`} ref={headerRef}>
      <img
        src={hirstLogoDark}
        alt='Hirst Entertainment'
        className={`header-logo-img ${shrinkLogo ? 'shrink' : ''}`}
      />
      <section className='header-contact-container'>
        <Link
          href='tel:3852001306'
          underline='none'
          className='contact-text-container'
        >
          <PhoneIcon />
          (385) 200-1306
        </Link>
        <Link
          href='mailto:example@email.com'
          underline='none'
          className='contact-text-container'
        >
          <EmailIcon />
          hirst.entertainment@gmail.com
        </Link>
      </section>
    </header>
  )
}

export default Header

import React, { useContext } from 'react'
import './footer.css'
import PhoneIcon from '@mui/icons-material/Phone'
import EmailIcon from '@mui/icons-material/Email'
import Link from '@mui/material/Link'
import FacebookIcon from '@mui/icons-material/Facebook'
import { useNavigate } from 'react-router-dom'
import { DesignContext } from '../context/DesignContext'

const Footer = () => {
  const { showFooter } = useContext(DesignContext)
  const navigate = useNavigate()
  const navLinks = [
    { label: 'Home', navPath: '/' },
    { label: 'Form', navPath: '/form' },
    { label: 'Payments', navPath: '/payments' },
  ]

  function navigateApp(url) {
    navigate(url)
    window.scroll(0, 0)
  }

  if (!showFooter) {
    return
  }
  return (
    <footer
      className={`app-container ${!showFooter ? 'display-none' : ''}`}
      style={{
        paddingBottom: '3rem',
      }}
    >
      <h2>Hirst Entertainment</h2>
      <nav>
        {navLinks.map((link) => {
          return (
            <Link
              onClick={() => navigateApp(link.navPath)}
              underline='hover'
              key={link.label}
              sx={{
                cursor: 'pointer',
                fontSize: '1.3rem',
              }}
            >
              {link.label}
            </Link>
          )
        })}
      </nav>
      <Link
        href='https://www.facebook.com/profile.php?id=61556196087305'
        target='_blank'
      >
        <FacebookIcon sx={{ fontSize: 60 }} />
      </Link>
      <Link
        href='tel:3852001306'
        underline='none'
        className='contact-text-container'
      >
        <PhoneIcon />
        (385) 200-1306
      </Link>
      <Link
        href='mailto:hirst.entertainment@email.com'
        underline='none'
        className='contact-text-container'
      >
        <EmailIcon
          sx={{
            display: { xs: 'none', sm: 'block' },
          }}
        />
        hirst.entertainment@gmail.com
      </Link>
    </footer>
  )
}

export default Footer

import React from 'react'
import './footer.css'
import PhoneIcon from '@mui/icons-material/Phone'
import EmailIcon from '@mui/icons-material/Email'
import Link from '@mui/material/Link'
import FacebookIcon from '@mui/icons-material/Facebook'
import { useNavigate } from 'react-router-dom'

const Footer = () => {
  const navigate = useNavigate()
  const navLinks = [
    {label: 'Home', navPath: '/'},
    {label: 'Form', navPath: '/form'},
    {label: 'Payments', navPath: '/payments'}
  ]

  function navigateApp(url) {
    navigate(url)
    window.scroll(0, 0)
  }
  
  return (
    <footer className='app-container'>
      <h2>Mason Hirst Entertainment</h2>
      <nav>
        {navLinks.map(link => {
          return (
            <Link
            onClick={() => navigateApp(link.navPath)}
            underline='hover'
            sx={{
              cursor: 'pointer',
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
        <EmailIcon sx={{
          display: { xs: 'none', sm: 'block'},
        }} />
        hirst.entertainment@gmail.com
      </Link>
    </footer>
  )
}

export default Footer

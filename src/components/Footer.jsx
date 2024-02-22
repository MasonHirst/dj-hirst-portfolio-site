import React from 'react'
import './footer.css'
import PhoneIcon from '@mui/icons-material/Phone'
import EmailIcon from '@mui/icons-material/Email'
import Link from '@mui/material/Link'
import FacebookIcon from '@mui/icons-material/Facebook';

const Footer = () => {
  return (
    <footer className='app-container'>
      <h2>Mason Hirst Entertainment</h2>
      <Link href='https://www.facebook.com/profile.php?id=61556196087305' target='_blank'>
        <FacebookIcon />
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
          href='mailto:example@email.com'
          underline='none'
          className='contact-text-container'
        >
          <EmailIcon />
          hirst.entertainment@gmail.com
        </Link>
    </footer>
  )
}

export default Footer
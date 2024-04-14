import React from 'react'
import './paymentMethod.css'
import { useMediaQuery } from '@mui/material'
import Button from '@mui/material/Button'

import Link from '@mui/material/Link'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import Dialog from '@mui/material/Dialog'
import LaunchIcon from '@mui/icons-material/Launch'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'

const PaymentMethod = ({ method, close }) => {
  const is500Screen = useMediaQuery('(max-width: 500px)')
  const {
    logoPath,
    mainInstructions,
    directPayLink,
    directPayLinkLabel,
    searchableCode,
    scanImgPath,
    label,
    specialInstructions,
  } = method || {}

  function handleCopyCode() {
    navigator.clipboard.writeText(searchableCode)
  }

  return (
    <Dialog
      onClose={() => close()}
      aria-labelledby='payment method dialog'
      open={!!label}
      PaperProps={{
        style: {
          borderRadius: !is500Screen && 15,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: is500Screen ? 'flex-start' : 'center',
          borderRadius: '12px',
          gap: '2rem',
          minWidth: is500Screen
            ? 'calc(100vw - 20px)'
            : 'min(850px, calc(100vw - 16px))',
          padding: is500Screen ? '70px 14px' : '50px 50px',
        },
      }}
    >
      <IconButton
        aria-label='close'
        onClick={() => close()}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
        }}
      >
        <CloseIcon sx={{ fontSize: 40 }} />
      </IconButton>
      <section className='dialog-header'>
        <h1>{label}</h1>
        <img src={logoPath} alt={label + ' logo'} className='method-logo' />
      </section>
      <h3
        style={{
          textAlign: 'center',
          margin: 0
        }}
      >
        {mainInstructions}
      </h3>
      {directPayLink && (
        <Link
          href={directPayLink}
          target='_blank'
          sx={{
            fontSize: '1.2rem',
            display: 'flex',
            alignItems: 'center',
            gap: '.5rem',
          }}
        >
          {directPayLinkLabel}
          <LaunchIcon sx={{ marginBottom: '-2px' }} />
        </Link>
      )}
      <section className='search-code-cont'>
        <p
          style={{
            fontWeight: 'bold',
            fontSize: '1.3rem',
          }}
        >
          {searchableCode}
        </p>
        <Button
          onClick={handleCopyCode}
          endIcon={<ContentCopyIcon />}
          sx={{ textTransform: 'none', fontSize: '17px', fontWeight: 'bold' }}
        >
          copy
        </Button>
      </section>
      {scanImgPath && (
        <img src={scanImgPath} alt={label + ' QR code'} className='scan-img' />
      )}

      <p style={{ textAlign: 'center', maxWidth: '400px' }}>*{specialInstructions}</p>
    </Dialog>
  )
}

export default PaymentMethod

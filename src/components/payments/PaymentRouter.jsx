import React, { useState } from 'react'
import './paymentRouter.css'
import PaymentMethod from './PaymentMethod'
import zelleLogo from '../../assetts/zelle-logo-small.png'
import venmoLogo from '../../assetts/venmo_logo.png'
import venmoScan from '../../assetts/venmo-scan.jpg'
import paypalLogo from '../../assetts/paypal-logo-small.png'
import paypalScan from '../../assetts/paypal-scan.jpeg'
import googlePayLogo from '../../assetts/google-pay-logo-button.png'
import googlePayScan from '../../assetts/google-pay-scan.jpg'

const PaymentRouter = () => {
  const [focusedMethod, setFocusedMethod] = useState(null)

  function openMethodDialog(label) {
    const methodObj = methods.find((method) => method.label === label)
    if (methodObj?.label) {
      setFocusedMethod(methodObj)
    }
  }

  function closeMethodDialog() {
    setFocusedMethod(null)
  }

  const methods = [
    {
      label: 'Zelle',
      logoPath: zelleLogo,
      directPayLink: null,
      directPayLinkLabel: '',
      scanImgPath: null,
      searchableCode: '9167201372',
      mainInstructions: 'Mason\'s Zelle is registered under "9167201372".',
      specialInstructions: null,
    },
    {
      label: 'Venmo',
      logoPath: venmoLogo,
      directPayLink: 'https://venmo.com/u/Mason-Hirst',
      directPayLinkLabel: "Mason's Venmo profile",
      scanImgPath: venmoScan,
      searchableCode: '@Mason-Hirst',
      mainInstructions:
        'Click the direct link to my profile, search for my "@Mason-Hirst", or scan the QR code!',
      specialInstructions:
        'If the direct link does not open the app automatically, you may need to search manually for the profile.',
    },
    {
      label: 'PayPal',
      logoPath: paypalLogo,
      directPayLink: 'https://paypal.me/hirstdj?country.x=US&locale.x=en_US',
      directPayLinkLabel: "Mason's PayPal profile",
      scanImgPath: paypalScan,
      searchableCode: '@hirstdj',
      mainInstructions:
        'Click the direct link to my profile, search for my "@hirstdj", or scan the QR code!',
      specialInstructions:
        'If the direct link does not open the app automatically, you may need to search manually for the profile.',
    },
    {
      label: 'Google Pay',
      logoPath: googlePayLogo,
      directPayLink: 'https://gpay.app.goo.gl/iQoYiX',
      directPayLinkLabel: "Mason's Google Pay profile",
      scanImgPath: googlePayScan,
      searchableCode: '9167201372',
      mainInstructions:
        'Click the direct link to my profile, search for "9167201372", or scan the QR code!',
      specialInstructions:
        'If the direct link does not open the app automatically, you may need to search manually for the profile.',
    },
  ]

  return (
    <div className='app-container'>
      <h2 className='methods-header'>
        Select a payment method for more details.
      </h2>
      <section className='method-previews-cont'>
        {methods.map((method) => {
          return (
            <div
              className='method-preview-container'
              onClick={() => openMethodDialog(method.label)}
            >
              <h1>{method.label}</h1>
              <div className='img-cont-div'>
                <img
                  src={method.logoPath}
                  alt={method.label + ' logo'}
                  className='method-preview-logo'
                />
              </div>
            </div>
          )
        })}
      </section>
      <p className='other-ways-text'>
        For other ways to pay, please contact Mason directly at <br /> (385)
        200-1306
      </p>
      <PaymentMethod method={focusedMethod} close={closeMethodDialog} />
    </div>
  )
}

export default PaymentRouter

import React, { createContext, useState } from 'react'

export const DesignContext = createContext()

export const DesignProvider = ({ children }) => {
  const [showHeader, setShowHeader] = useState(true)
  const [showFooter, setShowFooter] = useState(true)
  const [showHeaderContactInfo, setShowHeaderContactInfo] = useState(true)
  const [showFooterContactInfo, setShowFooterContactInfo] = useState(true)


  return (
    <DesignContext.Provider
      value={{
        showHeader,
        setShowHeader,
        showFooter,
        setShowFooter,
        showHeaderContactInfo,
        setShowHeaderContactInfo,
        showFooterContactInfo,
        setShowFooterContactInfo,
      }}
    >
      {children}
    </DesignContext.Provider>
  )
}

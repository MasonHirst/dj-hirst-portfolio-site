import React, { createContext, useState, useEffect, useContext } from 'react'
import axios from 'axios'

export const DjContext = createContext()

export function DjContextWrapper({ children }) {
  const [songRequests, setSongRequests] = useState([])
  const [timeRange, setTimeRange] = useState(4)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(50)
  const [songFetchLoading, setSongFetchLoading] = useState(false)

  useEffect(() => {
    handleGetRequests()
  }, [timeRange])

  function handleRefreshRequests() {
    console.log('handling refresh!')
    handleGetRequests()
  }

  function handleGetRequests() {
    setSongFetchLoading(true)
    const reqBody = {
      getStartTime: getMillisecondsForPastHours(timeRange),
    }

    // I am using a post method here instead of get because I want more options for filtering results
    axios
      .post('/api/requests', reqBody)
      .then(({ data }) => {
        if (Array.isArray(data)) {
          setSongRequests(data)
        }
      })
      .catch((error) => {
        console.log('! Error in handleGetRequests: ', error)
      })
      .finally(() => setSongFetchLoading(false))
  }

  function getMillisecondsForPastHours(hoursAgo) {
    return Date.now() - hoursAgo * 60 * 60 * 1000 // Subtract the given number of hours
  }

  return (
    <DjContext.Provider
      value={{
        songRequests,
        timeRange,
        setTimeRange,
        songFetchLoading,
        page,
        setPage,
        rowsPerPage,
        setRowsPerPage,
        handleRefreshRequests,
      }}
    >
      {children}
    </DjContext.Provider>
  )
}

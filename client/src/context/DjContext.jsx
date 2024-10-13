import React, { createContext, useState, useEffect, useContext, useMemo } from 'react'
import axios from 'axios'
import { getMillisecondsForPastHours } from '../utils/helper-functions'

export const DjContext = createContext()

export function DjContextWrapper({ children }) {
  const [songRequests, setSongRequests] = useState([])
  const [timeRange, setTimeRange] = useState(4)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(50)
  const [songFetchLoading, setSongFetchLoading] = useState(false)
  const [clientIdFilter, setClientIdFilter] = useState(null)
  const [songNameFilter, setSongNameFilter] = useState(null)

  useEffect(() => {
    handleGetRequests()
  }, [timeRange])

  function handleRefreshRequests() {
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
        console.error('! Error in handleGetRequests: ', error)
      })
      .finally(() => setSongFetchLoading(false))
  }

  const filteredSongRequests = useMemo(() => {
    // If no filters are applied, return all song requests
    if (!clientIdFilter && !songNameFilter) {
      return songRequests;
    }
  
    return songRequests.filter((request) => {
      // Apply filtering logic
      const matchesClientId = clientIdFilter 
        ? request.requester_client_id === clientIdFilter 
        : true;
  
      const matchesSongName = songNameFilter 
        ? songNameFilter.toLowerCase().includes(request.request_details.name.toLowerCase())
        : true;
  
      // Return only requests that match both clientId and songName filters
      return matchesClientId && matchesSongName;
    });
  }, [songRequests, clientIdFilter, songNameFilter]);

  

  return (
    <DjContext.Provider
      value={{
        filteredSongRequests,
        timeRange,
        setTimeRange,
        songFetchLoading,
        page,
        setPage,
        rowsPerPage,
        setRowsPerPage,
        handleRefreshRequests,
        clientIdFilter,
        setClientIdFilter,
        songNameFilter,
        setSongNameFilter,
      }}
    >
      {children}
    </DjContext.Provider>
  )
}

import React, { useContext, useMemo, useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Link,
  Avatar,
  Typography,
  Tooltip,
} from '@mui/material'
import { DjContext } from '../../context/DjContext.jsx'
import { useEffect } from 'react'
import {
  formatTimeForDjTable,
} from '../../utils/helper-functions.js'
import SpotifyTrackItem from '../request-client-view/SpotifyTrackItem.jsx'
import spotify_logo from '../../assetts/spotify-logo-official.png'
import Swal from 'sweetalert2'

const RequestsTable = () => {
  const {
    filteredSongRequests,
    rowsPerPage,
    setRowsPerPage,
    page,
    setPage,
    songFetchLoading,
    timeRange,
    setClientIdFilter,
    setSongNameFilter,
  } = useContext(DjContext)
  const [requestCountById, setRequestCountById] = useState({})
  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  function handleFilterByName(request) {
    setSongNameFilter(request.name)
  }

  useEffect(() => {
    setRequestCountById(
      filteredSongRequests.reduce((acc, request) => {
        acc[request.requester_client_id] =
          (acc[request.requester_client_id] || 0) + 1
        return acc
      }, {})
    )
  }, [filteredSongRequests])

  const paginatedData = useMemo(() => {
    return filteredSongRequests.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    )
  }, [filteredSongRequests])

  function handleClientIdClick(clientId) {
    setClientIdFilter(clientId)
  }

  function openSpotifyUri(link) {
    if (link) {
      Swal.fire({
        title: 'Opening Spotify',
        text: 'Spotify may start playing this song!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Open Spotify',
        cancelButtonText: 'cancel',
        reverseButtons: true,
        customClass: {
          confirmButton: 'swal-confirm-button', // Apply custom class to the confirm button
        },
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = link
        }
      })
    } else {
      console.error('No URI to open for this track')
    }
  }

  const clientInfoTypographySx = { color: 'text.secondary', fontSize: '.7rem' }

  return (
    <Paper>
      <TableContainer
        sx={{
          display: 'inline-block',
          // maxWidth: '100%',
          // tableLayout: 'fixed',
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              {/* <TableCell
                sx={{
                  width: '', // having this here is needed for styling
                }}
              ></TableCell> */}
              <TableCell>Song</TableCell>
              <TableCell
                sx={{
                  wordWrap: 'break-word',
                  whiteSpace: 'normal',
                }}
              >
                Reason
              </TableCell>
              <TableCell>Time</TableCell>
              <TableCell>Client</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.length > 0 ? (
              paginatedData.map((request) => (
                <TableRow key={request.id}>
                  <TableCell
                    sx={{
                      maxWidth: '20rem !important',
                    }}
                  >
                    <Tooltip title='Filter by song name'>
                      <SpotifyTrackItem
                        track={request.request_details}
                        sx={{ padding: 0 }}
                        sizeMultiplier={0.95}
                        clickable
                        selectTrack={handleFilterByName}
                      />
                    </Tooltip>
                    {request.request_details?.uri && (
                      <Link
                        onClick={() =>
                          openSpotifyUri(request?.request_details?.uri)
                        }
                        color={'#191414'}
                        sx={{
                          cursor: 'pointer',
                          display: 'flex',
                          gap: '.4rem',
                          alignItems: 'center',
                          marginTop: '.2rem',
                        }}
                      >
                        Open in spotify
                        <Avatar
                          src={spotify_logo}
                          sx={{
                            width: '1.5rem',
                            height: '1.5rem',
                            backgroundColor: '#191414',
                          }}
                        />
                      </Link>
                    )}
                  </TableCell>
                  <TableCell
                    sx={{
                      wordWrap: 'break-word',
                      whiteSpace: 'normal',
                      fontSize: '0.8rem',
                      minWidth: '10rem !important',
                      maxWidth: '14rem',
                    }}
                  >
                    {request.request_reason}
                  </TableCell>
                  <TableCell>
                    {formatTimeForDjTable(request.createdAt)}
                  </TableCell>
                  <TableCell
                    sx={{
                      minWidth: '10.5rem',
                    }}
                  >
                    <Tooltip title='Filter by client id'>
                      <Typography sx={{ fontSize: '0.65rem' }}>
                        <Link
                          onClick={() =>
                            handleClientIdClick(request.requester_client_id)
                          }
                          sx={{ cursor: 'pointer' }}
                        >
                          {request.requester_client_id}
                        </Link>
                        <strong>
                          {' '}
                          ({requestCountById[request.requester_client_id]})
                        </strong>
                      </Typography>
                    </Tooltip>
                    <Typography variant='body2' sx={clientInfoTypographySx}>
                      <strong>Device:</strong> {request.user_agent.deviceModel}
                    </Typography>
                    <Typography variant='body2' sx={clientInfoTypographySx}>
                      <strong>OS:</strong> {request.user_agent.os}
                    </Typography>
                    <Typography variant='body2' sx={clientInfoTypographySx}>
                      <strong>Browser:</strong> {request.user_agent.browser}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align='center'>
                  {songFetchLoading
                    ? 'Loading song requests...'
                    : timeRange === 'all'
                    ? 'No song requests!'
                    : `No requests in the last ${timeRange} hour(s)`}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component='div'
        count={filteredSongRequests.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[25, 50, 100, 200]}
        labelRowsPerPage='Rows per page'
      />
    </Paper>
  )
}

export default RequestsTable

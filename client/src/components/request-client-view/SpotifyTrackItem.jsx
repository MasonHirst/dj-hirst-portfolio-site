import {
  Avatar,
  Box,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@mui/material'
import React, { forwardRef, useMemo } from 'react'
import ExplicitRoundedIcon from '@mui/icons-material/ExplicitRounded'
import {
  formatArtistNames,
  formatTrackDuration,
} from '../../utils/helper-functions'

const SpotifyTrackItem = forwardRef(
  (
    {
      track,
      clickable = false,
      sx,
      sizeMultiplier,
      selectTrack = function () {},
      ...props
    },
    ref
  ) => {
    const isExplicit = useMemo(() => {
      return track?.explicit
    }, [track])

    const trackImage = useMemo(() => {
      return track?.album?.images?.[1]?.url
    }, [track])

    const trackDuration = useMemo(() => {
      return formatTrackDuration(track?.duration_ms)
    }, [track])

    const songNameSize = useMemo(() => {
      if (isNaN(sizeMultiplier)) {
        return '1rem'
      }
      return `${1 * sizeMultiplier}rem`
    }, [sizeMultiplier, sx])

    const artistNamesSize = useMemo(() => {
      if (isNaN(sizeMultiplier)) {
        return '0.875rem'
      }
      return `${0.875 * sizeMultiplier}rem`
    }, [sizeMultiplier, sx])

    const imageDimension = useMemo(() => {
      if (isNaN(sizeMultiplier)) {
        return '3.1rem'
      }
      return `${3.1 * sizeMultiplier}rem`
    }, [sizeMultiplier, sx])

    const imgMarginRight = useMemo(() => {
      if (isNaN(sizeMultiplier)) {
        return '0.4rem'
      }
      return `${0.4 * sizeMultiplier}rem`
    }, [sizeMultiplier, sx])

    return (
      <ListItem
        ref={ref}
        {...props}
        sx={{
          ...sx,
          opacity: isExplicit ? 0.7 : 1,
          display: 'flex',
          justifyContent: 'space-between', // Space between text and playback length
          alignItems: 'center',
          cursor: clickable && 'pointer',
        }}
        onClick={() => selectTrack(track)}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexGrow: 1,
            overflow: 'hidden',
          }}
        >
          {trackImage && (
            <ListItemAvatar
              sx={{
                minWidth: 0,
                marginRight: imgMarginRight,
              }}
            >
              <Avatar
                variant='square'
                src={trackImage} // Medium album cover
                alt={track?.name}
                sx={{
                  width: imageDimension,
                  height: imageDimension,
                  borderRadius: '8px !important',
                }}
              />
            </ListItemAvatar>
          )}
          <ListItemText
            primary={
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  flexGrow: 1,
                  overflow: 'hidden',
                }}
              >
                {isExplicit && (
                  <ExplicitRoundedIcon
                    sx={{
                      fontSize: 18,
                      color: '#ff0000',
                      marginLeft: '-0.1rem',
                      marginRight: '.15rem',
                    }}
                  />
                )}
                <Typography
                  variant='body1'
                  sx={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    flexGrow: 1, // Allow the name to grow and fill space
                    fontSize: songNameSize,
                  }}
                >
                  {track?.name}
                </Typography>
              </Box>
            }
            secondary={
              <Typography
                variant='body2'
                sx={{
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  flexGrow: 1, // Allow the artist names to grow
                  opacity: 0.8,
                  fontSize: artistNamesSize,
                }}
              >
                {formatArtistNames(track?.artists)}
              </Typography>
            }
          />
        </Box>

        <Typography
          variant='body2'
          sx={{ whiteSpace: 'nowrap', marginLeft: '1rem', fontWeight: 'bold' }}
        >
          {trackDuration}
        </Typography>
      </ListItem>
    )
  }
)

export default SpotifyTrackItem

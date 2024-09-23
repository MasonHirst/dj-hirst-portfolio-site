import {
  Avatar,
  Box,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@mui/material'
import React, { useMemo } from 'react'
import ExplicitRoundedIcon from '@mui/icons-material/ExplicitRounded'
import { formatArtistNames } from '../../utils/helper-functions'

const SpotifyTrackItem = ({ track, sx, selectTrack = function () {} }) => {
  return (
    <ListItem
      sx={{
        ...sx,
        opacity: track.explicit ? .7 : 1,
      }}
      onClick={() => selectTrack(track)}
    >
      <ListItemAvatar>
        <Avatar
          variant='square'
          src={track.album.images[1]?.url} // Medium album cover
          alt={track.name}
          sx={{
            width: 50,
            height: 50,
            borderRadius: '8px !important',
          }}
        />
      </ListItemAvatar>
      <ListItemText
        primary={
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {track.explicit && (
              <ExplicitRoundedIcon
                sx={{
                  fontSize: 18,
                  color: '#ff0000',
                  marginLeft: '-0.1rem',
                  marginRight: '.15rem',
                }}
              />
            )}
            <Typography variant='body1'>{track.name}</Typography>
          </Box>
        }
        secondary={formatArtistNames(track.artists)}
      />
    </ListItem>
  )
}

export default SpotifyTrackItem

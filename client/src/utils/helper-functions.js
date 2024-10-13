function formatTimeForDjTable(date) {
  const now = new Date()
  const givenDate = new Date(date)
  const isToday = now.toDateString() === givenDate.toDateString()
  if (isToday) {
    return givenDate.toLocaleTimeString([], {
      hour: 'numeric',
      minute: '2-digit',
    })
  }
  return (
    <>
      {givenDate.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      })}
      <br />
      {givenDate.toLocaleDateString([], {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric',
      })}
    </>
  )
}

function formatArtistNames(artistsArray = []) {
  return artistsArray.map((artist) => artist.name).join(', ')
}


function formatTrackDuration(durationMs) {
  if (!durationMs) {
    return null
  }
  const minutes = Math.floor(durationMs / 60000);
  const seconds = Math.floor((durationMs % 60000) / 1000).toString().padStart(2, '0');
  return `${minutes}:${seconds}`;
}

function getMillisecondsForPastHours(hoursAgo) {
  return Date.now() - hoursAgo * 60 * 60 * 1000 // Subtract the given number of hours
}



export {
  formatTimeForDjTable,
  formatArtistNames,
  formatTrackDuration,
  getMillisecondsForPastHours,
}
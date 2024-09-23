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
  console.log("🚀 ~ formatArtistNames ~ artistsArray:", artistsArray)
  
  const names = artistsArray.map((artist) => artist.name).join(', ')
  console.log("🚀 ~ formatArtistNames ~ names:", names)
  return names
}



export {
  formatTimeForDjTable,
  formatArtistNames,
}
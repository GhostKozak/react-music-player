const LibrarySong = ({ song, songs, setCurrentSong, audioRef, isPlaying, setSongs}) => {
  const songSelectHandler = async () => {
    
    setCurrentSong(song);
    
    if (isPlaying) {
      const playPromise = audioRef.current.play()
      if (playPromise !== undefined) {
        playPromise.then( audio => {
          audioRef.current.play();
        })
      }
    }

    const newSongs = songs.map((_song) => {
      if(_song.id === song.id) {
        return {
          ..._song,
          active: true,
        } 
      } else {
        return {
          ..._song,
          active: false,
        }
      }
    })
    
    setSongs(newSongs);

  }

  return (
    <div onClick={songSelectHandler} className={`library-song ${song.active ? 'selected' : ''}`}>
      <img src={song.cover} alt={song.name} />
      <div className="song-description">
        <h3>{song.name}</h3>
        <h4>{song.artist}</h4>
      </div>
    </div>
  )
}

export default LibrarySong
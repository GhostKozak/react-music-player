import { useState, useRef } from 'react';
// Other Imports
import './styles/App.scss';
import data from './data';
// Compenents
import Player from './components/Player';
import Song from './components/Song';
import Library from './components/Library';
import Nav from './components/Nav';


function App() {

  // Ref
  const audioRef = useRef(null);

  // State
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [libraryStatus, setLibraryStatus] = useState(false);
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0
  })

  //Event Handlers
  const timeUpdateHandler = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;
    setSongInfo({ ...songInfo, currentTime: current, duration: duration })
  }

  const activeLibraryHandler = (nextPrev) => {
    const newSongs = songs.map((_song) => {
      if(_song.id === nextPrev.id) {
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

  const skipTrackHandler =  async direction => {
    
    let currentIndex = songs.findIndex(song => song.id === currentSong.id);
    if (direction === "skip-forward") {
      await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
      activeLibraryHandler(songs[(currentIndex + 1) % songs.length]);
    }
    if (direction === "skip-back") {
      if ((currentIndex -1) % songs.length === -1) {
        await setCurrentSong(songs[songs.length - 1]);
        activeLibraryHandler(songs[songs.length - 1]);
        if (isPlaying) audioRef.current.play();
        return;
      }
      await setCurrentSong(songs[(currentIndex - 1) % songs.length]);
      activeLibraryHandler(songs[(currentIndex - 1) % songs.length]);
    }
    if (isPlaying) audioRef.current.play(); 
    

    /*
    const currentIndex = songs.findIndex( song => song.id === currentSong.id);
    if (direction === "skip-forward") {
      await setCurrentSong(songs[currentIndex + 1 === songs.length ? 0 : currentIndex + 1]);
    }
    if (direction === "skip-back") {
      await setCurrentSong(songs[currentIndex + 1 === 0 ? songs.length - 1 : currentIndex + 1]);
    }
    if (isPlaying) audioRef.current.play();
    */
  }

  return (
    <div className="App">
      <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus} />
      <Song currentSong={currentSong} isPlaying={isPlaying} />
      <Player 
        songs={songs}
        setSongs={setSongs}
        audioRef={audioRef} 
        currentSong={currentSong}
        setCurrentSong={setCurrentSong} 
        isPlaying={isPlaying} 
        setIsPlaying={setIsPlaying} 
        songInfo={songInfo}
        setSongInfo={setSongInfo}
        skipTrackHandler={skipTrackHandler}
      />
      <Library 
        songs={songs} 
        audioRef={audioRef}
        setCurrentSong={setCurrentSong} 
        isPlaying={isPlaying}
        setSongs={setSongs}
        libraryStatus={libraryStatus}
      />
      <audio 
        onTimeUpdate={timeUpdateHandler} 
        ref={audioRef} 
        src={currentSong.audio} 
        onLoadedMetadata={timeUpdateHandler} 
        onEnded={() => skipTrackHandler("skip-forward")}
      />
    </div>
  );
}

export default App;

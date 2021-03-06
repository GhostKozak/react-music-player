import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlay, faPause, faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons"

const Player = ({ audioRef, currentSong, setCurrentSong, isPlaying, setIsPlaying, songs, setSongs, songInfo, setSongInfo, skipTrackHandler }) => {

  // Handlers
  const playSongHandler = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(!isPlaying);
    } else {
      audioRef.current.play();
      setIsPlaying(!isPlaying)
    }
  }

  const getTime = (time) => {
    return (Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2))
  }

  const dragHandler = (e) => {
    audioRef.current.currentTime = e.target.value;
    setSongInfo({ ...songInfo, currentTime: e.target.value })
  }

  return (
    <div className="player">
      <div className="time-control">
        <p>{getTime(songInfo.currentTime)}</p>
        <input
          min={0}
          max={songInfo.duration || 0}
          value={songInfo.currentTime}
          onChange={dragHandler}
          type="range"
        />
        <p>{songInfo.duration ? getTime(songInfo.duration) : '0:00'}</p>
      </div>
      <div className="play-control">
        <FontAwesomeIcon 
          className="skip-back" 
          size="2x" 
          icon={faAngleLeft} 
          onClick={() => skipTrackHandler("skip-back")}
        />
        <FontAwesomeIcon 
          className="play" 
          size="2x" 
          icon={isPlaying ? faPause : faPlay} 
          onClick={playSongHandler} 
        />
        <FontAwesomeIcon 
          className="skip-forward" 
          size="2x" 
          icon={faAngleRight} 
          onClick={() => skipTrackHandler("skip-forward")}
        />
      </div>
    </div>
  )
}

export default Player
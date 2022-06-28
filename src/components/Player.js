import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlay, faPause, faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react"

const Player = ({ audioRef, currentSong, isPlaying, setIsPlaying }) => {
  // State
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0
  })

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

  const timeUpdateHandler = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;
    setSongInfo({ ...songInfo, currentTime: current, duration: duration })
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
        <p>{getTime(songInfo.duration)}</p>
      </div>
      <div className="play-control">
        <FontAwesomeIcon 
          className="skip-back" 
          size="2x" 
          icon={faAngleLeft} 
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
        />
      </div>
      <audio 
        onTimeUpdate={timeUpdateHandler} 
        ref={audioRef} 
        src={currentSong.audio} 
        onLoadedMetadata={timeUpdateHandler} 
      />
    </div>
  )
}

export default Player
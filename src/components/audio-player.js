import { useRef, useState } from "react";

const AudioPlayer = ({ src, transcript }) => {
  // Create a play button that toggles play and pause
  // Create elapsed time and total time
  // create a fast forward and rewind 15 second button
  // create a scrubber
  // create a playback rate button
  // volume slider
  // mute toggle
  const audioRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);

  const togglePlaying = () => {
    setIsPlaying(!isPlaying);
    isPlaying ? audioRef.current.pause() : audioRef.current.play();
  };

  const onLoadedMetadata = () => {
    setDuration(audioRef.current.duration);
  };

  return (
    <>
      <div className="audio">
        <button onClick={togglePlaying}>{isPlaying ? "Pause" : "Play"}</button>
        <span className="elapsed">Elapsed Time: 0</span>
        <span className="duration">Total Time: {duration}</span>
      </div>
      <audio
        ref={audioRef}
        onLoadedMetadata={onLoadedMetadata}
        src={src}
        controls
      />
      <div>{transcript}</div>
    </>
  );
};

export default AudioPlayer;

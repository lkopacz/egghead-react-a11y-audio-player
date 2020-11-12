const AudioPlayer = ({ src, transcript }) => {
  // Create a play button that toggles play and pause
  // Create elapsed time and total time
  // create a fast forward and rewind 15 second button
  // create a scrubber
  // create a playback rate button
  // volume slider
  // mute toggle
  return (
    <>
      <audio src={src} controls />
      <div>{transcript}</div>
    </>
  );
};

export default AudioPlayer;

import AudioPlayer from "./components/audio-player";

import "./App.css";

const src =
  "https://dts.podtrac.com/redirect.mp3/cdn.simplecast.com/audio/2ac34c/2ac34cab-4949-40aa-bac7-d7e3a70f0a39/a5c37519-9a29-464b-8008-b9aae32c0cd4/podcast_joel_with_veni_kunche_v1_mp3_tc.mp3";

function App() {
  const transcript = (
    <a href="https://egghead.simplecast.com/episodes/embrace-challenges-with-a-growth-mindset-with-veni-kunche/transcript">
      Transcript
    </a>
  );

  return (
    <div className="App">
      <header>
        <h1>Accessible Audio Player</h1>
      </header>
      <main>
        <AudioPlayer src={src} transcript={transcript} />
      </main>
    </div>
  );
}

export default App;

import { useState, useRef } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";


import "./Styles/App.css";
import LandingPage from "./Components/LandingPage.jsx";
import PokemonIdPage from "./Components/PokemonIdPage.jsx";
import Pokedex from "./Components/Pokedex.jsx";
import EntryPage from "./Components/EntryPage.jsx";
import MediaPlayer from "./Components/MediaPlayer.jsx";
import Fight from "./Components/Fight.jsx";

function App() {

  const [playing, setPlaying] = useState(false);
  const [showMediaPlayer, setShowMediaPlayer] = useState(false);
  const audioRef = useRef(null);

  const [pokedexAudioPlaying, setPokedexAudioPlaying] = useState(false);
  const pokedexAudioRef = useRef(null);

  const toggleAudio = () => {
    if (playing) {
      audioRef.current.volume = 0;
      setPlaying(false);
    } else {
      audioRef.current.volume = 0.2;
      audioRef.current.play();
      setPlaying(true);
    };
  };

  const startAudio = () => {
    setShowMediaPlayer(true);
    if (!playing) {
      audioRef.current.volume = 0.2;
      audioRef.current.play();
      setPlaying(true);
    };
  };

  return (
    <BrowserRouter>
      <MediaPlayer
        audioRef={audioRef}
        toggleAudio={toggleAudio}
        playing={playing}
        pokedexAudioRef={pokedexAudioRef}
        pokedexAudioPlaying={pokedexAudioPlaying}
        showMediaPlayer={showMediaPlayer} />
      <Routes>
        <Route path="/" element={<EntryPage toggleAudio={startAudio} />} />
        <Route path="/home" element={<LandingPage />} />
        <Route path="/pokemon/" element={<Pokedex />} />
        <Route path="/pokemon/:id" element={<PokemonIdPage />} />
        <Route path='/fight/*' element={<Fight />} />

      </Routes>
    </BrowserRouter>
  );
};

export default App;

import { useState, useRef } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";


import "./Styles/App.css";
import LandingPage from "./Components/LandingPage.jsx";
import PokemonIdPage from "./Components/PokemonIdPage.jsx";
import Pokedex from "./Components/Pokedex.jsx";
import EntryPage from "./Components/EntryPage.jsx";
import MediaPlayer from "./Components/MediaPlayer.jsx";
import Fight from "./Components/Fight.jsx";
import Leaderboards from "./Components/Leaderboards.jsx";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<EntryPage />} />
        <Route path="/home" element={<LandingPage />} />
        <Route path="/pokemon/" element={<Pokedex />} />
        <Route path="/pokemon/:id" element={<PokemonIdPage />} />
        <Route path='/fight/*' element={<Fight />} />
        <Route path='/leaderboards' element={<Leaderboards />} />

      </Routes>
    </BrowserRouter>
  );
};

export default App;

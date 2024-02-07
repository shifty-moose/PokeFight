import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";


import "./Styles/App.css";
import LandingPage from "./Components/LandingPage.jsx";
import PokemonIdPage from "./Components/PokemonIdPage.jsx";
import PokemonInfoPage from "./Components/PokemonInfoPage.jsx";
import EntryPage from "./Components/EntryPage.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<EntryPage />} />
        <Route path="/home" element={<LandingPage />} />
        <Route path="/pokemon/:id" element={<PokemonIdPage />} />
        <Route path="/pokemon/:id/info" element={<PokemonInfoPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

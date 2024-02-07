import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import LandingPage from "./Components/LandingPage.jsx";
import PokemonIdPage from "./Components/PokemonIdPage.jsx";
import PokemonInfoPage from "./Components/PokemonInfoPage.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/pokemon/:id" element={<PokemonIdPage />} />
        <Route path="/pokemon/:id/info" element={<PokemonInfoPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

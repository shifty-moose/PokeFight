import React from 'react';

import '../Styles/MediaPlayer.css';

const MediaPlayer = ({ audioRef, toggleAudio, playing, pokedexAudioRef, pokedexAudioPlaying, showMediaPlayer }) => {
  return (
    <div className={`mediaPlayerContainer ${!showMediaPlayer ? "hidden" : null}`}>
      {playing ? (
        <button onClick={toggleAudio}>
          <span className="material-symbols-outlined">volume_up</span>
        </button>
      ) : (
        <button onClick={toggleAudio}>
          <span className="material-symbols-outlined">no_sound</span>
        </button>
      )}
      <audio
        ref={audioRef}
        loop
        src="https://dl.vgmdownloads.com/soundtracks/pokemon-red-green-blue-yellow/ncplxpiydy/03%20Title%20Screen.mp3"
      />
      <audio
        ref={pokedexAudioRef}
        loop
        src="https://dl.vgmdownloads.com/soundtracks/pokemon-red-green-blue-yellow/cuzoyubbaq/18%20Pok%C3%A9mon%20Center.mp3"
      />
    </div>
  );
};

export default MediaPlayer;

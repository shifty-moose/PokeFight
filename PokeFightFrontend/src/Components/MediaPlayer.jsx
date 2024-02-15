import React from 'react';

import '../Styles/MediaPlayer.css';

const MediaPlayer = ({ audioRef, toggleAudio, playing, showMediaPlayer }) => {
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
    </div>
  );
};

export default MediaPlayer;

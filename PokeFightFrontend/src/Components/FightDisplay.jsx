import React from "react";

const FightDisplay = ({pokemon1, pokemon2, spriteOne, spriteTwo, handleClick, handleClick2}) => {
  console.log(pokemon1);
  
  return (
    <div className='fightDisplayContainer'>
      <div className="fightTopRow">
        <div className="fightTopRowLeft">
          <div className="topPokemonStatScreen">
            <div className="statsDiv topLeftStatsDiv">
              <h3>{pokemon2.name}</h3>
              <div className="hpBarContainer">
                <h5>HP:</h5>
                <div className="hpBar">
                  <div className="hpBarFill" style={{ width: `${90}%` }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="fightTopRowRight">
          <div className="pokemonSprite topPokemonSprite">
            <img src={pokemon2.sprite} alt="Bulbasaur" ref={spriteTwo} />
          </div>
        </div>
      </div>

      <div className="fightBottomRow">
        <div className="fightBottomRowLeft">
          <div className="pokemonSprite bottomPokemonSprite">
            <img src={pokemon1.sprites.back_default} alt="Pikachu" ref={spriteOne} />
          </div>
        </div>

        <div className="fightBottomRowRight">
          <div className="bottomPokemonStatScreen">
            <div className="statsDiv bottomRightStatsDiv">
              <h3>{pokemon1.name.toUpperCase()}</h3>
              <div className="hpBarContainer">
                <h5>HP:</h5>
                <div className="hpBar">
                  <div className="hpBarFill" style={{ width: `${55}%` }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="fightStats">
        <div className="fightStatsLeft">
          <div className="attackMoves">
            <div className="attackMoveContainer">
              <h3 onClick={handleClick}>Attack</h3>
              <h3 onClick={handleClick2}>Sp. Attack</h3>
            </div>
          </div>
        </div>

        <div className="fightStatsRight">
          <div className="defenseMoves">
            <h3>Defense</h3>
            <h3>Sp. Defense</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FightDisplay;

import React from 'react';
import "../Styles/Fight.css";

const Fight = () => {

    const pokemon1 = {
        name: 'PIKACHU',
        type: 'Electric',
        hp: 100,
        attack: 55,
        defense: 40,
        spAttack: 50,
        spDefense: 50,
        speed: 90,
        sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/25.png'
    };

    const pokemon2 = {
        name: 'BULBASAUR',
        type: 'Grass',
        hp: 100,
        attack: 49,
        defense: 49,
        spAttack: 65,
        spDefense: 65,
        speed: 45,
        sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png'
    };

    console.log(pokemon1.sprite);
    console.log(pokemon2.sprite);


  return (
    <div className='fightWrapper'>
        <div className="fightContainer">
            <div className="fightTopRow">
                <div className="fightTopRowLeft">
                    <div className='topPokemonStatScreen'>
                        <div className='statsDiv topLeftStatsDiv'>
                            <h3>{pokemon1.name}</h3>
                            <div className='hpBar'>
                                <div className='hpBarFill' style={{width: `${pokemon1.hp}%`}}></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="fightTopRowRight">
                    <div className='pokemonSprite topPokemonSprite'>
                        <img src={pokemon2.sprite} alt="Bulbasaur" />
                    </div>
                </div>
            </div>

            <div className="fightBottomRow">
                <div className="fightBottomRowLeft">
                    <div className='pokemonSprite bottomPokemonSprite'>
                        <img src={pokemon1.sprite} alt="Pikachu" />
                    </div>
                </div>

                <div className="fightBottomRowRight">
                    <div className='bottomPokemonStatScreen'>
                        <div className='statsDiv bottomRightStatsDiv'>
                            <h3>{pokemon2.name}</h3>
                            <div className='hpBar'>
                                <div className='hpBarFill' style={{width: `${pokemon2.hp}%`}}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="fightStats">
                <div className="fightStatsLeft">
                    <div className="attackMoves">
                        <div className="attackMoveContainer">
                        <h3>Attack</h3>
                        <h3>Sp. Attack</h3>
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
    </div>
  )
}

export default Fight;
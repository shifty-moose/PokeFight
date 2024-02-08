import React, {useState, useEffect} from 'react';
import Header from './Header.jsx';
import '../Styles/PokemonIdPage.css';

const PokemonIdPage = () => {

    
    return (
      <div className='pokemonViewWrapper'>
        <div className='pokemonViewContainer'>

          <div className='pokemonViewHeader'>
          <h1>Pikachu</h1>
          <img className='pokeTypeLogo' src='https://i.pinimg.com/originals/3c/dd/17/3cdd17306e51b9ff6c0264241e3e4c4c.png' alt='electricType' />
          </div>

          <div className='pokemonView'>

            <div className='pokemonViewImg'>
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png" alt="pikachu" />
            </div>
            <div className='pokemonViewInfo'>
            <table className='statTable'>
              <tbody>
                <tr>
                  <td className='tableLabel labelOdd'>HP</td>
                  <td className='tableValue valueOdd'>35</td>
                </tr>
                <tr>
                  <td className='tableLabel labelEven'>Attack</td>
                  <td className='tableValue valueEven'>55</td>
                </tr>
                <tr>
                  <td className='tableLabel labelOdd'>Defense</td>
                  <td className='tableValue valueOdd'>40</td>
                </tr>
                <tr>
                  <td className='tableLabel labelEven'>Special Attack</td>
                  <td className='tableValue valueEven'>50</td>
                </tr>
                <tr>
                  <td className='tableLabel labelOdd'>Special Defense</td>
                  <td className='tableValue valueOdd'>50</td>
                </tr>
                <tr>
                  <td className='tableLabel labelEven'>Speed</td>
                  <td className='tableValue valueEven'>90</td>
                </tr>
              </tbody>
            </table>
            <div className='evolutions'>
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/172.png" alt="pichu" />
                <img className='activePokemon' src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png" alt="pikachu" />
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/26.png" alt="raichu" />

              </div>
            </div>

          </div>

          <div className='pokemonViewText'>
            <p>When several of these POKéMON gather, their electricity could build and cause lightning storms.</p>
          </div>


        </div>
      </div>
    ) 
}

export default PokemonIdPage;
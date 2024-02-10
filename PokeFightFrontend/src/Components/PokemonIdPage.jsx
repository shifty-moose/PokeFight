import React, {useState, useEffect, useRef} from 'react';
import { useAnimate } from 'framer-motion';
import Header from './Header.jsx';
import '../Styles/PokemonIdPage.css';

const PokemonIdPage = () => {
  const [pokemon, setPokemon] = useState({});
  const [loading, setLoading] = useState(true);

  const [scope, animate] = useAnimate();

  const getRandomDescription = (flavorText) => {
    let randomIndex = Math.floor(Math.random() * flavorText.length);
    let randomDescription = flavorText[randomIndex].flavor_text;
    return randomDescription;
  };

  const evaluateEvolutionChain = (evolutionChain) => {

    if (evolutionChain.chain.evolves_to.length > 0) {

      if (evolutionChain.chain.evolves_to[0].evolves_to.length > 0) {
        evolutionChain = {
          firstEvolution: evolutionChain.chain.species.name,
          secondEvolution: evolutionChain.chain.evolves_to[0].species.name,
          thirdEvolution: evolutionChain.chain.evolves_to[0].evolves_to[0].species.name
        };
      } else {
        evolutionChain = {
          firstEvolution: evolutionChain.chain.species.name,
          secondEvolution: evolutionChain.chain.evolves_to[0].species.name
        };
      };

    } else {
      evolutionChain = {
        firstEvolution: evolutionChain.chain.species.name
      };
    };

    return evolutionChain;

  };

  const getTypeBadge = (type) => {
    const badges = [
      {
        type: 'normal',
        badge: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Pok%C3%A9mon_Normal_Type_Icon.svg/240px-Pok%C3%A9mon_Normal_Type_Icon.svg.png'
      },

      {
        type: 'fighting',
        badge: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Pok%C3%A9mon_Fighting_Type_Icon.svg/240px-Pok%C3%A9mon_Fighting_Type_Icon.svg.png'
      },

      {
        type: 'flying',
        badge: 'https://pixelmonmod.com/w/images/0/0d/FlyingType.png'
      },

      {
        type: 'poison',
        badge: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Pok%C3%A9mon_Poison_Type_Icon.svg/240px-Pok%C3%A9mon_Poison_Type_Icon.svg.png'
      },

      {
        type: 'ground',
        badge: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Pok%C3%A9mon_Ground_Type_Icon.svg/240px-Pok%C3%A9mon_Ground_Type_Icon.svg.png'
      },

      {
        type: 'rock',
        badge: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Pok%C3%A9mon_Rock_Type_Icon.svg/240px-Pok%C3%A9mon_Rock_Type_Icon.svg.png'
      },

      {
        type: 'bug',
        badge: 'https://i.ibb.co/THLZYXT/bug.png'
      },

      {
        type: 'ghost',
        badge: 'https://cdn.pixabay.com/photo/2018/05/20/01/40/pokemon-3414809_1280.png'
      },

      {
        type: 'steel',
        badge: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Pok%C3%A9mon_Steel_Type_Icon.svg/240px-Pok%C3%A9mon_Steel_Type_Icon.svg.png'
      },

      {
        type: 'fire',
        badge: 'https://i.ibb.co/8zdzNmk/fire.png'
      },

      {
        type: 'water',
        badge: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Pok%C3%A9mon_Water_Type_Icon.svg/240px-Pok%C3%A9mon_Water_Type_Icon.svg.png'
      },

      {
        type: 'grass',
        badge: 'https://www.giantbomb.com/a/uploads/square_small/59/594908/3336342-3204262205-Grass.png'
      },

      {
        type: 'electric',
        badge: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Pok%C3%A9mon_Electric_Type_Icon.svg/240px-Pok%C3%A9mon_Electric_Type_Icon.svg.png'
      },

      {
        type: 'psychic',
        badge: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Pok%C3%A9mon_Psychic_Type_Icon.svg/240px-Pok%C3%A9mon_Psychic_Type_Icon.svg.png'
      },

      {
        type: 'ice',
        badge: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Pok%C3%A9mon_Ice_Type_Icon.svg/240px-Pok%C3%A9mon_Ice_Type_Icon.svg.png'
      },

      {
        type: 'dragon',
        badge: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Pok%C3%A9mon_Dragon_Type_Icon.svg/240px-Pok%C3%A9mon_Dragon_Type_Icon.svg.png'
      },

      {
        type: 'dark',
        badge: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Pok%C3%A9mon_Dark_Type_Icon.svg/240px-Pok%C3%A9mon_Dark_Type_Icon.svg.png'
      },

      {
        type: 'fairy',
        badge: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Pok%C3%A9mon_Fairy_Type_Icon.svg/240px-Pok%C3%A9mon_Fairy_Type_Icon.svg.png'
      }
    ];

    let chosenBadge = '';

    badges.forEach((badge) => {
      if(badge.type === type) {
        chosenBadge = badge.badge;  
      }
    });

    return chosenBadge;
  };

  function generateRandomNumber() {
    return Math.floor(Math.random() * 200) + 1;
  }
  const randomPokemonId = generateRandomNumber();

  const getPokemon = async () => {
    try {

      const getBasicInfo = async () => {
        const pokemonBasicInfo = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomPokemonId}`);
        const pokemonBasicInfoJson = await pokemonBasicInfo.json();

        const pokemonName = pokemonBasicInfoJson.name;
        const pokemonId = pokemonBasicInfoJson.id;
        const pokemonTypes = pokemonBasicInfoJson.types;
        const pokemonStats = pokemonBasicInfoJson.stats;
        const pokemonSpeciesInfo = pokemonBasicInfoJson.species;
        const pokemonSprite = pokemonBasicInfoJson.sprites.front_default;

        let basicInfoObject = {
          name: pokemonName,
          id: pokemonId,
          types: pokemonTypes,
          stats: pokemonStats,
          species: pokemonSpeciesInfo,
          sprite: pokemonSprite
        };

        return basicInfoObject;
      };
 
      const getExtraInfo = async (basicInfo) => {
        const pokemonExtraInfo = await fetch(`${basicInfo.species.url}`);
        const pokemonExtraInfoJson = await pokemonExtraInfo.json();

        const pokemonFlavorTextEntries = pokemonExtraInfoJson.flavor_text_entries;
        const pokemonEvolutionChain = pokemonExtraInfoJson.evolution_chain;


        let extraInfoObject = {
          flavorText: pokemonFlavorTextEntries,
          evolution_chain: pokemonEvolutionChain
        };
        return extraInfoObject;
      };

      const getEvolutionChain = async (speciesInfo) => {

        const pokemonEvolutionInfo = await fetch(`${speciesInfo.evolution_chain.url}`);
        const pokemonEvolutionInfoJson = await pokemonEvolutionInfo.json();

        const evaluatedEvolutions = evaluateEvolutionChain(pokemonEvolutionInfoJson);
        const evaluatedArray = Object.values(evaluatedEvolutions);

        const fetchEvolutionSprites = async () => {
          const updatedArray = [];
          for (let evolution of evaluatedArray) {
            const evolutionSprite = await fetch(`https://pokeapi.co/api/v2/pokemon/${evolution}`);
            const evolutionSpriteJson = await evolutionSprite.json();
            updatedArray.push(evolutionSpriteJson.sprites.front_default);
          }
          return updatedArray;
        };

        const updatedEvaluatedArray = await fetchEvolutionSprites();
        return updatedEvaluatedArray;

      };

      const basicInfo = await getBasicInfo();
      const extraInfo = await getExtraInfo(basicInfo);
      const evolutionChain = await getEvolutionChain(extraInfo);

      const pokemonObject = {
        basicInfo: basicInfo,
        extraInfo: extraInfo,
        evolutionChain: evolutionChain
      };

      setPokemon(pokemonObject);
      setLoading(false);

    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getPokemon();
  }, []);

  if(loading) {
    return (
      <div className='pokemonViewWrapper'>
        <div className='pokemonViewContainerLoading'>
          <h1>Loading...</h1>
        </div>
      </div>
    )
  };

  let filteredFlavorText = pokemon.extraInfo.flavorText.filter((entry) => {
    return entry.language.name === 'en';
  });
  
  filteredFlavorText = getRandomDescription(filteredFlavorText);

  let typesBadgeArray = [];

  pokemon.basicInfo.types.forEach((type) => {
    typesBadgeArray.push(getTypeBadge(type.type.name));
  });

  let animationScope = scope.current;

  animationScope ? animate(animationScope, {opacity: 1}, {duration: 1}) : null;

    
  return (
    <div className='pokemonViewWrapper'>
      <div className='pokemonViewContainer' >

        <div className='pokemonViewHeader'>
          <h1>{pokemon.basicInfo.name}</h1>
          <div className='pokemonTypeBadges'>
          {typesBadgeArray.map((badge, index) => (
            <img className='pokeTypeLogo' src={`${badge}`} alt='typeBadge' key={index} />
          ))}
          </div>
        </div>

        <div className='pokemonView'>

          <div className='pokemonViewImg' ref={scope}>
            <img src={pokemon.basicInfo.sprite} alt="{pokemon.name}" />
          </div>
          <div className='pokemonViewInfo'>
          <table className='statTable'>
            <tbody>
              <tr>
                <td className='tableLabel labelOdd'>HP</td>
                <td className='tableValue valueOdd'>{pokemon.basicInfo.stats[0].base_stat}</td>
              </tr>
              <tr>
                <td className='tableLabel labelEven'>Attack</td>
                <td className='tableValue valueEven'>{pokemon.basicInfo.stats[1].base_stat}</td>
              </tr>
              <tr>
                <td className='tableLabel labelOdd'>Defense</td>
                <td className='tableValue valueOdd'>{pokemon.basicInfo.stats[2].base_stat}</td>
              </tr>
              <tr>
                <td className='tableLabel labelEven'>Sp. Attack</td>
                <td className='tableValue valueEven'>{pokemon.basicInfo.stats[3].base_stat}</td>
              </tr>
              <tr>
                <td className='tableLabel labelOdd'>Sp. Defense</td>
                <td className='tableValue valueOdd'>{pokemon.basicInfo.stats[4].base_stat}</td>
              </tr>
              <tr>
                <td className='tableLabel labelEven'>Speed</td>
                <td className='tableValue valueEven'>{pokemon.basicInfo.stats[5].base_stat}</td>
              </tr>
            </tbody>
          </table>
          <div className='evolutions'>
              {pokemon.evolutionChain.map((evolution, index) => {
                return (
                  <div key={index} className='evolution'>
                    <img src={evolution} alt='evolutionSprite' />
                  </div>
                )
              })}

            </div>
          </div>

        </div>

        <div className='pokemonViewText'>
          <p>{filteredFlavorText}</p>
        </div>


      </div>
    </div>
  ) 
}

export default PokemonIdPage;
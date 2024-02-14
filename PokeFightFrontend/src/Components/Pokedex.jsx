import React from 'react'
import pokemonAPI from '../../pokemonAPI';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAnimate } from 'framer-motion';
import "../Styles/Pokedex.css";
import logo from "../Images/PokeFightLogo.png"

const Pokedex = () => {

    const [pokemons, setPokemons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    const { getPokemons } = pokemonAPI();

    const navigate = useNavigate();
    const [pageScope, animatePage] = useAnimate();

    const pageInAnimation = () => {
        console.log(pageScope.current);
        animatePage(pageScope.current, { opacity: 1 }, { duration: 1 });
    };

    const handlePokemonClick = (pokemon) => {
        console.log(pokemon);
        navigate(`/pokemon/${pokemon}`);
    };

    const fetchPokemons = async (startId, endId) => {
        try {
            setLoading(true);
            const response = await getPokemons(startId, endId);
            setPokemons(response);
            console.log(response)

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        pageInAnimation();
        fetchPokemons(1, 151);
    }, []);

    const handleChange = (event) => {
        const region = event.target.value;
        switch (region) {
            case '1':
                fetchPokemons(1, 151);
                break;
            case '2':
                fetchPokemons(152, 251);
                break;
            case '3':
                fetchPokemons(252, 386);
                break;
            case '4':
                fetchPokemons(387, 493);
                break;
            case '5':
                fetchPokemons(494, 649);
                break;
            case '6':
                fetchPokemons(650, 721);
                break;
            case '7':
                fetchPokemons(722, 809);
                break;
            default:
                break;
        }
    };


    const formatPokemonId = (id) => {
        if (id < 10) {
            return `#00${id}`;
        } else if (id < 100) {
            return `#0${id}`;
        } else {
            return `#${id}`;
        }
    };

    const getTypeColor = (type) => {
        switch (type.toLowerCase()) {
            case 'fire':
                return 'fire-type';
            case 'grass':
                return 'grass-type';
            case 'poison':
                return 'poison-type';
            case 'flying':
                return 'flying-type';
            case 'dragon':
                return 'dragon-type';
            case 'steel':
                return 'steel-type';
            case 'electric':
                return 'electric-type';
            case 'psychic':
                return 'psychic-type';
            case 'bug':
                return 'bug-type';
            case 'normal':
                return 'normal-type';
            case 'dark':
                return 'dark-type';
            case 'water':
                return 'water-type';
            case 'ice':
                return 'ice-type';
            case 'fairy':
                return 'fairy-type';
            case 'ground':
                return 'ground-type';
            case 'rock':
                return 'rock-type';
            case 'fighting':
                return 'ghost-type';
            case 'ghost':
                return 'ghost-type';

            default:
                return 'default-type';
        }
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredPokemons = pokemons.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const navigateHome = () => {
        navigate('/home');
      };


    return (
        <div className='pokedexWrapper' ref={pageScope}>
            <button className='backPageBtn'onClick={navigateHome}>← Back to Landing Page</button>

            <img className='logoPokemon' src={logo}></img>
            <div className='pokedexHeader'>
            <h1 className='title'>Pokedex</h1>
            <div className='searchbar'>
                <input
                    type="text"
                    placeholder="Search Pokémon by name..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
            </div>
            <div className='dropdown'>
                <label htmlFor="regionSelect">Select a region:</label>
                <select id="regionSelect" onChange={handleChange}   >
                    <option value="1">Kanto</option>
                    <option value="2">Johto</option>
                    <option value="3">Hoenn</option>
                    <option value="4">Sinnoh</option>
                    <option value="5">Unova</option>
                    <option value="6">Kalos</option>
                </select>
            </div>
            </div>
            {
                loading ? (
                    <p>Data is loading...</p>
                ) : (
                    <div>
                        <div className="pokemon-list">
                            {filteredPokemons.map((pokemon, index) => (
                                <div className='background' key={index}>
                                    <div className="pokemon pokemon-border" onClick={() => handlePokemonClick(pokemon.id)}>
                                        <img src={pokemon.sprites.front_default} alt={pokemon.name} />
                                        <p>{formatPokemonId(pokemon.id)}</p>
                                        <h2>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h2>
                                        <div className="pokemon-types">
                                            {pokemon.types.map((type, index) => (
                                                <span key={index} className={`pokemon-type ${getTypeColor(type.type.name)}`}>
                                                    {type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1)}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )
            }
        </div >
    );


};
export default Pokedex;
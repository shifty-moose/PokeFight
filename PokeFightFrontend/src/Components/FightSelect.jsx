import React, {useEffect, useState, useRef} from 'react';
import { useNavigate } from 'react-router-dom';
import {useAnimate} from 'framer-motion';
import pokemonAPI from '../../pokemonAPI';
import '../Styles/FightSelect.css';

const FightSelect = ({selectedPokemon, setSelectedPokemon, selectScreen, animateSelectScreen, audioRef}) => {

    const [loading, setLoading] = useState(true);
    const [pokemonList, setPokemonList] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [tempSelection, setTempSelection] = useState(null);
    const [selectedPokemonSprite, setSelectedPokemonSprite] = useState(false);
    const [selectedPokemonStats, setSelectedPokemonStats] = useState([{base_stat: 0}, {base_stat: 0}, {base_stat: 0}]);

    const [allBlocks, animateAllBlocks] = useAnimate();

    const blocksRef = useRef(null);

    

    console.log(audioRef.current)

    const [leftBlock1, animateLeftBlock1] = useAnimate();
    const [rightBlock1, animateRightBlock1] = useAnimate();
    const [leftBlock2, animateLeftBlock2] = useAnimate();
    const [rightBlock2, animateRightBlock2] = useAnimate();
    const [leftBlock3, animateLeftBlock3] = useAnimate();
    const [rightBlock3, animateRightBlock3] = useAnimate();
    const [leftBlock4, animateLeftBlock4] = useAnimate();
    const [rightBlock4, animateRightBlock4] = useAnimate();
    const [leftBlock5, animateLeftBlock5] = useAnimate();
    const [rightBlock5, animateRightBlock5] = useAnimate();

    const { getPokemons } = pokemonAPI();

    const navigate = useNavigate();

    const animateBlocks = () => {
        blocksRef.current.style.zIndex = '1'; 
        animateLeftBlock1(leftBlock1.current, {width: 1000}, {duration: 1.5});
        animateRightBlock1(rightBlock1.current, {width: 1000}, {duration: 1.5});
        animateLeftBlock2(leftBlock2.current, {width: 1000}, {duration: 1.5});
        animateRightBlock2(rightBlock2.current, {width: 1000}, {duration: 1.5});
        animateLeftBlock3(leftBlock3.current, {width: 1000}, {duration: 1.5});
        animateRightBlock3(rightBlock3.current, {width: 1000}, {duration: 1.5});
        animateLeftBlock4(leftBlock4.current, {width: 1000}, {duration: 1.5});
        animateRightBlock4(rightBlock4.current, {width: 1000}, {duration: 1.5});
        animateLeftBlock5(leftBlock5.current, {width: 1000}, {duration: 1.5});
        animateRightBlock5(rightBlock5.current, {width: 1000}, {duration: 1.5});
    }

    const fetchPokemons = async (startId, endId) => {
        try {
            setLoading(true);
            const response = await getPokemons(startId, endId);
            setPokemonList(response);
            setTimeout(() => setLoading(false), 0);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    const handlePokemonClick = (pokemon, event) => {

        if (event.target === selectedPokemonSprite) {
            console.log('same');
            setSelectedPokemonSprite(false);
            setTempSelection(null);
            setSelectedPokemonStats([{base_stat: 0}, {base_stat: 0}, {base_stat: 0}]);
            return;
        }

        setSelectedPokemonSprite(event.target);
        setSelectedPokemonStats(pokemon.stats);
        setTempSelection(pokemon);
    };

    const handleStartGame = () => {
        if (!selectedPokemonSprite) {
            return;
        }
        animateSelectScreen(selectScreen.current, {opacity: 0}, {duration: 1});
        animateBlocks();
        setTimeout(() => setSelectedPokemon(tempSelection), 1200);
    };

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

    useEffect(() => {
        fetchPokemons(1, 151);
    }, []);

    const filteredPokemonList = pokemonList.filter((pokemon) => {
        return pokemon.name.toLowerCase().includes(searchTerm.toLowerCase());
    });
    


  return (
    <>
    <div className='fighterSelectContainer' ref={selectScreen}>

        <div className='fighterSelectHeader'>
            <h1>Fight!</h1>
        </div>

        <div className='fighterSelectMiddle'>
            <div className='fighterSelectMiddleLeft'>
                {loading 
                ? <div className='pokemonLoading'><h3>Loading Pokémon...</h3></div>
                : <div className='pokemonList'>
                        {filteredPokemonList.map((pokemon, index) => {
                            return (
                                <div key={index} className='pokemonListItem'>
                                    <img src={pokemon.sprites.front_default} alt={pokemon.name} onClick={(e) => handlePokemonClick(pokemon, e)}/>
                                </div>
                            );
                        })}
                    </div>}
            </div>
            <div className='fighterSelectMiddleRight'>
                <div className='pokemonViewSprite'>
                    <img src={selectedPokemonSprite.src} alt={selectedPokemonSprite.alt} />
                    <h2>{selectedPokemonSprite ? selectedPokemonSprite.alt.charAt(0).toUpperCase() + selectedPokemonSprite.alt.slice(1) : null}</h2>
                </div>
                <div className='pokemonStats'>
                <table className='statTable'>
                    <tbody>
                    <tr>
                        <td className='tableLabel labelOdd'>HP</td>
                        <td className='tableValue valueOdd'>{selectedPokemonStats[0].base_stat}</td>
                    </tr>
                    <tr>
                        <td className='tableLabel labelEven'>Attack</td>
                        <td className='tableValue valueEven'>{selectedPokemonStats[1].base_stat}</td>
                    </tr>
                    <tr>
                        <td className='tableLabel labelOdd'>Defense</td>
                        <td className='tableValue valueOdd'>{selectedPokemonStats[2].base_stat}</td>
                    </tr>
                    </tbody>
                </table>
                </div>
            </div>
        </div>

        <div className='fighterSelectFooter'>
            <div className='fighterSelectFooterLeft'>
                <div className='searchSpriteWrapper'>
                    <input 
                        type='text' 
                        placeholder='Search here for a Pokémon...' 
                        value={searchTerm} 
                        onChange={(event) => setSearchTerm(event.target.value)}
                    />
                    <div className='regionDropdown'>
                    <h3>Region: </h3>
                    <select onChange={handleChange}>
                        <option value='1'>Kanto</option>
                        <option value='2'>Johto</option>
                        <option value='3'>Hoenn</option>
                        <option value='4'>Sinnoh</option>
                        <option value='5'>Unova</option>
                        <option value='6'>Kalos</option>
                    </select>
                    </div>
                                        
                    

                </div>
                <div className='fightInstructionsWrapper'>
                    <div className='fightInstruction'>
                        <h3>Select your Pokemon and click 'START' to Fight!</h3>
                    </div>
                </div>
            </div>
            <div className='fighterSelectFooterRight'>
                <div className='startBtn' onClick={handleStartGame}>
                    <h3 className='startBtnContent'>START</h3>
                </div>
            </div>
        </div>

    </div>
    <div className='animationBlocks' ref={blocksRef}>
        <div className='block1 animationBlockSingle' ref={leftBlock1}></div>
        <div className='block2 animationBlockSingle' ref={rightBlock1}></div>
        <div className='block3 animationBlockSingle' ref={leftBlock2}></div>
        <div className='block4 animationBlockSingle' ref={rightBlock2}></div>
        <div className='block5 animationBlockSingle' ref={leftBlock3}></div>
        <div className='block6 animationBlockSingle' ref={rightBlock3}></div>
        <div className='block7 animationBlockSingle' ref={leftBlock4}></div>
        <div className='block8 animationBlockSingle' ref={rightBlock4}></div>
        <div className='block9 animationBlockSingle' ref={leftBlock5}></div>
        <div className='block10 animationBlockSingle' ref={rightBlock5}></div>
    </div>
    </>
  )
}

export default FightSelect
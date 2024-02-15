import React, { useState, useEffect } from 'react';
import { useAnimate } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import "../Styles/Fight.css";
import FightDisplay from './FightDisplay.jsx';
import FightSelect from './FightSelect.jsx';
import FightGame from './FightGame.jsx';

const Fight = () => {

    const [spriteOne, animateSpriteOne] = useAnimate();
    const [spriteTwo, animateSpriteTwo] = useAnimate();
    const [selectScreen, animateSelectScreen] = useAnimate();

    const [selectedPokemon, setSelectedPokemon] = useState(null);

    const navigate = useNavigate();

    const [pageScope, animatePage] = useAnimate();

    const fightAudio = new Audio('https://vgmsite.com/soundtracks/pokemon-yellow-gb/eknsoiss/16_Battle%20%28VS%20Trainer%29.mp3');

    const pageOutAnimation = () => {
        animatePage(pageScope.current, { opacity: 0 }, { duration: 0.5 });
    };

    const pageInAnimation = () => {
        animatePage(pageScope.current, { opacity: 1 }, { duration: 1 });
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

    const handleClick = () => {
        animateSpriteOne(spriteOne.current, { x: 80, y: -30, transition: { duration: 0.3 } });
        setTimeout(() => animateSpriteOne(spriteOne.current, { x: 0, y: 0, transition: { duration: 0.3 } }), 300);
    };

    const handleClick2 = () => {
        animateSpriteTwo(spriteTwo.current, { x: -80, y: 30, transition: { duration: 0.3 } });
        setTimeout(() => animateSpriteTwo(spriteTwo.current, { x: 0, y: 0, transition: { duration: 0.3 } }), 300);
    }

    const navigateHome = () => {
        pageOutAnimation();
        setTimeout(() => navigate('/home'), 500);
    };

    useEffect(() => {
        pageInAnimation();
    }, []);

    return (
        <div className='fightWrapper' ref={pageScope}>
            <button className='backPageBtn' onClick={navigateHome}>← Back to Homepage</button>

            <div className='fightContainerBorder'>
                <div className="fightContainer">
                    {!selectedPokemon ? (
                        <FightSelect selectedPokemon={selectedPokemon} setSelectedPokemon={setSelectedPokemon} selectScreen={selectScreen} animateSelectScreen={animateSelectScreen} />
                    ) : (
                        console.log(selectedPokemon),
                        <FightGame pokemon={selectedPokemon} pokemon2={pokemon2} spriteOne={spriteOne} spriteTwo={spriteTwo} handleClick={handleClick} handleClick2={handleClick2} />
                    )}
                </div>
                <div className="gameBoyLogo">
                    <img src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/11a10a01-ac23-4fea-ad5a-b51f53084159/d6qt2ly-5c06d9cc-e979-4d32-bb59-2332cc124348.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzExYTEwYTAxLWFjMjMtNGZlYS1hZDVhLWI1MWY1MzA4NDE1OVwvZDZxdDJseS01YzA2ZDljYy1lOTc5LTRkMzItYmI1OS0yMzMyY2MxMjQzNDgucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.4-4SFVD9u86gKytA4WiCHt7D5htmRzkSR2biBbzrHPY" alt="gameboy logo" />
                </div>
            </div>
        </div>
    )
}

export default Fight;
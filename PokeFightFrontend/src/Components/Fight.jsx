import React, { useState } from 'react';
import { useAnimate } from 'framer-motion';

import "../Styles/Fight.css";
import { useEffect } from 'react';
import pokemonAPI from '../../pokemonAPI';

const Fight = () => {



    const [spriteOne, animateSpriteOne] = useAnimate();
    const [spriteTwo, animateSpriteTwo] = useAnimate();
    const [attackMessage, setAttackMessage] = useState("");
    const [isAttacking, setIsAttacking] = useState(false);
    const [pkm2, setpkm2] = useState(true);
    const [loading, setLoading] = useState(true);
    const [pokemon1HPWidth, setPokemon1HPWidth] = useState(100);
    const [pokemon2HPWidth, setPokemon2HPWidth] = useState(100);
    const [totalDamage, setTotalDamage] = useState(1);
    const [wins, setWins] = useState(1);


    const { getPokemon, addScore } = pokemonAPI();

    const getRandomPokemonId = () => {
        return Math.floor(Math.random() * 721) + 1;
    };

    const id = getRandomPokemonId();


    const fetchPokemon = async () => {
        try {
            setLoading(true);
            const { name: { english: name }, sprites: { front_default: sprite }, base: { Attack: attack }, base: { HP: hp }, base: { Defense: defense }, base: { Speed: speed } } = await getPokemon(id);
            setPokemon2({ name, speed, sprite, attack, defense, hp });

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };
    const [initialPokemon1HP, setInitialPokemon1HP] = useState();

    useEffect(() => {
        fetchPokemon();
        setInitialPokemon1HP(pokemon1.hp);

    }, [])

    const [pokemon1, setPokemon1] = useState({
        name: 'PIKACHU',
        type: 'Electric',
        hp: 1110,
        attack: 155,
        defense: 40,
        spAttack: 50,
        spDefense: 50,
        speed: 100,
        sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/25.png'
    });

    const [pokemon2, setPokemon2] = useState({});

    ;


    const spirit1Attack = () => {
        animateSpriteOne(spriteOne.current, { x: 80, y: -30, transition: { duration: 0.3 } });
        setTimeout(() => animateSpriteOne(spriteOne.current, { x: 0, y: 0, transition: { duration: 0.3 } }), 300);
    };

    const spirit2Attack = () => {
        animateSpriteTwo(spriteTwo.current, { x: -80, y: 30, transition: { duration: 0.3 } });
        setTimeout(() => animateSpriteTwo(spriteTwo.current, { x: 0, y: 0, transition: { duration: 0.3 } }), 300);
    }

    const spirit2Faint = () => {
        animateSpriteTwo(spriteTwo.current, { x: 0, y: 60, transition: { duration: 0.5 } });
    }

    const dodgeProbability = 0.5;
    const criticalHitProbability = 0.1;

    const isDodged = () => Math.random() < dodgeProbability;
    const isCriticalHit = () => Math.random() < criticalHitProbability;

    const fight = () => {
        const damageMultiplier1 = isCriticalHit() ? 1.5 : 1;
        const dodge1 = isDodged() ? 0 : 1;


        const firstAttacker = pokemon1;
        const secondAttacker = pokemon2;

        const damage = Math.round(20 * (firstAttacker.attack / secondAttacker.defense) * damageMultiplier1 * dodge1);
        setTotalDamage(prevTotalDamage => prevTotalDamage + damage);
        const remainingHP2 = Math.max(secondAttacker.hp - damage, 0);


        const remainingHPPercentage2 = Math.max(0, Math.min(100, (remainingHP2 / secondAttacker.hp) * 100));
        setIsAttacking(true);


        // Update state for the second attacker (opponent)
        setPokemon2({ ...secondAttacker, hp: remainingHP2 });
        if (damage > 1) {
            setPokemon2HPWidth(remainingHPPercentage2);
        }
        setAttackMessage(`${firstAttacker.name} USED TACKLE`)
        setTimeout(() => {
            if (damageMultiplier1 > 1.1 && damage > 0) {
                setAttackMessage("It was critical")
            } else if (damage === 0) {
                setAttackMessage(`${firstAttacker.name} missed the attack`)
            }
        }, 1000);
        spirit1Attack();


        if (remainingHP2 === 0) {
            setTimeout(() => {
                spirit2Faint();
                setAttackMessage(`Enemy's ${secondAttacker.name} has fainted! You get some HP back`)
                setWins(prevTotalWins => prevTotalWins + 1);
                setPokemon1({ ...firstAttacker, hp: firstAttacker.hp + 20 });



                setTimeout(async () => {

                    setpkm2(false);
                    setTimeout(() => {
                        setAttackMessage(`Oppenent is about the send new pokemon out.`)
                    }, 2500);
                }, 100);
            }, 2500);

            return 0;
        }


        setTimeout(() => {
            const damageMultiplier2 = isCriticalHit() ? 1.5 : 1;
            const dodge2 = isDodged() ? 0 : 1;
            // Calculate damage I need to adjust it still
            const damage2 = Math.round(20 * (secondAttacker.attack / firstAttacker.defense) * damageMultiplier2 * dodge2);
            const remainingHP1 = Math.max(firstAttacker.hp - damage2, 0);
            const remainingHPPercentage1 = Math.max(0, Math.min(100, (remainingHP1 / firstAttacker.hp) * 100));

            setPokemon1({ ...firstAttacker, hp: remainingHP1 });
            if (damage2 > 1) {
                setPokemon1HPWidth(remainingHPPercentage1);
            }
            setAttackMessage(`${secondAttacker.name} USED TACKLE`)
            spirit2Attack();
            setTimeout(() => {
                if (damageMultiplier2 > 1.1 & damage2 > 0) {
                    setAttackMessage("It was critical")
                } else if (damage2 == 0) {
                    setAttackMessage(`${secondAttacker.name} missed the attack`)
                }
            }, 1000);

            setTimeout(() => {
                if (remainingHP1 === 0) {
                    setAttackMessage(`${firstAttacker.name} is unable to battle! You lost  100 pokecoins`)
                    return 0;
                }


                setTimeout(() => {
                    setAttackMessage("Attack again?");
                    setIsAttacking(false);
                }, 1000);
            }, 2000);

        }, 3000);




    }

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className='fightWrapper'>
            <div className="fightContainer">
                <div className="fightTopRow">
                    <div className="fightTopRowLeft">
                        <div className='topPokemonStatScreen'>
                            {pkm2 && (
                                <div className='statsDiv topLeftStatsDiv'>

                                    <h3>{pokemon2.name.toUpperCase()}</h3>
                                    <div className='hpBarContainer'>
                                        <h5>HP:</h5>
                                        <div className='hpBar'>
                                            <div className='hpBarFill' style={{ width: `${pokemon2HPWidth}%`, transition: 'width 1.5s ease-in-out' }}></div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="fightTopRowRight">
                        <div className='pokemonSprite topPokemonSprite'>
                            {pkm2 && <img src={pokemon2.sprite} alt={pokemon2.name} ref={spriteTwo} />}
                        </div>
                    </div>
                </div>

                <div className="fightBottomRow">
                    <div className="fightBottomRowLeft">
                        <div className='pokemonSprite bottomPokemonSprite'>
                            {pokemon1.hp > 0 &&
                                <img src={pokemon1.sprite} alt="Pikachu" ref={spriteOne} />}
                        </div>
                    </div>

                    <div className="fightBottomRowRight">
                        <div className='bottomPokemonStatScreen'>
                            {pokemon1.hp > 0 && (
                                <div className='statsDiv bottomRightStatsDiv'>
                                    <h3>{pokemon1.name}</h3>
                                    <div className='hpBarContainer'>
                                        <h5>HP:</h5>
                                        <div className='hpBar'>
                                            <div className='hpBarFill' style={{ width: `${pokemon1HPWidth}%`, transition: 'width 1.5s ease-in-out' }}></div>
                                            <h5>{`${initialPokemon1HP} / ${pokemon1.hp}`}</h5>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="fightStats">
                    <div className="fightStatsLeft">
                        <div className="attackMoves">
                            <div className="attackMoveContainer">
                                {attackMessage && <p>{attackMessage}</p>}

                            </div>
                        </div>
                    </div>

                    <div className="fightStatsRight">
                        <div className="defenseMoves">
                            {!isAttacking && <h3 onClick={fight}>TACKLE</h3>}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Fight;
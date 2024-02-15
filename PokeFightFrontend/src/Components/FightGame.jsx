import React, { useState } from 'react';
import { useAnimate } from 'framer-motion';
import "../Styles/FightGame.css";
import { useEffect } from 'react';
import pokemonAPI from '../../pokemonAPI';
import { useNavigate } from 'react-router-dom';



const FightGame = ({ pokemon }) => {

    const navigate = useNavigate();
    const [spriteOne, animateSpriteOne] = useAnimate();
    const [spriteTwo, animateSpriteTwo] = useAnimate();
    const [attackMessage, setAttackMessage] = useState("");
    const [isAttacking, setIsAttacking] = useState(false);
    const [pkm2, setpkm2] = useState(true);
    const [loading, setLoading] = useState(true);
    const [pokemon1HPWidth, setPokemon1HPWidth] = useState(100);
    const [pokemon2HPWidth, setPokemon2HPWidth] = useState(100);
    const [totalDamage, setTotalDamage] = useState(1);
    const [wins, setWins] = useState(10);
    const [name, setName] = useState('');
    const [showForm, setShowForm] = useState(false);
    const { getPokemon, addScore, addHighscore } = pokemonAPI();
    const [highscore, setHighScore] = useState(1)

    const getRandomPokemonId = () => {
        return Math.floor(Math.random() * 721) + 1;
    };

    const id = getRandomPokemonId();


    const fetchPokemon = async () => {

        try {

            const { name: { english: name }, sprites: { front_default: sprite }, base: { Attack: attack }, base: { HP: hp }, base: { Defense: defense }, base: { Speed: speed } } = await getPokemon(id);
            setPokemon2({ name, speed, sprite, attack, defense, hp });
            setPokemon2HPWidth(100)
            setPokemon2({ name, speed, sprite, attack, defense, hp });

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const [pokemon1, setPokemon1] = useState({});

    const [pokemon2, setPokemon2] = useState({});
    const [one, set1] = useState();

    useEffect(() => {
        fetchPokemon();

        const { name, sprites: { back_default: sprite }, stats } = pokemon;
        const { base_stat: hp } = stats.find(stat => stat.stat.name === 'hp');
        const { base_stat: attack } = stats.find(stat => stat.stat.name === 'attack');
        const { base_stat: defense } = stats.find(stat => stat.stat.name === 'defense');
        setPokemon1({ sprite, name, hp, attack, defense });

    }, [])


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

    const dodgeProbability = 0.1;
    const criticalHitProbability = 0.1;

    const isDodged = () => Math.random() < dodgeProbability;
    const isCriticalHit = () => Math.random() < criticalHitProbability;

    const fight = () => {
        const damageMultiplier1 = isCriticalHit() ? 1.5 : 1;
        const dodge1 = isDodged() ? 0 : 1;

        console.log(pokemon1)

        const firstAttacker = pokemon1;
        const secondAttacker = pokemon2;

        console.log(firstAttacker, "this")

        const damage = Math.round(15 * (firstAttacker.attack / secondAttacker.defense) * damageMultiplier1 * dodge1);
        setTotalDamage(prevTotalDamage => prevTotalDamage + damage);
        const remainingHP2 = Math.max(secondAttacker.hp - damage, 0);


        const remainingHPPercentage2 = Math.max(0, Math.min(100, (remainingHP2 / secondAttacker.hp) * 100));
        setIsAttacking(true);


        // Update state for the second attacker (opponent)
        setPokemon2({ ...secondAttacker, hp: remainingHP2 });
        if (damage > 1) {
            setPokemon2HPWidth(remainingHPPercentage2);
        }
        setAttackMessage(`${firstAttacker.name.toUpperCase()} USED TACKLE`)
        setTimeout(() => {
            if (damageMultiplier1 > 1.1 && damage > 0) {
                setAttackMessage("It was critical")
            } else if (damage === 0) {
                setAttackMessage(`${firstAttacker.name.toUpperCase()} missed the attack`)
            }
        }, 1000);
        spirit1Attack();


        if (remainingHP2 === 0) {
            setTimeout(() => {
                spirit2Faint();
                setAttackMessage(`Enemy's ${secondAttacker.name} has fainted! You get some HP back`)
                setWins(prevTotalWins => prevTotalWins + 1);
                setPokemon1({ ...firstAttacker, hp: firstAttacker.hp + 20 });



                setTimeout(() => {

                    setpkm2(false);
                    setTimeout(async () => {
                        setAttackMessage(`Oppenent is about the send new pokemon out.`)
                        await fetchPokemon();
                        setpkm2(true);


                    }, 1500);
                }, 500);
            }, 2000);


        }


        setTimeout(() => {
            const damageMultiplier2 = isCriticalHit() ? 1.5 : 1;
            const dodge2 = isDodged() ? 0 : 1;
            // Calculate damage I need to adjust it still
            const damage2 = Math.round(20 * (secondAttacker.attack / firstAttacker.defense) * damageMultiplier2 * dodge2);
            const remainingHP1 = Math.max(firstAttacker.hp - damage2, 0);
            const remainingHPPercentage1 = Math.max(0, Math.min(100, (remainingHP1 / pokemon1.hp) * 100));

            setPokemon1({ ...firstAttacker, hp: remainingHP1 });
            if (damage2 > 1) {
                setPokemon1HPWidth(remainingHPPercentage1);
            }

            setAttackMessage(`${pokemon2.name.toUpperCase()} USED TACKLE`)
            spirit2Attack();
            setTimeout(() => {
                if (damageMultiplier2 > 1.1 & damage2 > 0) {
                    setAttackMessage("It was critical")
                } else if (damage2 == 0) {
                    setAttackMessage(`${secondAttacker.name.toUpperCase()} missed the attack`)
                }
            }, 1000);

            setTimeout(() => {
                if (remainingHP1 === 0) {
                    setHighScore(totalDamage * wins)
                    setAttackMessage(`${firstAttacker.name.toUpperCase()} is unable to battle!You lost`)
                    setTimeout(() => {
                        setShowForm(true);
                    }, 2000);
                    return 0;
                }


                setTimeout(() => {
                    setAttackMessage("Attack again?");
                    setIsAttacking(false);
                }, 1000);
            }, 2000);

        }, 6000);

    }

    const handleFormSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission
        try {
            const data = {
                name: name,
                pokemon: pokemon1.name,
                damage: totalDamage,
                highscore: totalDamage * wins,
                date: new Date()
            };
            const response = await addHighscore(data);
            console.log('Server response:', response);
            navigate('/leaderboards');

        } catch (error) {
            console.error('Error:', error);
            // Handle error
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (showForm) {
        return (
            <form onSubmit={handleFormSubmit}>
                <label>
                    Enter your name:<br></br>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </label>
                <button type="submit">Submit</button>
            </form>
        );
    }

    return (
        <div className='fightScreenDiv'>
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
                            <img src={pokemon1.sprite} alt={pokemon1.name} ref={spriteOne} />}
                    </div>
                </div>

                <div className="fightBottomRowRight">
                    <div className='bottomPokemonStatScreen'>
                        {pokemon1.hp > 0 && (
                            <div className='statsDiv bottomRightStatsDiv'>
                                <h3>{pokemon1.name.toUpperCase()}</h3>
                                <div className='hpBarContainer'>
                                    <h5>HP:</h5>
                                    <div className='hpBar'>
                                        <div className='hpBarFill' style={{ width: `${pokemon1HPWidth}%`, transition: 'width 1.5s ease-in-out' }}></div>
                                        <h5>{`${one}`}</h5>
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
    )
}

export default FightGame;
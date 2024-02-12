import pokecenterSprite from '../Images/pokedexSprite.png';
import gymSprite from '../Images/gymSprite.png';
import leaderboardSprite from '../Images/leaderboardSprite.png';

const buildingSprites = {
    pokecenter: {
            id: 1,
            buildingName: "pokecenter",
            title: "PokéDex",
            sprite: pokecenterSprite,
            },
    gym: {
            id: 2,
            buildingName: "gym",
            title: "Fight!",
            sprite: gymSprite,
            },
    leaderboard: {
            id: 3,
            buildingName: "leaderboard",
            title: "Leaderboards",
            sprite: leaderboardSprite,
            }
        };

export default buildingSprites;
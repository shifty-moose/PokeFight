
import pokemons from "../pokemon.json" assert { type: "json" };

export const getPokemons = (req, res) => {

    res.json(pokemons)
};

export const getPokemon = (req, res) => {
    let { id } = req.params;
    const pokemon = pokemons.find(pokemon => pokemon.id === parseInt(id));
    if (pokemon) {
        res.json(pokemon);
    } else {
        res.status(404).send("There is no such pokemon");
    }
};


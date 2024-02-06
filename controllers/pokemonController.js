import fs from 'fs';
const pokemons = JSON.parse(fs.readFileSync('./pokemon.json', 'utf-8'))

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


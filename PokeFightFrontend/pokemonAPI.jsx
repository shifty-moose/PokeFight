import React from 'react'

const pokemonAPI = () => {

    const getPokemons = async (startId, endId) => {
        try {
            const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${endId - startId + 1}&offset=${startId - 1}`);
            const { results } = await res.json();

            const pokemonDataArray = await Promise.all(results.map(async (pokemon) => {
                const res = await fetch(pokemon.url);
                const data = await res.json();
                const { name, sprites, id, types } = data;
                return { name, sprites, id, types };
            }));

            return pokemonDataArray;
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    const getPokemon = async (id) => {
        try {
            const res = await fetch(`http://localhost:3000/${id}`);
            const data = await res.json();

            const pokemonAPIRes = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
            const { cries, sprites } = await pokemonAPIRes.json();

            return { cries, sprites, ...data };

        } catch (error) {
            console.log(error);
        }
    }


    const addHighscore = async (pokeData) => {
        try {
            const res = await fetch("http://localhost:3000/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(pokeData)
            });
            const data = await res.json();
            return data;
        } catch (error) {
            console.log(error);
        }
    };





    return { getPokemons, getPokemon, addHighscore };
}
export default pokemonAPI;
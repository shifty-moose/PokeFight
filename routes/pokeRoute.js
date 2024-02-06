import express from 'express';
import { getPokemon, getPokemons } from '../controllers/pokemonController.js';

const pokemonRoutes = express.Router();

pokemonRoutes.get('/', getPokemons);
pokemonRoutes.get('/:id', getPokemon);

export default pokemonRoutes;
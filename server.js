import express from 'express';
import pokemonRoutes from './routes/pokeRoute.js';


const app = express();
const port = 3000;


app.use(express.json());
app.use('/pokemons', pokemonRoutes);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
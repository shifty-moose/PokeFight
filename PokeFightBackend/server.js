import express from 'express';
import pokemonRoutes from './routes/pokeRoute.js';
import cors from 'cors';


const app = express();
const port = 3000;

app.use(cors());


app.use(express.json());
app.use('/', pokemonRoutes);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
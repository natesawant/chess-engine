import express from 'express';
import { returnGame } from './engine';
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/test', (req, res) => {
  const game = returnGame();
  res.send(game);
})

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
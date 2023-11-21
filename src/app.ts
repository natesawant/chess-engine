import express from 'express';
import { returnGame, nextBestMove } from './engine';
const app = express();
const port = 3000;

app.use(express.json());

app.get('/healthcheck', (req, res) => {
  res.send('Live');
});

app.get('/test', (req, res) => {
  const game = returnGame();
  res.send(game);
})

app.post('/engine', (req, res) => {
  const fen = req.body.fen

  if (fen) {
    res.send(nextBestMove(fen));
  } else {
    res.status(400);
    res.send();
  }
})

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
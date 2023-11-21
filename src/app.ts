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

// GET method route
app.get('/', (req, res) => {
  res.send('GET request to the homepage')
})

app.post('/', (req, res) => {
  res.send('POST request to the homepage')
})

app.post('/engine', (req, res) => {
  const fen = req.body.fen
  const depth = req.body.depth

  if (fen) {
    res.status(200)
    res.send(nextBestMove(fen, depth));
  } else {
    res.status(400);
    res.send('test');
  }
})

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
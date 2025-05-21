import express from 'express';
import mongoose from 'mongoose';
import MainRouter from './routes/MainRouter.js';
import ShipRouter from './routes/ShipRouter.js';

const app = express();
const port = 3000;

app.use(express.json());

const uri =
  'mongodb+srv://username123:sami5058@cluster0.dy6dz3y.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const clientOptions = {
  serverApi: { version: '1', strict: true, deprecationErrors: true },
};

mongoose.connect(uri, clientOptions).then(() => console.log('Connected to DB'));

// Route pincipale
app.get('/', (req, res) => {
  2;
  res.send(`Bienvenue sur la page principale`);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

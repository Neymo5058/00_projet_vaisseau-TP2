import express from 'express';
import mongoose from 'mongoose';
import MainRouter from './routes/MainRouter.js';
import ShipRouter from './routes/ShipRouter.js';

const app = express();
const port = 3000;

app.use(express.json());

const uri =
  'mongodb+srv://username123:sami5058@cluster0.dy6dz3y.mongodb.net/00_projet_vaisseau?retryWrites=true&w=majority&appName=Cluster0';
const clientOptions = {
  serverApi: { version: '1', strict: true, deprecationErrors: true },
};

mongoose.connect(uri, clientOptions).then(() => console.log('Connected to DB'));

// Route pincipale
app.get('/', (req, res) => {
  2;
  res.send(`Bienvenue sur la page principale`);
});

app.use((err, req, res, next) => {
  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({
      status: 'fail',
      errors,
    });
  }

  res.status(err.status || 500).json({
    status: 'error',
    message: err.message || 'Erreur interne du serveur',
  });
});

app.use('/', MainRouter);
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

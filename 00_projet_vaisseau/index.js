import express from 'express';
import mongoose from 'mongoose';
import MainRouter from './routes/MainRouter.js';
import ShipRouter from './routes/ShipRouter.js';

const app = express();
const port = 3000;

app.use(express.json());

const uri = "mongodb+srv://jonatantd2:Anjo7784@cluster0.ducq7xk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const clientOptions = {
  serverApi: { version: '1', strict: true, deprecationErrors: true },
};

mongoose.connect(uri, clientOptions).then(() => console.log('Connected to DB'));

app.use("/", MainRouter);

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});

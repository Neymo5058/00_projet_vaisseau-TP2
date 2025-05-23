import express from 'express';
import ShipRouter from './ShipRouter.js';
import ComponentRouter from './componentRouter.js';

const MainRouter = express.Router();

MainRouter.use('/ships', ShipRouter);
MainRouter.use('/components', ComponentRouter);
// Ships API routes
MainRouter.use('/ships', ShipRouter);

// Components API routes
MainRouter.use('/components', ComponentRouter);

// Optional combat route between ships
MainRouter.post('/combat', async (req, res) => {
  // Example expected: { attackerShipId: "xxx", defenderShipId: "yyy" }
  res.status(501).json({ message: 'Combat logic not implemented yet' });
});

export default MainRouter;

import express from 'express';
import ShipRouter from './ShipRouter.js';
import ComponentRouter from './componentRouter.js';

const MainRouter = express.Router();

MainRouter.use('/ships', ShipRouter);
MainRouter.use('/components', ComponentRouter);

MainRouter.post('/combat', (req, res) => {
  // TODO: req.body should somewhat look like : { attackerShipId: ID, defenderShipId: ID}
  // the response could be something like { isDefenderDestroyed: Boolean, defenderShip}
});

export default MainRouter;

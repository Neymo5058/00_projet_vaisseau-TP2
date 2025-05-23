import express from 'express';
import ShipController from '../controller/ShipController.js';

const ShipRouter = express.Router();

ShipRouter.get('/', ShipController.getAll);
ShipRouter.get('/:shipId', ShipController.getById);
ShipRouter.post('/', ShipController.create);
ShipRouter.post('/batchCreate', ShipController.batchCreate);
ShipRouter.delete('/:shipId', ShipController.remove);
ShipRouter.post('/:shipId/attack', ShipController.attack);
ShipRouter.post('/:shipId/move', ShipController.move);

export default ShipRouter;

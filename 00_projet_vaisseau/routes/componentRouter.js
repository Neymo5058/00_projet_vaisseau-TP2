import express from 'express';
import ComponentController from '../controller/componentController.js';

const ComponentRouter = express.Router();
ComponentRouter.post('/', ComponentController.create);
ComponentRouter.get('/', ComponentController.getAll);
ComponentRouter.get('/:componentId', ComponentController.getById);
ComponentRouter.delete('/:componentId', ComponentController.remove);
ComponentRouter.patch('/:componentId', ComponentController.update);

export default ComponentRouter;

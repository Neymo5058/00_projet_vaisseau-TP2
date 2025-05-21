import { Types } from 'mongoose';
import ShipModel from '../model/ShipModel.js';

const ShipController = {
  getAll: async (req, res) => {
    // TODO
    try {
      const ships = await ShipModel.find();
      res.status(200).json({
        status: 'success',
        results: ships.length,
        data: {
          ships: ships,
        },
      });
    } catch (err) {
      res.status(404).json({
        status: 'fail',
        message: `Vaisseaux non-trouvé`,
      });
    }
  },
  getById: async (req, res) => {
    // TODO
    try {
      const ship = await ShipModel.findById(req.params.shipId);

      res.status(200).json({
        status: 'success',
        data: {
          ship: ship,
          message: `Voici le vaisseaux recherché `,
        },
      });
    } catch (err) {}
  },
  create: async (req, res) => {
    // TODO
    try {
      const newShip = await ShipModel.create(req.body);

      res.status(201).json({
        status: 'success',
        data: {
          ship: newShip,
        },
      });
    } catch (err) {
      res.status(400).json({
        status: 'fail',
        message: 'Ce vaisseaux exsiste deja',
      });
    }
  },
  batchCreate: async (req, res) => {
    // TODO : receive an array of ships and create them all. Should be usefull to populate you database
    try {
      const ships = await ShipModel.create(req.body, { ordered: false });
      res.status(201).json({
        status: 'success',
        data: {
          ships,
        },
      });
    } catch (err) {
      res.status(400).json({
        status: 'fail',
        message: `Les vaisseaux n'ont pas été créés`,
      });
    }
  },
  remove: async (req, res) => {
    // TODO
    try {
      const ship = await ShipModel.findByIdAndDelete(req.params.shipId);
      res.status(200).json({
        status: 'success',
        data: null,
      });
    } catch (err) {
      res.status(404).json({
        status: 'fail',
        message: `Le vaisseaux a ete supprimée avec succes `,
      });
    }
  },
};
export default ShipController;

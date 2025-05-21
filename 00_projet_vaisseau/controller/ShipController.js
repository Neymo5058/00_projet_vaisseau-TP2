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
          message: `Voici le vaisseaux recherché 🔍 `,
        },
      });
      console.log(ship);
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
      console.log(ship);
    } catch (err) {
      res.status(400).json({
        status: 'fail',
        message: 'Ce vaisseaux exsiste deja 🚩',
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
        message: 'Les composante non pas populé',
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
        message: `La composante a ete supprimée avec succes `,
      });
    }
  },
};
export default ShipController;

import { Types } from 'mongoose';
import ShipModel from '../model/ShipModel.js';

const ShipController = {
  getAll: async (req, res) => {
    try {
      const ships = await ShipModel.find()
        .populate('componentSlots.thruster')
        .populate('componentSlots.hull')
        .populate('componentSlots.shield')
        .populate('componentSlots.engine')
        .populate('componentSlots.weapon')
        .populate('componentSlots.radar')
        .populate('componentSlots.battery');

      res.status(200).json({
        status: 'success',
        results: ships.length,
        data: { ships },
      });
    } catch (err) {
      res.status(500).json({
        status: 'fail',
        message: `Erreur interne du serveur`,
      });
    }
  },
  getById: async (req, res) => {
    try {
      const ship = await ShipModel.findById(req.params.shipId)
        .populate('componentSlots.thruster')
        .populate('componentSlots.hull')
        .populate('componentSlots.shield')
        .populate('componentSlots.engine')
        .populate('componentSlots.weapon')
        .populate('componentSlots.radar')
        .populate('componentSlots.battery');

      if (!ship) {
        return res.status(404).json({
          status: 'fail',
          message: 'Vaisseau introuvable',
        });
      }

      res.status(200).json({
        status: 'success',
        data: {
          ship,
          message: `Voici le vaisseau recherché `,
        },
      });
    } catch (err) {
      res.status(500).json({
        status: 'fail',
        message: `Erreur interne du serveur `,
      });
    }
  },
  create: async (req, res) => {
    try {
      const newShip = await ShipModel.create(req.body);
      const populatedShip = await ShipModel.findById(newShip._id)
        .populate('componentSlots.thruster')
        .populate('componentSlots.hull')
        .populate('componentSlots.shield')
        .populate('componentSlots.engine')
        .populate('componentSlots.weapon')
        .populate('componentSlots.radar')
        .populate('componentSlots.battery');

      res.status(201).json({
        status: 'success',
        data: {
          ship: populatedShip,
        },
      });
    } catch (err) {
      res.status(400).json({
        status: 'fail',
        message:
          'Mauvaise requête, ce vaisseau éxiste déja ou les données sont invalides ',
      });
    }
  },
  batchCreate: async (req, res) => {
    try {
      const ships = await ShipModel.create(req.body, { ordered: false });

      const populatedShips = await ShipModel.find({
        _id: { $in: ships.map((ship) => ship._id) },
      })
        .populate('componentSlots.thruster')
        .populate('componentSlots.hull')
        .populate('componentSlots.shield')
        .populate('componentSlots.engine')
        .populate('componentSlots.weapon')
        .populate('componentSlots.radar')
        .populate('componentSlots.battery');

      res.status(201).json({
        status: 'success',
        data: {
          ships: populatedShips,
        },
      });
    } catch (err) {
      res.status(400).json({
        status: 'fail',
        message: `Les vaisseaux n'ont pas été créés ou erreurs`,
      });
    }
  },
  remove: async (req, res) => {
    try {
      const ship = await ShipModel.findByIdAndDelete(req.params.shipId)
        .populate('componentSlots.thruster')
        .populate('componentSlots.hull')
        .populate('componentSlots.shield')
        .populate('componentSlots.engine')
        .populate('componentSlots.weapon')
        .populate('componentSlots.radar')
        .populate('componentSlots.battery');

      if (!ship) {
        return res.status(404).json({
          status: 'fail',
          message: `Vaisseau introuvable`,
        });
      }

      res.status(200).json({
        status: 'success',
        message: 'Vaisseau supprimé avec succes',
        data: { ship },
      });
    } catch (err) {
      res.status(500).json({
        status: 'fail',
        message: `Erreur lors de la supression `,
      });
    }
  },
};
export default ShipController;

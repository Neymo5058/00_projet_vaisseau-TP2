import { Types } from 'mongoose';
import ShipModel from '../model/ShipModel.js';

const ShipController = {
  getAll: async (req, res, next) => {
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
      next(err);
    }
  },
  getById: async (req, res, next) => {
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
        const error = new Error('Vaisseau introuvable');
        error.status = 404;
        throw error;
      }

      res.status(200).json({
        status: 'success',
        data: {
          ship,
          message: `Voici le vaisseau recherché `,
        },
      });
    } catch (err) {
      next(err);
    }
  },
  create: async (req, res, next) => {
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
      next(err);
    }
  },
  update: async (req, res, next) => {
    try {
      const ship = await ShipModel.findOneAndUpdate(
        { _id: req.params.shipId },
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );
      if (!ship) {
        const error = new Error('Vaisseau introuvable');
        error.status = 404;
        throw error;
      }

      res.status(200).json({
        status: 'success',
        data: {
          ship,
        },
      });
    } catch (err) {
      next(err);
    }
  },

  // TODO Update
  batchCreate: async (req, res, next) => {
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
      next(err);
    }
  },
  remove: async (req, res, next) => {
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
        const error = new Error('Vaisseau introuvable');
        error.status = 404;
        throw error;
      }

      res.status(200).json({
        status: 'success',
        message: 'Vaisseau supprimé avec succes',
        data: { ship },
      });
    } catch (err) {
      next(err);
    }
  },
};
export default ShipController;

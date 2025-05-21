import { Types } from 'mongoose';
import ComponentModel from '../model/componentModel.js';

const ComponentController = {
  getAll: async (req, res) => {
    // TODO
    try {
      const components = await ComponentModel.find();

      res.status(200).json({
        status: 'success',
        results: components.length,
        data: {
          components: components,
        },
      });
    } catch (err) {
      res.status(404).json({
        status: 'fail',
        message: `Composante non-trouvé`,
      });
    }
  },
  getById: async (req, res) => {
    // TODO
    try {
      const component = await ComponentModel.findById(req.params.componentId);
      if (!component) return res.status(404).json({ message: 'Introuvable' });

      res.status(200).json({
        status: 'success',
        data: {
          component: component,
          message: `Composante recherché 🔍 `,
        },
      });
    } catch (err) {}
  },
  create: async (req, res) => {
    // TODO
    try {
      const newComponent = await ComponentModel.create(req.body);

      res.status(201).json({
        status: 'success',
        data: {
          component: newComponent,
        },
      });
    } catch (err) {
      res.status(400).json({
        status: 'fail',
        message: 'Cette composante exsiste deja',
      });
    }
  },
  update: async (req, res) => {
    try {
      const component = await ComponentModel.findOneAndUpdate(
        { _id: req.params.componentId },
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );
      if (!component) return res.status(404).json({ message: 'Introuvable' });

      res.status(200).json({
        status: 'success',
        data: {
          component,
        },
      });
    } catch (err) {
      res.status(404).json({
        status: 'fail',
        message: err,
      });
    }
  },
  remove: async (req, res) => {
    // TODO
    try {
      const component = await ComponentModel.findByIdAndDelete(
        req.params.componentId
      );
      if (!component) return res.status(404).json({ message: 'Introuvable' });

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
export default ComponentController;

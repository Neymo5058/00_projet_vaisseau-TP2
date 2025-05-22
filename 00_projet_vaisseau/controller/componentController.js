import { Types } from 'mongoose';
import ComponentModel from '../model/componentModel.js';

const ComponentController = {
  getAll: async (req, res, next) => {
    try {
      const components = await ComponentModel.find();

      res.status(200).json({
        status: 'success',
        results: components.length,
        data: { components },
      });
    } catch (err) {
      next(err);
    }
  },
  getById: async (req, res, next) => {
    try {
      const component = await ComponentModel.findById(req.params.componentId);
      if (!component) {
        const error = new Error('Composante introuvable');
        error.status = 404;
        throw error;
      }

      res.status(200).json({
        status: 'success',
        message: `Composante recherché  `,
        data: { component },
      });
    } catch (err) {
      next(err);
    }
  },
  // TODO
  create: async (req, res, next) => {
    try {
      const { name, category } = req.body;
      if (!name || !category) {
        const error = new Error('Veuillez fournir un nom et une catégorie');
        error.status = 400;
        throw error;
      }
      const newComponent = await ComponentModel.create(req.body);

      res.status(201).json({
        status: 'success',
        data: {
          component: newComponent,
        },
      });
    } catch (err) {
      next(err);
    }
  },
  update: async (req, res, next) => {
    try {
      const component = await ComponentModel.findOneAndUpdate(
        { _id: req.params.componentId },
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );
      if (!component) {
        const error = new Error('Composante introuvable');
        error.status = 404;
        throw error;
      }

      res.status(200).json({
        status: 'success',
        data: {
          component,
        },
      });
    } catch (err) {
      next(err);
    }
  },
  remove: async (req, res, next) => {
    try {
      const component = await ComponentModel.findByIdAndDelete(
        req.params.componentId
      );
      if (!component) {
        const error = new Error('Composante introuvable');
        error.status = 404;
        throw error;
      }

      res.status(200).json({
        status: 'success',
        data: null,
      });
    } catch (err) {
      next(err);
    }
  },
};
export default ComponentController;

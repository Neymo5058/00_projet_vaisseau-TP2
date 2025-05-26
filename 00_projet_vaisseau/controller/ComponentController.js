import { Types } from 'mongoose';
import ComponentModel from '../model/ComponentModel.js';

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
      const component = await ComponentModel.findById(req.params.id || req.params.componentId);
      if (!component) {
        const error = new Error('Component not found');
        error.status = 404;
        throw error;
      }

      res.status(200).json({
        status: 'success',
        message: 'Component found ',
        data: { component },
      });
    } catch (err) {
      next(err);
    }
  },

  create: async (req, res, next) => {
    try {
      const { name, category } = req.body;
      if (!name || !category) {
        const error = new Error('Requested body is invalid');
        error.status = 400;
        throw error;
      }

      const component = new ComponentModel({ ...req.body, _id: new Types.ObjectId() });
      await component.save();

      res.status(201).json({
        status: 'success',
        data: { component },
      });
    } catch (err) {
      if (err.code === 11000) {
        err.status = 409;
        err.message = 'A component with that name already exists.';
      }
      next(err);
    }
  },

  update: async (req, res, next) => {
    try {
      const component = await ComponentModel.findOneAndUpdate({ _id: req.params.componentId }, req.body, {
        new: true,
        runValidators: true,
      });

      if (!component) {
        const error = new Error('Component not found');
        error.status = 404;
        throw error;
      }

      res.status(200).json({
        status: 'success',
        data: { component },
      });
    } catch (err) {
      next(err);
    }
  },

  batchCreate: async (req, res, next) => {
    try {
      if (!Array.isArray(req.body)) {
        const error = new Error('Request body must be an array');
        error.status = 400;
        throw error;
      }

      const components = req.body.map((data) => ({
        ...data,
        _id: new Types.ObjectId(),
      }));

      const result = await ComponentModel.insertMany(components, { ordered: true });

      res.status(201).json({
        status: 'success',
        data: { components: result },
      });
    } catch (err) {
      next(err);
    }
  },

  remove: async (req, res, next) => {
    try {
      const deleted = await ComponentModel.findByIdAndDelete(req.params.id || req.params.componentId);
      if (!deleted) {
        const error = new Error('Component not found');
        error.status = 404;
        throw error;
      }

      res.status(200).json({
        status: 'success',
        message: 'Component deleted',
        data: null,
      });
    } catch (err) {
      next(err);
    }
  },
};

export default ComponentController;

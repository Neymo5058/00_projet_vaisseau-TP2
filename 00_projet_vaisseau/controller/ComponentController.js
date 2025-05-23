import ComponentModel from "../model/ComponentModel.js";
import { Types } from "mongoose";

const ComponentController = {
  getAll: async (req, res) => {
    try {
      const components = await ComponentModel.find();
      res.status(200).json(components);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  getById: async (req, res) => {
    try {
      const component = await ComponentModel.findById(req.params.id);
      if (!component) return res.status(404).json({ error: "Component not found" });
      res.status(200).json(component);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  create: async (req, res) => {
    try {
      const component = new ComponentModel({ ...req.body, _id: new Types.ObjectId() });
      await component.save();
      res.status(201).json(component);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  batchCreate: async (req, res) => {
    try {
      if (!Array.isArray(req.body)) {
        return res.status(400).json({ error: "Request body must be an array" });
      }

      const components = req.body.map(data => ({
        ...data,
        _id: new Types.ObjectId()
      }));
      const result = await ComponentModel.insertMany(components);
      res.status(201).json(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  remove: async (req, res) => {
    try {
      const deleted = await ComponentModel.findByIdAndDelete(req.params.id);
      if (!deleted) return res.status(404).json({ error: "Component not found" });
      res.status(200).json({ message: "Component deleted" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};

export default ComponentController;

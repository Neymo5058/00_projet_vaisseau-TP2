import { Types } from 'mongoose';
import ComponentModel from '../model/componentModel.js';

const ComponentController = {
  getAll: async (req, res) => {
    try {
      const components = await ComponentModel.find();

      res.status(200).json({
        status: 'success',
        results: components.length,
        data: { components },
      });
    } catch (err) {
      res.status(500).json({
        status: 'fail',
        message: `Composante non-trouvé`,
      });
    }
  },
  getById: async (req, res) => {
    try {
      const component = await ComponentModel.findById(req.params.componentId);
      if (!component)
        return res.status(404).json({
          status: 'fail',
          message: 'Composante recherché ',
        });

      res.status(200).json({
        status: 'success',
        message: `Composante recherché  `,
        data: { component },
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
      const { name, category } = req.body;
      if (!name || !category) {
        return res.status(400).json({
          status: 'fail',
          message: 'Veuillez fournir un nom et une catégorie',
        });
      }
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
        message:
          'Mauvaise requête, cette composante éxiste déja ou les données sont invalides',
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
      res.status(400).json({
        status: 'fail',
        message: 'Mauvaise requete, donnée invalides',
      });
    }
  },
  remove: async (req, res) => {
    try {
      const component = await ComponentModel.findByIdAndDelete(
        req.params.componentId
      );
      if (!component)
        return res.status(404).json({ message: 'Composante Introuvable' });

      res.status(200).json({
        status: 'success',
        data: null,
      });
    } catch (err) {
      res.status(404).json({
        status: 'fail',
        message: `Auncune composnte trouvé avec cet ID `,
      });
    }
  },
};
export default ComponentController;

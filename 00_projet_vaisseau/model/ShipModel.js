import mongoose from 'mongoose';

const ShipSchema = new mongoose.Schema({
  _id: mongoose.SchemaTypes.ObjectId,
  name: String,
  type: String,
  baseSpeed: Number,
  baseHealth: Number,
  health: Number,
  componentSlots: {
    thruster: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'component',
      default: null,
    },
    hull: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'component',
      default: null,
    },
    shield: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'component',
      default: null,
    },
    engine: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'component',
      default: null,
    },
    // 1) 2 emplacement composante
    weapon: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'component',
      default: null,
    },
    radar: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'component',
      default: null,
    },
    battery: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'component',
      default: null,
    },
  },
});

const ShipModel = mongoose.model('Ship', ShipSchema);

export default ShipModel;

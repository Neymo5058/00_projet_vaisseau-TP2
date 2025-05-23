import mongoose from 'mongoose';

const ComponentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Une composante doit avoir un nom'],
    unique: true,
    trim: true,
  },
  category: {
    type: String,
    trim: true,
    enum: [
      'weapon',
      'engine',
      'thruster',
      'shield',
      'battery',
      'hull',
      'radar',
    ],
    required: [true, 'Une composante doit avoir une categorie'],
  },
  effect: {
    type: String,
  },
  ammo: {
    type: Number,
    default: 0,
  },
  working: {
    type: Boolean,
    default: true,
  },
});

const ComponentModel = mongoose.model('component', ComponentSchema);

export default ComponentModel;

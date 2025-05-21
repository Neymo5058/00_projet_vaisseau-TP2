import mongoose from "mongoose";

const ComponentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: {
    type: String,
    enum: ["weapon", "engine", "thruster", "shield", "battery", "hull", "radar"],
    required: true
  },
  stats: {
    damage: { type: Number, default: 0 },
    ammo: { type: Number, default: 0 },
    speedBoost: { type: Number, default: 0 },
    healthBoost: { type: Number, default: 0 },
    absorption: { type: Number, default: 0 },
    durability: { type: Number, default: 100 },
    detectionRange: { type: Number, default: 0 } 
  }
});

const ComponentModel = mongoose.model("component", ComponentSchema);

export default ComponentModel;

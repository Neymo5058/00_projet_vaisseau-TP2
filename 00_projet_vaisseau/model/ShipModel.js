import mongoose from "mongoose";

const ShipSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  baseSpeed: { type: Number, required: true },
  baseHealth: { type: Number, required: true },
  health: { type: Number, required: true },
  componentSlots: {
    thruster: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "component",
      default: null,
    },
    hull: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "component",
      default: null,
    },
    shield: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "component",
      default: null,
    },
    engine: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "component",
      default: null,
    },
    weapon: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "component",
      default: null,
    },
    battery: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "component",
      default: null,
    },
    radar: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "component",
      default: null,
    },
  },
});

export default mongoose.model("ship", ShipSchema);

import mongoose from "mongoose";

const ShipSchema = new mongoose.Schema({
  _id: mongoose.SchemaTypes.ObjectId,
  name: String,
  type: String,
  baseSpeed: Number,
  baseHealth: Number,
  health: Number,
  componentSlots: {
    thruster: { type: mongoose.SchemaTypes.ObjectId, ref: "component" },
    hull: { type: mongoose.SchemaTypes.ObjectId, ref: "component" },
    shield: { type: mongoose.SchemaTypes.ObjectId, ref: "component" },
    engine: { type: mongoose.SchemaTypes.ObjectId, ref: "component" },
    // cuisine: { type: mongoose.SchemaTypes.ObjectId, ref: "component" },
    // weapon: { type: mongoose.SchemaTypes.ObjectId, ref: "component" },
    // battery: { type: mongoose.SchemaTypes.ObjectId, ref: "component" },
  },
});

const ShipModel = mongoose.model("Ship", ShipSchema);

export default ShipModel;

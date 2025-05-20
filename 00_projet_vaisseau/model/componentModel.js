import mongoose from "mongoose";

const ComponentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Une composante doit avoir un nom"],
        unique: true,
        trim: true,
    },
    category: {
        type: String,
        trim: true,
        required: [true, "Une composante doit avoir une categorie"],
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

const ComponentModel = mongoose.model("Component", ComponentSchema);

export default ComponentModel;

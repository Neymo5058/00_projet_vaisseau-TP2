import { Types } from "mongoose";
import ShipModel from "../model/ShipModel.js";
const ShipController = {
    getAll: (req, res) => {
        // TODO
    },
    getById: (req, res) => {
        // TODO : should respond with an object like
    },
    create: async (req, res) => {
        // TODO
        try {
            const newShip = await ShipModel.create(req.body);

            res.status(201).json({
                status: "success",
                data: {
                    ship: newShip,
                },
            });
            console.log(ship);
        } catch (err) {
            res.status(400).json({
                status: "fail",
                message: err.message,
            });
        }
    },
    batchCreate: (req, res) => {
        // TODO : receive an array of ships and create them all. Should be usefull to populate you database
    },
    remove: (req, res) => {
        // TODO
    },
};
export default ShipController;

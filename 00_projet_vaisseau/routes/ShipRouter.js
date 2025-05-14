import express from "express";
import ShipController from "../controller/ShipController.js";

const ShipRouter = express.Router();

ShipRouter.get("/", ShipController.getAll);
ShipRouter.get("/:shipId", ShipController.getById);

// TODO : you have to implements the routes to use the ships
ShipRouter.post("/:shipId/attack", () => {
  // TODO: req.body should somewhat look like : { defenderShipId: ID}
  // the response could be something like { ammoCount: Number, defenderShip: Ship}
  // or { currentShip: Ship, defenderShip: Ship}
});

export default ShipRouter;

import express from "express";
import ShipRouter from "./ShipRouter.js";

const MainRouter = express.Router();

MainRouter.use("/ships", ShipRouter);

MainRouter.post("/combat", (req, res) => {
  // TODO: req.body should somewhat look like : { attackerShipId: ID, defenderShipId: ID}
  // the response could be something like { isDefenderDestroyed: Boolean, defenderShip}
});

export default MainRouter;

import express from "express";
import ComponentController from "../controller/ComponentController.js";

const ComponentRouter = express.Router();

ComponentRouter.get("/", ComponentController.getAll);
ComponentRouter.get("/:id", ComponentController.getById);
ComponentRouter.post("/", ComponentController.create);
ComponentRouter.post("/batchCreate", ComponentController.batchCreate);
ComponentRouter.delete("/:id", ComponentController.remove);

export default ComponentRouter;

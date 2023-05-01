import { Router } from "express";
import TasksController from "../app/controllers/TasksController.js";

const routes = new Router();

// Add routes
routes.get("/", TasksController.index);
routes.get("/:id", TasksController.show);
routes.post("/", TasksController.store);
routes.put("/:id", TasksController.update);
routes.delete("/:id", TasksController.destroy);

export default routes;

import { Router } from "express";
import { healthController } from "../../controllers/health.controller.js";

export const healthRoutes: Router = Router();

healthRoutes.get("/", healthController);

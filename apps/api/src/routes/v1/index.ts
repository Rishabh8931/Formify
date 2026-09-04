import { Router } from "express";
import { healthRoutes } from "./health.routes.js";

export const v1Router: Router = Router();

v1Router.use("/health", healthRoutes);

import { Router } from "express";
import { healthRoutes } from "./health.routes.js";
import { formsRoutes } from "./forms.routes.js";

export const v1Router: Router = Router();

v1Router.use("/health", healthRoutes);
v1Router.use("/forms", formsRoutes);

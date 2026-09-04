import { Router } from "express";
import { healthController } from "../controllers/health.controller.js";

export const router: Router = Router();

router.get("/health", healthController);

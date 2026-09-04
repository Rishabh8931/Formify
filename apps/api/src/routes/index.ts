import { Router } from "express";
import { AppError } from "../errors/app.error.js";
import { healthController } from "../controllers/health.controller.js";

export const router: Router = Router();

router.get("/health", healthController);

router.get("/test-error", () => {
  throw new AppError("This is a test error", 400, "TEST_ERROR");
});

import type { Request, Response } from "express";
import { getHealthStatus } from "../services/health.service.js";

export async function healthController(
  _req: Request,
  res: Response,
): Promise<void> {
  const result = await getHealthStatus();

  res.status(result.success ? 200 : 503).json(result);
}

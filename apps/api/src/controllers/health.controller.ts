import type { Request, Response } from "express";
import { getHealthStatus } from "../services/health.service.js";
import { sendSuccess } from "../lib/response.js";

export async function healthController(
  _req: Request,
  res: Response,
): Promise<void> {
  const result = await getHealthStatus();

  if (!result.success) {
    res.status(503).json({
      success: false,
      error: {
        code: "DATABASE_UNAVAILABLE",
        message: result.message,
      },
    });

    return;
  }

  sendSuccess(res, null, 200, result.message);
}

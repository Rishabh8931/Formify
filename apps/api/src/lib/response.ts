import type { Response } from "express";

export function sendSuccess<T>(
  res: Response,
  data: T,
  statusCode = 200,
  message?: string,
): void {
  res.status(statusCode).json({
    success: true,
    data,
    ...(message && { message }),
  });
}

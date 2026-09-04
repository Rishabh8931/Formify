import { randomUUID } from "node:crypto";
import type { NextFunction, Request, Response } from "express";

export function requestIdMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const requestId = req.header("x-request-id") ?? randomUUID();

  res.setHeader("x-request-id", requestId);

  next();
}

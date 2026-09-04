import type { NextFunction, Request, Response } from "express";

export function loggerMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const start = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - start;
    const requestId = res.getHeader("x-request-id");

    console.log(
      `[HTTP] ${req.method} ${req.originalUrl} ${res.statusCode} ${duration}ms requestId=${requestId}`,
    );
  });

  next();
}

import type { ErrorRequestHandler } from "express";

import { AppError } from "../errors/index.js";

export const errorMiddleware: ErrorRequestHandler = (
  error,
  req,
  res,
  _next,
) => {
  // Expected application error
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      success: false,
      error: {
        code: error.code,
        message: error.message,
        details: error.details,
      },
      requestId: req.requestId,
    });
  }

  // Unexpected / unknown error
  console.error("Unhandled error:", error);

  return res.status(500).json({
    success: false,
    error: {
      code: "INTERNAL_SERVER_ERROR",
      message: "Internal server error",
    },
    requestId: req.requestId,
  });
};

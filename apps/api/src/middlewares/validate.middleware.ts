import type { RequestHandler } from "express";
import { z } from "zod";

import { ValidationError } from "../errors/index.js";

type ValidationSchemas = {
  body?: z.ZodType;
  params?: z.ZodType;
  query?: z.ZodType;
};

export const validate = (schemas: ValidationSchemas): RequestHandler => {
  return (req, _res, next) => {
    try {
      if (schemas.body) {
        req.body = schemas.body.parse(req.body);
      }

      if (schemas.params) {
        schemas.params.parse(req.params);
      }

      if (schemas.query) {
        schemas.query.parse(req.query);
      }

      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        next(new ValidationError("Request validation failed", error.flatten()));
        return;
      }

      next(error);
    }
  };
};

import type { RequestHandler } from "express";

import { auth } from "../auth/auth.js";
import { UnauthorizedError } from "../errors/index.js";

export const authMiddleware: RequestHandler = async (req, _res, next) => {
  try {
    const headers = new Headers();

    for (const [key, value] of Object.entries(req.headers)) {
      if (Array.isArray(value)) {
        for (const item of value) {
          headers.append(key, item);
        }
      } else if (value !== undefined) {
        headers.set(key, value);
      }
    }

    const session = await auth.api.getSession({
      headers,
    });

    if (!session) {
      throw new UnauthorizedError("Authentication required");
    }

    req.user = session.user;

    next();
  } catch (error) {
    next(error);
  }
};

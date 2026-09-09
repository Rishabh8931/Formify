import type { auth } from "../auth/auth.js";

declare global {
  namespace Express {
    interface Request {
      requestId: string;
      user: typeof auth.$Infer.Session.user;
    }
  }
}

export {};

import express from "express";
import cors from "cors";
import helmet from "helmet";

import { errorMiddleware } from "./middlewares/error.middleware.js";
import { notFoundMiddleware } from "./middlewares/not-found.middleware.js";
import { requestIdMiddleware } from "./middlewares/request-id.middleware.js";
import { router } from "./routes/index.js";
import { loggerMiddleware } from "./middlewares/logger.middleware.js";
import { apiRateLimiter } from "./middlewares/rate-limit.middleware.js";
import { auth } from "./auth/auth.js";
import { toNodeHandler } from "better-auth/node";

export const app: express.Application = express();

app.use(loggerMiddleware);
app.use(requestIdMiddleware);

app.use(helmet());
app.use(
  cors({
    origin: process.env.WEB_URL,
    credentials: true,
  }),
);

app.use("api/auth/*splat", toNodeHandler(auth));

app.use(express.json());

app.use("/api", apiRateLimiter, router);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

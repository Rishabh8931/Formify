import express from "express";
import cors from "cors";
import helmet from "helmet";

import { errorMiddleware } from "./middlewares/error.middleware.js";
import { notFoundMiddleware } from "./middlewares/not-found.middleware.js";
import { requestIdMiddleware } from "./middlewares/request-id.middleware.js";
import { router } from "./routes/index.js";
import { loggerMiddleware } from "./middlewares/logger.middleware.js";
import { apiRateLimiter } from "./middlewares/rate-limit.middleware.js";

export const app: express.Application = express();

app.use(loggerMiddleware);
app.use(requestIdMiddleware);

app.use(helmet());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
);

app.use(express.json());

app.use("/api", apiRateLimiter, router);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

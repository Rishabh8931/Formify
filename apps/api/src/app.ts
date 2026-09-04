import express from "express";
import { errorMiddleware } from "./middlewares/error.middleware.js";
import { notFoundMiddleware } from "./middlewares/not-found.middleware.js";
import { requestIdMiddleware } from "./middlewares/request-id.middleware.js";
import { router } from "./routes/index.js";

export const app: express.Application = express();

app.use(requestIdMiddleware);
app.use(express.json());

app.use("/api", router);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

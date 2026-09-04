import express from "express";
import { router } from "./routes/index.js";

export const app: express.Application = express();

app.use(express.json());

app.use("/api", router);

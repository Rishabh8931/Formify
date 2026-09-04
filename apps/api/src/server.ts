import { createServer } from "node:http";
import { app } from "./app.js";
import { pool } from "@formify/db";

const PORT = Number(process.env.PORT) || 3001;

const server = createServer(app);

server.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`);
});

const shutdown = async (signal: string) => {
  console.log(`${signal} received. Shutting down...`);

  server.close(async () => {
    await pool.end();

    console.log("Database pool closed.");
    process.exit(0);
  });
};

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));

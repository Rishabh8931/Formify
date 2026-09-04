import { healthCheck, pool } from "./index.js";

const healthy = await healthCheck();

if (healthy) {
  console.log("✓ Database connection is healthy");
} else {
  console.error("✗ Database connection failed");
  process.exitCode = 1;
}

await pool.end();

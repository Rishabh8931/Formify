import { checkDatabaseConnection } from "../repositories/health.repository.js";

export async function getHealthStatus() {
  const databaseConnected = await checkDatabaseConnection();

  return {
    success: databaseConnected,
    message: databaseConnected
      ? "API is healthy"
      : "Database connection failed",
  };
}

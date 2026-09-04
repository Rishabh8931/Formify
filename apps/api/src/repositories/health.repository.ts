import { sql } from "drizzle-orm";
import { db } from "@formify/db";

export async function checkDatabaseConnection(): Promise<boolean> {
  try {
    await db.execute(sql`SELECT 1`);
    return true;
  } catch (error) {
    console.error("Database connection failed:", error);
    return false;
  }
}

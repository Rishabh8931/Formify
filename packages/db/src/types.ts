import type { db } from "./client.js";

export type Database = typeof db;

export type DatabaseExecutor =
  Database | Parameters<Parameters<Database["transaction"]>[0]>[0];

import type { NeonHttpDatabase } from "drizzle-orm/neon-http";
import * as schema from "./schema";

type DbInstance = NeonHttpDatabase<typeof schema>;

const globalForDb = globalThis as unknown as { db: DbInstance | undefined };

let _db: DbInstance | undefined;

export function getDb(): DbInstance {
  if (_db) return _db;
  if (globalForDb.db) {
    _db = globalForDb.db;
    return _db;
  }
  if (typeof window !== "undefined") {
    throw new Error("getDb() cannot be called on the client — use API routes instead");
  }
  const { neon } = require("@neondatabase/serverless") as typeof import("@neondatabase/serverless");
  const { drizzle } = require("drizzle-orm/neon-http") as typeof import("drizzle-orm/neon-http");
  const sql = neon(process.env.DATABASE_URL!);
  const db = drizzle({ client: sql, schema });
  _db = db;
  if (process.env.NODE_ENV !== "production") globalForDb.db = db;
  return db;
}

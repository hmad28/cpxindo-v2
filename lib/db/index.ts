import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

export const isDatabaseConfigured = Boolean(process.env.DATABASE_URL);
export const db = isDatabaseConfigured
  ? drizzle(neon(process.env.DATABASE_URL!), { schema })
  : null;

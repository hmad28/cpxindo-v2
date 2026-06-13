import { sql } from "drizzle-orm";import { db, isDatabaseConfigured } from "@/lib/db";
export async function GET(){try{if(db)await db.execute(sql`select 1`);return Response.json({status:"ok",database:isDatabaseConfigured?"connected":"demo-mode",timestamp:new Date().toISOString()});}catch{return Response.json({status:"error",database:"unavailable"},{status:503})}}

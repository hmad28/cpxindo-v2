import { hash } from "bcryptjs";
import { db } from "../lib/db";
import { products, users } from "../lib/db/schema";
import { demoProducts } from "../lib/products";

if (!db) throw new Error("DATABASE_URL is required");
await db.insert(users).values({ name:"CPX Administrator", email:process.env.ADMIN_EMAIL ?? "admin@cpxindo.id", passwordHash:await hash(process.env.ADMIN_PASSWORD ?? "change-me-now", 12), role:"admin" }).onConflictDoNothing();
await db.insert(products).values(demoProducts.map(({id,createdAt,updatedAt,...product})=>product)).onConflictDoNothing();
console.log("CPX database seeded successfully.");

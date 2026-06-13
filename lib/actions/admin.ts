"use server";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { requireAdmin } from "@/lib/auth/session";
import { db } from "@/lib/db";
import { orders, products } from "@/lib/db/schema";

const productSchema=z.object({name:z.string().min(2),slug:z.string().regex(/^[a-z0-9-]+$/),category:z.string().min(2),description:z.string().min(10),price:z.coerce.number().int().positive(),stock:z.coerce.number().int().nonnegative(),image:z.url(),sizes:z.string(),colors:z.string(),featured:z.string().optional()});
export async function saveProduct(formData:FormData){await requireAdmin();if(!db)redirect("/admin/products?error=database");const parsed=productSchema.safeParse(Object.fromEntries(formData));if(!parsed.success)redirect("/admin/products?error=validation");const id=formData.get("id")?.toString();const values={...parsed.data,sizes:parsed.data.sizes.split(",").map(v=>v.trim()),colors:parsed.data.colors.split(",").map(v=>v.trim()),featured:Boolean(parsed.data.featured),active:true,updatedAt:new Date()};if(id)await db!.update(products).set(values).where(eq(products.id,id));else await db!.insert(products).values(values);revalidatePath("/products");revalidatePath("/admin/products");redirect("/admin/products?saved=1");}
export async function deleteProduct(formData:FormData){await requireAdmin();if(!db)return;const id=formData.get("id")?.toString();if(id)await db.update(products).set({active:false,updatedAt:new Date()}).where(eq(products.id,id));revalidatePath("/admin/products");revalidatePath("/products");}
export async function updateOrderStatus(formData:FormData){await requireAdmin();if(!db)return;const id=formData.get("id")?.toString();const status=formData.get("status")?.toString() as "pending"|"paid"|"processing"|"shipped"|"completed"|"cancelled";if(id&&status)await db.update(orders).set({status,updatedAt:new Date()}).where(eq(orders.id,id));revalidatePath("/admin/orders");}

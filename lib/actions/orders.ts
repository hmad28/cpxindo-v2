"use server";
import { redirect } from "next/navigation";
import { z } from "zod";
import { db } from "@/lib/db";
import { orders } from "@/lib/db/schema";
import { getSession } from "@/lib/auth/session";
import { getProducts } from "@/lib/products";

const schema = z.object({ name:z.string().min(2), email:z.email(), phone:z.string().min(8), address:z.string().min(10), city:z.string().min(2), postalCode:z.string().min(5), items:z.string(), subtotal:z.coerce.number().int().nonnegative(), notes:z.string().optional() });
export type CheckoutState = { error?: string };
export async function createOrder(_: CheckoutState, formData:FormData): Promise<CheckoutState> {
 const parsed=schema.safeParse(Object.fromEntries(formData));
 if(!parsed.success) return {error:"Mohon lengkapi informasi pengiriman."};
 let submittedItems: Array<{productId:string;name:string;price:number;quantity:number;size:string}>;
 try { submittedItems=JSON.parse(parsed.data.items); } catch { return {error:"Keranjang tidak valid."}; }
 if(!submittedItems.length) return {error:"Keranjang masih kosong."};
 const catalog = await getProducts();
 const items = submittedItems.map((item) => {
   const product = catalog.find((candidate) => candidate.id === item.productId);
   if (!product || item.quantity < 1 || item.quantity > 10 || !product.sizes.includes(item.size)) return null;
   return { productId:product.id, name:product.name, price:product.price, quantity:item.quantity, size:item.size };
 }).filter((item): item is NonNullable<typeof item> => Boolean(item));
 if (items.length !== submittedItems.length) return {error:"Salah satu produk tidak lagi tersedia."};
 const subtotal=items.reduce((total,item)=>total+item.price*item.quantity,0);
 const shipping=subtotal>=500000?0:25000; const orderNumber=`CPX-${Date.now().toString().slice(-8)}`;
 if(db){ const user=await getSession(); await db.insert(orders).values({orderNumber,userId:user?.id.startsWith("demo-")?null:user?.id,customerName:parsed.data.name,customerEmail:parsed.data.email,phone:parsed.data.phone,address:parsed.data.address,city:parsed.data.city,postalCode:parsed.data.postalCode,items,subtotal,shipping,total:subtotal+shipping,notes:parsed.data.notes}); }
 redirect(`/checkout/success?order=${orderNumber}`);
}

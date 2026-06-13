"use server";
import { compare, hash } from "bcryptjs";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { z } from "zod";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { createSession, deleteSession } from "@/lib/auth/session";

export type AuthState = { error?: string };
const loginSchema = z.object({ email:z.email().transform((v)=>v.toLowerCase()), password:z.string().min(8), next:z.string().optional() });
const registerSchema = loginSchema.extend({ name:z.string().min(2).max(80) });

export async function login(_: AuthState, formData: FormData): Promise<AuthState> {
  const parsed = loginSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { error:"Email atau password tidak valid." };
  if (!db) {
    const isAdmin = parsed.data.email === "admin@cpxindo.id" && parsed.data.password === "admin12345";
    const isCustomer = parsed.data.email === "demo@cpxindo.id" && parsed.data.password === "customer123";
    if (!isAdmin && !isCustomer) return { error:"Database belum dikonfigurasi. Gunakan akun demo yang tertera." };
    await createSession({ id:isAdmin?"demo-admin":"demo-user", name:isAdmin?"CPX Admin":"Demo Customer", email:parsed.data.email, role:isAdmin?"admin":"customer" });
  } else {
    const [user] = await db.select().from(users).where(eq(users.email, parsed.data.email)).limit(1);
    if (!user || !await compare(parsed.data.password, user.passwordHash)) return { error:"Email atau password salah." };
    await createSession({ id:user.id, name:user.name, email:user.email, role:user.role });
  }
  const destination = parsed.data.next?.startsWith("/") ? parsed.data.next : "/account";
  redirect(destination);
}

export async function register(_: AuthState, formData: FormData): Promise<AuthState> {
  const parsed = registerSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { error:"Lengkapi data dengan benar. Password minimal 8 karakter." };
  if (!db) return { error:"Registrasi memerlukan DATABASE_URL. Untuk preview gunakan akun demo." };
  const existing = await db.select({id:users.id}).from(users).where(eq(users.email, parsed.data.email)).limit(1);
  if (existing.length) return { error:"Email sudah terdaftar." };
  const [user] = await db.insert(users).values({ name:parsed.data.name, email:parsed.data.email, passwordHash:await hash(parsed.data.password, 12) }).returning();
  await createSession({ id:user.id, name:user.name, email:user.email, role:user.role });
  redirect("/account");
}

export async function logout() { await deleteSession(); redirect("/"); }

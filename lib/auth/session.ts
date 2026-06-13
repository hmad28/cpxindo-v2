import "server-only";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export type SessionUser = { id: string; name: string; email: string; role: "customer" | "admin" };
const COOKIE_NAME = "cpx_session";
const maxAge = 60 * 60 * 24 * 7;

function bytesToBase64(value: Uint8Array) { return Buffer.from(value).toString("base64url"); }
async function signature(payload: string) {
  if (process.env.NODE_ENV === "production" && !process.env.AUTH_SECRET) {
    throw new Error("AUTH_SECRET is required in production");
  }
  const secret = process.env.AUTH_SECRET ?? "development-only-secret-change-in-production";
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(secret), { name:"HMAC", hash:"SHA-256" }, false, ["sign"]);
  return bytesToBase64(new Uint8Array(await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(payload))));
}

export async function createSession(user: SessionUser) {
  const payload = Buffer.from(JSON.stringify({ ...user, expires: Date.now() + maxAge * 1000 })).toString("base64url");
  const value = `${payload}.${await signature(payload)}`;
  (await cookies()).set(COOKIE_NAME, value, { httpOnly:true, secure:process.env.NODE_ENV === "production", sameSite:"lax", path:"/", maxAge });
}

export async function getSession(): Promise<SessionUser | null> {
  const value = (await cookies()).get(COOKIE_NAME)?.value;
  if (!value) return null;
  const [payload, providedSignature] = value.split(".");
  if (!payload || !providedSignature || await signature(payload) !== providedSignature) return null;
  try {
    const parsed = JSON.parse(Buffer.from(payload, "base64url").toString()) as SessionUser & { expires:number };
    if (parsed.expires < Date.now()) return null;
    return { id:parsed.id, name:parsed.name, email:parsed.email, role:parsed.role };
  } catch { return null; }
}

export async function deleteSession() { (await cookies()).delete(COOKIE_NAME); }
export async function requireUser() { const user = await getSession(); if (!user) redirect("/login?next=/account"); return user; }
export async function requireAdmin() { const user = await getSession(); if (!user) redirect("/login?next=/admin"); if (user.role !== "admin") redirect("/account"); return user; }

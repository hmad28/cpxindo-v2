import { and, eq, gt } from "drizzle-orm";
import { getDb } from "@/lib/db/drizzle";
import { adminLoginAttempts } from "@/lib/db/schema";

type AttemptEntry = { count: number; resetAt: number };
type RateLimitOptions = { maxAttempts: number; windowMs: number };

const DEFAULT_OPTIONS: RateLimitOptions = {
  maxAttempts: 5,
  windowMs: 15 * 60 * 1000,
};

export type AdminLoginRateLimiter = {
  isRateLimited(ip: string, now?: number): Promise<boolean>;
  reset(ip: string): Promise<void>;
};

export function getClientIp(headers: Headers) {
  const forwardedFor = headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0].trim() || "unknown";

  return (
    headers.get("x-real-ip") ||
    headers.get("cf-connecting-ip") ||
    headers.get("true-client-ip") ||
    "unknown"
  );
}

export function createMemoryAdminLoginRateLimiter(
  options: RateLimitOptions = DEFAULT_OPTIONS
): AdminLoginRateLimiter {
  const attempts = new Map<string, AttemptEntry>();

  return {
    async isRateLimited(ip: string, now = Date.now()) {
      const entry = attempts.get(ip);
      if (!entry || now > entry.resetAt) {
        attempts.set(ip, { count: 1, resetAt: now + options.windowMs });
        return false;
      }

      const count = entry.count + 1;
      attempts.set(ip, { ...entry, count });
      return count > options.maxAttempts;
    },
    async reset(ip: string) {
      attempts.delete(ip);
    },
  };
}

export function createDatabaseAdminLoginRateLimiter(
  options: RateLimitOptions = DEFAULT_OPTIONS
): AdminLoginRateLimiter {
  return {
    async isRateLimited(ip: string, now = Date.now()) {
      const db = getDb();
      const nowDate = new Date(now);
      const resetAt = new Date(now + options.windowMs);
      const existing = await db
        .select()
        .from(adminLoginAttempts)
        .where(and(eq(adminLoginAttempts.ip, ip), gt(adminLoginAttempts.resetAt, nowDate)));

      const row = existing[0];
      if (!row) {
        await db
          .insert(adminLoginAttempts)
          .values({ ip, count: 1, resetAt, updatedAt: nowDate })
          .onConflictDoUpdate({
            target: adminLoginAttempts.ip,
            set: { count: 1, resetAt, updatedAt: nowDate },
          });
        return false;
      }

      const count = row.count + 1;
      await db
        .update(adminLoginAttempts)
        .set({ count, updatedAt: nowDate })
        .where(eq(adminLoginAttempts.ip, ip));

      return count > options.maxAttempts;
    },
    async reset(ip: string) {
      await getDb().delete(adminLoginAttempts).where(eq(adminLoginAttempts.ip, ip));
    },
  };
}

const memoryLimiter = createMemoryAdminLoginRateLimiter(DEFAULT_OPTIONS);
const databaseLimiter = createDatabaseAdminLoginRateLimiter(DEFAULT_OPTIONS);

export async function isAdminLoginRateLimited(ip: string) {
  if (!process.env.DATABASE_URL) return memoryLimiter.isRateLimited(ip);

  try {
    return await databaseLimiter.isRateLimited(ip);
  } catch {
    return memoryLimiter.isRateLimited(ip);
  }
}

export async function resetAdminLoginRateLimit(ip: string) {
  if (!process.env.DATABASE_URL) {
    await memoryLimiter.reset(ip);
    return;
  }

  try {
    await databaseLimiter.reset(ip);
  } catch {
    await memoryLimiter.reset(ip);
  }
}

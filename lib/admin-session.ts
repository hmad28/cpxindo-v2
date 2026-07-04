import { createHmac, randomBytes, timingSafeEqual } from "crypto";

const TOKEN_VERSION = "v1";

function sign(payload: string, secret: string) {
  return createHmac("sha256", secret).update(payload).digest("base64url");
}

function hasValidSignature(actual: string, expected: string) {
  const actualBuffer = Buffer.from(actual);
  const expectedBuffer = Buffer.from(expected);
  return actualBuffer.length === expectedBuffer.length && timingSafeEqual(actualBuffer, expectedBuffer);
}

export async function createAdminSession(secret: string, maxAgeSeconds: number) {
  if (!secret) throw new Error("SESSION_SECRET is required");
  const expiresAt = Math.floor(Date.now() / 1000) + maxAgeSeconds;
  const nonce = randomBytes(16).toString("base64url");
  const payload = `${TOKEN_VERSION}.${expiresAt}.${nonce}`;
  return `${payload}.${sign(payload, secret)}`;
}

export async function verifyAdminSession(token: string | undefined, secret: string | undefined) {
  if (!token || !secret) return false;

  const parts = token.split(".");
  if (parts.length !== 4) return false;

  const [version, expiresAtRaw, nonce, signature] = parts;
  if (version !== TOKEN_VERSION || !expiresAtRaw || !nonce || !signature) return false;

  const expiresAt = Number(expiresAtRaw);
  if (!Number.isFinite(expiresAt) || expiresAt <= Math.floor(Date.now() / 1000)) return false;

  const payload = `${version}.${expiresAtRaw}.${nonce}`;
  return hasValidSignature(signature, sign(payload, secret));
}

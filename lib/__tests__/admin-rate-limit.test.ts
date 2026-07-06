import { createMemoryAdminLoginRateLimiter, getClientIp } from "../admin-rate-limit";

describe("admin login rate limiter", () => {
  it("allows five attempts and blocks the sixth within the window", async () => {
    const limiter = createMemoryAdminLoginRateLimiter({ maxAttempts: 5, windowMs: 15 * 60 * 1000 });
    const now = 1_000;

    for (let i = 0; i < 5; i++) {
      await expect(limiter.isRateLimited("203.0.113.10", now)).resolves.toBe(false);
    }

    await expect(limiter.isRateLimited("203.0.113.10", now)).resolves.toBe(true);
  });

  it("resets an IP after successful login", async () => {
    const limiter = createMemoryAdminLoginRateLimiter({ maxAttempts: 1, windowMs: 15 * 60 * 1000 });
    const now = 1_000;

    await expect(limiter.isRateLimited("203.0.113.10", now)).resolves.toBe(false);
    await expect(limiter.isRateLimited("203.0.113.10", now)).resolves.toBe(true);

    await limiter.reset("203.0.113.10");

    await expect(limiter.isRateLimited("203.0.113.10", now)).resolves.toBe(false);
  });

  it("uses the first forwarded IP address", () => {
    const headers = new Headers({
      "x-forwarded-for": "203.0.113.10, 198.51.100.3",
    });

    expect(getClientIp(headers)).toBe("203.0.113.10");
  });
});

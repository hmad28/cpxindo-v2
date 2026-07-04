import { createAdminSession, verifyAdminSession } from '../admin-session';

describe('admin session tokens', () => {
  const secret = 'test-secret-with-enough-length';

  it('rejects the old static authenticated cookie value', async () => {
    await expect(verifyAdminSession('authenticated', secret)).resolves.toBe(false);
  });

  it('accepts a signed session token created with the same secret', async () => {
    const token = await createAdminSession(secret, 60);

    await expect(verifyAdminSession(token, secret)).resolves.toBe(true);
  });

  it('rejects tokens signed with another secret', async () => {
    const token = await createAdminSession(secret, 60);

    await expect(verifyAdminSession(token, 'another-secret')).resolves.toBe(false);
  });
});

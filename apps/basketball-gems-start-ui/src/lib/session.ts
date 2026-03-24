import { createServerFn } from '@tanstack/react-start';

export type SessionUser = {
  email: string;
  displayName: string;
};

export const fetchCurrentUser = createServerFn({ method: 'GET' }).handler(
  async () => {
    const { useAppSession } = await import('~/lib/session.server');
    const session = await useAppSession();
    return session.data.user ?? null;
  },
);

export const createDemoSession = createServerFn({ method: 'POST' })
  .inputValidator((data: { email: string; displayName?: string }) => data)
  .handler(async ({ data }) => {
    const { useAppSession } = await import('~/lib/session.server');
    const session = await useAppSession();
    const email = data.email.trim();
    const displayName =
      data.displayName?.trim() || email.split('@')[0] || 'Scout';

    await session.update({
      user: {
        email,
        displayName,
      },
    });

    return { ok: true };
  });

export const destroySession = createServerFn().handler(async () => {
  const { useAppSession } = await import('~/lib/session.server');
  const session = await useAppSession();
  session.clear();
  return { ok: true };
});

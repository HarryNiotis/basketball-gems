import { createFileRoute, redirect } from '@tanstack/react-router';
import { destroySession } from '~/lib/session';

export const Route = createFileRoute('/logout')({
  preload: false,
  loader: async () => {
    await destroySession();
    throw redirect({ to: '/' });
  },
  component: () => null,
});

import { Outlet, createFileRoute, redirect } from '@tanstack/react-router';
import { AppShell } from '~/components/AppShell';

export const Route = createFileRoute('/_authed')({
  beforeLoad: ({ context }) => {
    if (!context.user) {
      throw redirect({ to: '/login' });
    }
  },
  component: AuthenticatedLayout,
});

function AuthenticatedLayout() {
  const { user } = Route.useRouteContext();

  return (
    <AppShell user={user!}>
      <Outlet />
    </AppShell>
  );
}

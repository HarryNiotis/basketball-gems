import { Link } from '@tanstack/react-router';
import type { ReactNode } from 'react';
import type { SessionUser } from '~/lib/session';

type AppShellProps = {
  children: ReactNode;
  user: SessionUser;
};

const navigation = [
  { label: 'Home', to: '/dashboard' as const },
  { label: 'Teams', to: '/teams' as const },
  { label: 'Standings', to: '/standings' as const },
  { label: 'Chat', to: '/chat' as const },
];

export function AppShell({ children, user }: AppShellProps) {
  return (
    <div className="app-shell">
      <aside className="app-sidebar">
        <div>
          <p className="eyebrow">TanStack Start</p>
          <h1 className="brand-title">Basketball Gems</h1>
          <p className="sidebar-copy">
            A route-first shell for the same product surface as the Next.js app.
          </p>
        </div>
        <nav className="nav-list" aria-label="Primary navigation">
          {navigation.map((item) => (
            <Link
              activeProps={{ className: 'nav-link nav-link--active' }}
              className="nav-link"
              key={item.to}
              to={item.to}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="sidebar-footer">
          <div>
            <p className="eyebrow">Signed in as</p>
            <p className="sidebar-user">{user.displayName}</p>
            <p className="muted-copy">{user.email}</p>
          </div>
          <Link className="button button--ghost button--full" to="/logout">
            Logout
          </Link>
        </div>
      </aside>
      <main className="app-content">{children}</main>
    </div>
  );
}

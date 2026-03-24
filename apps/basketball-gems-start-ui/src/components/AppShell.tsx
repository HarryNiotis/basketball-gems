import type { ReactNode } from 'react';
import type { SessionUser } from '~/lib/session';
import { AppSidebar } from '@/components/AppSidebar';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';

type AppShellProps = {
  children: ReactNode;
  user: SessionUser;
};

export function AppShell({ children, user }: AppShellProps) {
  return (
    <SidebarProvider>
      <AppSidebar user={user} />
      <SidebarInset>
        <header className="bg-background/90 sticky top-0 z-20 flex items-center gap-3 border-b px-4 py-3 backdrop-blur md:px-6">
          <SidebarTrigger />
          <div>
            <p className="eyebrow">Basketball Gems</p>
            <p className="text-muted-foreground text-sm">
              TanStack Start + Tailwind v4 + shadcn/ui
            </p>
          </div>
        </header>
        <div className="app-content">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}

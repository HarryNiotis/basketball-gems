'use client';

import { Link, useRouterState } from '@tanstack/react-router';
import type { SessionUser } from '~/lib/session';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

type AppSidebarProps = {
  user: SessionUser;
};

const navigation = [
  { label: 'Home', to: '/dashboard' as const },
  { label: 'Teams', to: '/teams' as const },
  { label: 'Standings', to: '/standings' as const },
  { label: 'Chat', to: '/chat' as const },
];

export function AppSidebar({ user }: AppSidebarProps) {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });

  return (
    <Sidebar>
      <SidebarHeader className="px-4 py-5">
        <div className="space-y-2">
          <p className="eyebrow text-sidebar-primary">TanStack Start</p>
          <h1 className="text-lg font-semibold tracking-tight">
            Basketball Gems
          </h1>
          <p className="text-sidebar-foreground/70 text-sm leading-6">
            Shared shadcn primitives, Apollo routes, and a Start-native shell.
          </p>
        </div>
      </SidebarHeader>
      <Separator />
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {navigation.map((item) => (
              <SidebarMenuItem key={item.to}>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === item.to}
                  tooltip={item.label}
                >
                  <Link to={item.to}>{item.label}</Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <Separator />
      <SidebarFooter className="gap-4 px-4 py-5">
        <div className="space-y-1">
          <p className="eyebrow text-sidebar-primary">Signed in as</p>
          <p className="font-medium">{user.displayName}</p>
          <p className="text-sidebar-foreground/70 text-sm">{user.email}</p>
        </div>
        <Button asChild className="w-full" variant="secondary">
          <Link to="/logout">Logout</Link>
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}

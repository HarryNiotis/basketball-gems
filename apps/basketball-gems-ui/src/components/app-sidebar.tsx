'use client';

import { LogoutButton } from '@/auth/components';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from '@/components/ui/sidebar';
import { Separator } from './ui/separator';
import Link from 'next/link';
import { chatRoute, dashboardRoute, teamsRoute } from '@/lib/routes';
import { usePathname } from 'next/navigation';

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader className="flex items-center text-lg font-bold px-4 py-5">
        Basketball Gems
      </SidebarHeader>
      <Separator />
      <SidebarContent>
        <SidebarGroup>
          <Link
            href={dashboardRoute}
            className={`w-full block px-4 py-2 ${pathname === dashboardRoute ? 'font-semibold' : 'hover:bg-gray-100 rounded'}`}
          >
            Home
          </Link>
          <Link
            href={teamsRoute}
            className={`w-full block px-4 py-2 ${pathname === teamsRoute ? 'font-semibold' : 'hover:bg-gray-100 rounded'}`}
          >
            Teams
          </Link>
          <Link
            href={chatRoute}
            className={`w-full block px-4 py-2 ${pathname === chatRoute ? 'font-semibold' : 'hover:bg-gray-100 rounded'}`}
          >
            Chat
          </Link>
        </SidebarGroup>
        <SidebarGroup />
      </SidebarContent>
      <Separator />
      <SidebarFooter className="flex items-center px-4 py-5">
        <LogoutButton />
      </SidebarFooter>
    </Sidebar>
  );
}

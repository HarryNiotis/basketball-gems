import './global.css';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import { auth0 } from '@/auth/auth0';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth0.getSession();
  const user = session?.user;
  return (
    <html lang="en">
      <body>
        {user ? (
          <SidebarProvider>
            <AppSidebar />
            <SidebarTrigger />
            <main className="flex-1 w-full flex flex-col px-6 py-8">
              {children}
            </main>
          </SidebarProvider>
        ) : (
          <main>{children}</main>
        )}
      </body>
    </html>
  );
}

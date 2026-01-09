import { auth0 } from '@/auth/auth0';
import { LoginButton } from '@/auth/components';
import { redirect } from 'next/navigation';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { dashboardRoute } from '@/lib/routes';

export default async function Home() {
  const session = await auth0.getSession();
  const user = session?.user;

  if (user) {
    redirect(dashboardRoute);
  }

  return (
    <div className="bg-muted flex min-h-screen flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <div className="flex items-center justify-center">
          <h1 className="text-3xl font-bold text-center">Basketball Gems</h1>
        </div>

        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-xl">Welcome</CardTitle>
            <CardDescription>
              Sign in to access amazing basketball content
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center gap-4">
              <LoginButton />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

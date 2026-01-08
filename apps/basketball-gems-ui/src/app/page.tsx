import { auth0 } from '@/auth/auth0';
import { LoginButton } from '@/auth/components';
import { redirect } from 'next/navigation';

export default async function Home() {
  const session = await auth0.getSession();
  const user = session?.user;

  if (user) {
    redirect('/dashboard');
  }

  return (
    <div className="min-h-screen">
      <div className="flex flex-col items-center justify-center min-h-screen px-4">
        <h1 className="text-4xl font-bold mb-8 text-center">Basketball Gems</h1>

        <div className="action-card">
          <p className="action-text">
            Welcome! Please log in to access amazing basketball content.
          </p>
          <LoginButton />
        </div>
      </div>
    </div>
  );
}

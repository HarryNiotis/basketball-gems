import { auth0 } from '@/auth/auth0';
import { LoginButton } from '@/auth/components';
import { redirect } from 'next/navigation';

export default async function Home() {
  const session = await auth0.getSession();
  const user = session?.user;

  if (user) {
    redirect('/welcome');
  }

  return (
    <div className="min-h-screen w-full">
      <div className="flex flex-col items-center justify-center min-h-screen w-full px-4">
        <img
          src="https://cdn.auth0.com/quantum-assets/dist/latest/logos/auth0/auth0-lockup-en-ondark.png"
          alt="Auth0 Logo"
          className="mb-6 h-12"
        />
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

import { Button } from '@/components/ui/button';
import { logoutRoute } from '@/lib/routes';
import Link from 'next/link';

export const LogoutButton = () => {
  return (
    <Link href={logoutRoute}>
      <Button className="cursor-pointer">Log Out</Button>
    </Link>
  );
};

'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/use-auth';

export default function Home() {
  const { user, logout } = useAuth();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <main className="text-center">
        <h1 className="text-4xl font-bold mb-8">Welcome to Our App</h1>

        {user ? (
          <div>
            <p className="text-2xl mb-4">Hello, {user.name}!</p>
            <Button type="submit" variant="outline" onClick={logout}>
              Logout
            </Button>
          </div>
        ) : (
          <div className="space-x-4">
            <Button asChild>
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/register">Register</Link>
            </Button>
          </div>
        )}
      </main>
    </div>
  );
}

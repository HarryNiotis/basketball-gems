import { LogoutButton } from '@/auth/components';
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

export default function TeamsLayout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Bar */}
      <header className="bg-blue-500 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Teams</h1>
          </div>
          <div className="flex items-center gap-4">
            <LogoutButton />
          </div>
        </div>
      </header>

      {children}
    </div>
  );
}

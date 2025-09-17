
'use client';

import { type ReactNode } from 'react';
import { HeaderNav } from '@/components/header-nav';
import { useAuth } from '@/hooks/use-auth';

export default function MainLayout({ children }: { children: ReactNode }) {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header Navigation */}
      <HeaderNav />
      
      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {children}
      </main>
    </div>
  );
}

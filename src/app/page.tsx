
'use client';

import { useAuth } from '@/hooks/use-auth';
import { redirect } from 'next/navigation';

export default function RootPage() {
  const { user, loading } = useAuth();

  if (loading) {
    return null; 
  }

  if (user) {
    redirect('/dashboard');
  } else {
    redirect('/login');
  }

  return null;
}

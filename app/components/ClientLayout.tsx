'use client';

import { useEffect } from 'react';
import { registerServiceWorker } from '../utils/serviceWorker';
import { AuthProvider } from '../contexts/AuthContext';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      registerServiceWorker().catch(console.error);
    }
  }, []);

  return <AuthProvider>{children}</AuthProvider>;
}

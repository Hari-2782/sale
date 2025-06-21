'use client';

import { AppHeader } from '@/components/AppHeader';
import { useState, useEffect, type ReactNode } from 'react';

export default function AppLayout({
  children,
}: {
  children: ReactNode;
}) {
  const [currentYear, setCurrentYear] = useState<number | null>(null);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <AppHeader />
      <main className="flex-1">
        {children}
      </main>
      <footer className="py-6 md:px-8 md:py-0 bg-background border-t">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-20 md:flex-row">
          <p className="text-sm text-muted-foreground">
            {currentYear !== null ? `© ${currentYear} Sales Prophet Dashboard. All rights reserved.` : '© Sales Prophet Dashboard. All rights reserved.'}
          </p>
        </div>
      </footer>
    </div>
  );
}

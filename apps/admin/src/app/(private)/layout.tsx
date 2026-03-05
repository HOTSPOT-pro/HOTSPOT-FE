'use client';

import { useState } from 'react';
import { AppHeader, AppSideBar } from '@/widgets';

export default function PrivateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);

  return (
    <div className="flex min-h-dvh max-w-dvw">
      {isSideBarOpen && <AppSideBar onClose={() => setIsSideBarOpen(false)} />}
      <main className="flex min-w-0 flex-1 flex-col bg-[#F8F8FA]">
        <AppHeader isSideBarOpen={isSideBarOpen} onOpenSideBar={() => setIsSideBarOpen(true)} />
        {children}
      </main>
    </div>
  );
}

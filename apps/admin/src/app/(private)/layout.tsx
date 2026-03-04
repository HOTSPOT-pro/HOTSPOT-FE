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
    <div className="flex min-h-screen">
      {isSideBarOpen && <AppSideBar onClose={() => setIsSideBarOpen(false)} />}
      <main className="flex-col flex-1 bg-[#F8F8FA]">
        <AppHeader isSideBarOpen={isSideBarOpen} onOpenSideBar={() => setIsSideBarOpen(true)} />
        {children}
      </main>
    </div>
  );
}

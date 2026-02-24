'use client';

import type { CSSProperties, ReactNode } from 'react';
import { createContext, useContext, useMemo, useState } from 'react';
import { DEFAULT_BOTTOM_NAV_HEIGHT } from '../constants/navHeight';

interface BottomNavLayoutContextValue {
  bottomNavHeight: number;
  setBottomNavHeight: (height: number) => void;
}

const BottomNavLayoutContext = createContext<BottomNavLayoutContextValue | null>(null);

export function BottomNavLayoutProvider({ children }: { children: ReactNode }) {
  const [bottomNavHeight, setBottomNavHeight] = useState(DEFAULT_BOTTOM_NAV_HEIGHT);

  const value = useMemo(() => ({ bottomNavHeight, setBottomNavHeight }), [bottomNavHeight]);

  return (
    <BottomNavLayoutContext.Provider value={value}>
      <div
        className="h-full"
        style={{ '--bottom-nav-height': `${bottomNavHeight}px` } as CSSProperties}
      >
        {children}
      </div>
    </BottomNavLayoutContext.Provider>
  );
}

export function useBottomNavLayoutContext() {
  const context = useContext(BottomNavLayoutContext);
  if (!context) {
    throw new Error('useBottomNavLayoutContext must be used within BottomNavLayoutProvider');
  }
  return context;
}

'use client';

import { type RefObject, useEffect } from 'react';
import { useBottomNavLayoutContext } from '../ui/BottomNavLayoutContext';

interface UseBottomNavLayoutSyncOptions {
  barRef: RefObject<HTMLDivElement | null>;
}

export function useBottomNavLayoutSync({ barRef }: UseBottomNavLayoutSyncOptions) {
  const { setBottomNavHeight } = useBottomNavLayoutContext();

  useEffect(() => {
    const syncBottomNavHeight = () => {
      const barHeight = barRef.current?.offsetHeight ?? 0;
      setBottomNavHeight(barHeight);
    };

    syncBottomNavHeight();

    const ro = new ResizeObserver(syncBottomNavHeight);
    if (barRef.current) ro.observe(barRef.current);

    window.addEventListener('resize', syncBottomNavHeight);

    return () => {
      window.removeEventListener('resize', syncBottomNavHeight);
      ro.disconnect();
    };
  }, [barRef, setBottomNavHeight]);
}

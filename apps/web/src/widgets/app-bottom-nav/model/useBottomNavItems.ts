'use client';

import { usePathname } from 'next/navigation';
import type { BottomNavItem } from '@/shared/ui/index';
import { BOTTOM_NAV_ITEMS } from './navigation';

export function useBottomNavItems(): BottomNavItem[] {
  const pathname = usePathname();

  return BOTTOM_NAV_ITEMS.map((item) => ({
    ...item,
    isActive: pathname !== null && (pathname === item.href || pathname.startsWith(`${item.href}/`)),
  }));
}

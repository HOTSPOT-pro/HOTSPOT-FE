'use client';

import { cn } from '@hotspot/ui';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BOTTOM_NAV_ITEMS } from '@/shared/config/navigation';

interface BottomNavigationProps {
  className?: string;
}

export function BottomNavigation({ className }: BottomNavigationProps) {
  const pathname = usePathname();

  return (
    <nav aria-label="Bottom navigation" className={className}>
      <div className="mx-auto w-full px-6 bg-white">
        <ul className="flex">
          {BOTTOM_NAV_ITEMS.map((item) => {
            const isActive =
              pathname !== null && (pathname === item.href || pathname.startsWith(`${item.href}/`));
            const Icon = item.icon;
            const ActiveIcon = item.activeIcon;

            return (
              <li className="flex-1" key={item.href}>
                <Link
                  aria-current={isActive ? 'page' : undefined}
                  className={cn(
                    'group flex h-full py-2 flex-col items-center justify-center gap-0.5 text-xs transition-colors',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                  )}
                  href={item.href}
                >
                  <div className="relative h-6 w-6">
                    <Icon
                      className={cn(
                        'absolute inset-0 transition-opacity duration-200 text-black',
                        isActive ? 'opacity-0' : 'opacity-100 group-hover:opacity-0',
                      )}
                    />
                    <ActiveIcon
                      className={cn(
                        'absolute inset-0 transition-opacity duration-200 text-purple-600',
                        isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100',
                      )}
                    />
                  </div>

                  <span
                    className={cn(
                      'transition-colors',
                      isActive
                        ? 'font-medium text-purple-800'
                        : 'text-black group-hover:text-purple-800',
                    )}
                  >
                    {item.label}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}

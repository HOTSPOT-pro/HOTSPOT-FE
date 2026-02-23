'use client';

import { cn } from '@hotspot/ui';
import Link from 'next/link';
import type { ComponentType, SVGProps } from 'react';
import { forwardRef } from 'react';

export type BottomNavIcon = ComponentType<SVGProps<SVGSVGElement>>;

export interface BottomNavItem {
  activeIcon: BottomNavIcon;
  href: string;
  icon: BottomNavIcon;
  isActive: boolean;
  label: string;
}

interface BottomNavigationProps {
  className?: string;
  durationMs: number;
  hidden: boolean;
  items: BottomNavItem[];
}

export const BottomNavigation = forwardRef<HTMLDivElement, BottomNavigationProps>(
  function BottomNavigation({ className, durationMs, hidden, items }, ref) {
    return (
      <div
        className={cn(
          'fixed inset-x-0 bottom-0 z-sticky',
          'pb-[env(safe-area-inset-bottom)]',
          'transition-transform will-change-transform',
          hidden ? 'translate-y-full' : 'translate-y-0',
        )}
        ref={ref}
        style={{ transitionDuration: `${durationMs}ms` }}
      >
        <nav aria-label="Bottom navigation" className={className}>
          <div className="mx-auto w-full px-6 bg-white">
            <ul className="flex">
              {items.map((item) => {
                const Icon = item.icon;
                const ActiveIcon = item.activeIcon;

                return (
                  <li className="flex-1" key={item.href}>
                    <Link
                      aria-current={item.isActive ? 'page' : undefined}
                      className={cn(
                        'group flex h-full py-2 flex-col items-center justify-center gap-0.5 text-xs transition-colors',
                        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                      )}
                      href={item.href}
                    >
                      <div className="relative h-6 w-6">
                        <Icon
                          aria-hidden="true"
                          className={cn(
                            'absolute inset-0 transition-opacity duration-200 text-black',
                            item.isActive ? 'opacity-0' : 'opacity-100 group-hover:opacity-0',
                          )}
                          focusable="false"
                        />
                        <ActiveIcon
                          aria-hidden="true"
                          className={cn(
                            'absolute inset-0 transition-opacity duration-200 text-purple-600',
                            item.isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100',
                          )}
                          focusable="false"
                        />
                      </div>

                      <span
                        className={cn(
                          'transition-colors',
                          item.isActive
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
      </div>
    );
  },
);

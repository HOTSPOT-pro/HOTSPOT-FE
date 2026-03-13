import type { ReactNode } from 'react';
import { ROUTES } from '@/shared/constants/routes';
import { AppHeader } from '@/widgets/app-header/ui/AppHeader';

export default function TabsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex min-h-full flex-col">
      <div className="fixed inset-x-0 top-0 z-header">
        <div className="mx-auto w-full max-w-[500px]">
          <AppHeader
            config={{
              leftAction: {
                href: ROUTES.MY_STATUS,
                label: 'HOTSPOT',
                type: 'brand',
              },
              rightAction: { type: 'notification' },
              variant: 'main',
            }}
          />
        </div>
      </div>
      <div className="flex-1 pt-12">{children}</div>
    </div>
  );
}

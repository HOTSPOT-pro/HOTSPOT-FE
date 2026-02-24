import type { ReactNode } from 'react';
import { AppHeader } from '@/widgets/app-header/ui/AppHeader';

export default function TabsLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="fixed inset-x-0 top-0 z-header">
        <AppHeader
          config={{
            leftAction: { label: 'HOTSPOT', type: 'brand' },
            rightAction: { type: 'notification' },
            variant: 'main',
          }}
        />
      </div>
      <div className="pt-12"> {children}</div>
    </>
  );
}

import type { ReactNode } from 'react';
import { SubHeaderProvider } from '@/widgets/app-header/ui/SubHeaderProvider';
import { SubHeaderRenderer } from '@/widgets/app-header/ui/SubHeaderRenderer';

export default function SubLayout({ children }: { children: ReactNode }) {
  return (
    <SubHeaderProvider>
      <div className="flex h-full flex-col">
        <SubHeaderRenderer />
        <div className="flex-1 min-h-0">{children}</div>
      </div>
    </SubHeaderProvider>
  );
}

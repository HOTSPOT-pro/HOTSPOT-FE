import type { ReactNode } from 'react';
import { SubHeaderProvider } from '@/widgets/app-header/ui/SubHeaderProvider';
import { SubHeaderRenderer } from '@/widgets/app-header/ui/SubHeaderRenderer';

export default function SubLayout({ children }: { children: ReactNode }) {
  return (
    <SubHeaderProvider>
      <SubHeaderRenderer />
      {children}
    </SubHeaderProvider>
  );
}

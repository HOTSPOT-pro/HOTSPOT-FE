'use client';

import { ModalProvider } from '@hotspot/ui';
import type { ReactNode } from 'react';

export function Provider({ children }: { children: ReactNode }) {
  return <ModalProvider>{children}</ModalProvider>;
}

'use client';

import { AppHeader } from './AppHeader';
import { useSubHeaderStore } from './SubHeaderProvider';

export function SubHeaderRenderer() {
  const { header } = useSubHeaderStore();
  return <AppHeader config={header} />;
}

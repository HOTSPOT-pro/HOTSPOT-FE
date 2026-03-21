'use client';

import { createContext, type ReactNode, useCallback, useContext, useMemo, useState } from 'react';
import type { HeaderConfig } from '../model/types';

type SubHeaderConfig = Extract<HeaderConfig, { variant: 'sub' }>;

type SubHeaderContextValue = {
  header: SubHeaderConfig;
  setHeader: (config: SubHeaderConfig) => void;
  resetHeader: () => void;
};

const DEFAULT_SUB_HEADER: SubHeaderConfig = {
  leftAction: { type: 'back' },
  rightAction: { type: 'none' },
  title: '',
  variant: 'sub',
};

const SubHeaderContext = createContext<SubHeaderContextValue | null>(null);

export function SubHeaderProvider({ children }: { children: ReactNode }) {
  const [header, setHeaderState] = useState<SubHeaderConfig>(DEFAULT_SUB_HEADER);

  const setHeader = useCallback((config: SubHeaderConfig) => {
    setHeaderState(config);
  }, []);

  const resetHeader = useCallback(() => {
    setHeaderState(DEFAULT_SUB_HEADER);
  }, []);

  const value = useMemo(
    () => ({ header, resetHeader, setHeader }),
    [header, resetHeader, setHeader],
  );

  return <SubHeaderContext.Provider value={value}>{children}</SubHeaderContext.Provider>;
}

export function useSubHeaderStore() {
  const ctx = useContext(SubHeaderContext);
  if (!ctx) throw new Error('useSubHeaderStore must be used within SubHeaderProvider');
  return ctx;
}

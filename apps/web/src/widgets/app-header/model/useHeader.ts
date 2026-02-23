'use client';

import { useEffect } from 'react';
import { useSubHeaderStore } from '../ui/SubHeaderProvider';
import type { HeaderConfig } from './types';

type SubHeaderConfig = Extract<HeaderConfig, { variant: 'sub' }>;

/**
 * sub 페이지에서만 사용
 * - config를 주면 mount 시 setHeader
 * - unmount 시 resetHeader
 */
export function useHeader(config: SubHeaderConfig) {
  const { setHeader, resetHeader } = useSubHeaderStore();

  useEffect(() => {
    setHeader(config);
    return () => resetHeader();
  }, [config, resetHeader, setHeader]);
}

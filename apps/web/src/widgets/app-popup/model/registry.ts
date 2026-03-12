'use client';

import type { ComponentType } from 'react';
import { PresentDataPopUp } from '@/shared/ui';

type AppPopUpComponent = ComponentType<{ close: () => void; props?: Record<string, unknown> }>;

export const popupRegistry: Record<string, AppPopUpComponent> = {
  presentDataPopUp: PresentDataPopUp,
} as const;

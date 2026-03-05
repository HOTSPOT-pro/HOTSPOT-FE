'use client';

import type { ComponentType } from 'react';
import { ErrorModal } from '@/shared/ui/error-modal/ErrorModal';
import { PolicyDetailModal } from '@/widgets/policy-modal/ui/PolicyDetailModal';

type AppModalComponent = ComponentType<{ close: () => void; props?: Record<string, unknown> }>;

export const modalRegistry: Record<string, AppModalComponent> = {
  errorModal: ErrorModal,
  policyDetailModal: PolicyDetailModal,
} as const;

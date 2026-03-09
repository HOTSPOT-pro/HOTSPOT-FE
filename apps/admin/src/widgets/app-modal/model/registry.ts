'use client';

import type { ComponentType } from 'react';
import { ErrorModal } from '@/shared/ui/error-modal/ErrorModal';
import { PolicyAddBlockModal } from '@/widgets/policy-modal/ui/PolicyAddBlockModal';
import { PolicyAddTimeModal } from '@/widgets/policy-modal/ui/PolicyAddTimeModal';
import { PolicyDetailModal } from '@/widgets/policy-modal/ui/PolicyDetailModal';

type AppModalComponent = ComponentType<{ close: () => void; props?: Record<string, unknown> }>;

export const modalRegistry: Record<string, AppModalComponent> = {
  addBlockPolicyModal: PolicyAddBlockModal,
  addTimePolicyModal: PolicyAddTimeModal,
  errorModal: ErrorModal,
  policyDetailModal: PolicyDetailModal,
} as const;

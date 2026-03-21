'use client';

import type { ComponentType } from 'react';
import { ActivatePolicyModal } from '@/features/policy/ui/ActivatePolicyModal';
import { DeletePolicyModal } from '@/features/policy/ui/DeletePolicyModal';
import { ErrorModal } from '@/shared/ui/error-modal/ErrorModal';
import { RelationDocumentModal } from '@/widgets/app-modal/ui/RelationDocumentModal';
import { PolicyAddBlockModal } from '@/widgets/policy-modal/ui/PolicyAddBlockModal';
import { PolicyAddTimeModal } from '@/widgets/policy-modal/ui/PolicyAddTimeModal';
import { PolicyDetailModal } from '@/widgets/policy-modal/ui/PolicyDetailModal';

type AppModalComponent = ComponentType<{ close: () => void; props?: Record<string, unknown> }>;

export const modalRegistry: Record<string, AppModalComponent> = {
  activatePolicyModal: ActivatePolicyModal,
  addBlockPolicyModal: PolicyAddBlockModal,
  addTimePolicyModal: PolicyAddTimeModal,
  deletePolicyModal: DeletePolicyModal,
  errorModal: ErrorModal,
  policyDetailModal: PolicyDetailModal,
  relationDocumentModal: RelationDocumentModal,
} as const;

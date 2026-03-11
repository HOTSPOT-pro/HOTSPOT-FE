'use client';

import { ErrorModal } from '@shared/ui';
import type { ComponentType } from 'react';
import { PresentConfirmModal } from '@/features/gift/present-data/ui/PresentConfirmModal';
import { AddPolicyModal } from '@/features/policy/policy-list/ui/AddPolicyModal';
import { DeleteFamilyPolicyModal } from '@/features/policy/policy-list/ui/DeleteFamilyPolicyModal';
import { AddFamilyMemberModal } from '@/pages-layer/family/ui/modal/AddFamilyMemberModal';
import { ChangeFamilyRoleModal } from '@/pages-layer/family/ui/modal/ChangeFamilyRoleModal';
import { DeleteFamilyMemberModal } from '@/pages-layer/family/ui/modal/DeleteFamilyMemberModal';
import { LogoutConfirmModal } from '@/pages-layer/my-page/ui/modal/LogoutConfirmModal';
import { WithdrawConfirmModal } from '@/pages-layer/my-page/ui/modal/WithdrawConfirmModal';
import { CreateFamilyModal } from '@/pages-layer/onboarding/ui/modal/CreateFamilyModal';
import { PolicyDetailModal } from '@/widgets/policy-modal/ui/PolicyDetailModal';
import { TestAlertModal } from '../../../pages-layer/home/ui/modal/TeatAlertModal';

type AppModalComponent = ComponentType<{ close: () => void; props?: Record<string, unknown> }>;

export const modalRegistry: Record<string, AppModalComponent> = {
  addFamilyMemberModal: AddFamilyMemberModal,
  addFamilyPolicyModal: AddPolicyModal,
  changeFamilyRoleModal: ChangeFamilyRoleModal,
  createFamilyModal: CreateFamilyModal,
  deleteFamilyMemberModal: DeleteFamilyMemberModal,
  deleteFamilyPolicyModal: DeleteFamilyPolicyModal,
  errorModal: ErrorModal,
  logoutConfirmModal: LogoutConfirmModal,
  policyDetailModal: PolicyDetailModal,
  presentConfirmModal: PresentConfirmModal,
  testmodal: TestAlertModal,
  withdrawConfirmModal: WithdrawConfirmModal,
} as const;

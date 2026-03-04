'use client';

import { ErrorModal } from '@shared/ui';
import type { ComponentType } from 'react';
import { AddFamilyMemberModal } from '@/pages-layer/family/ui/modal/AddFamilyMemberModal';
import { ChangeFamilyRoleModal } from '@/pages-layer/family/ui/modal/ChangeFamilyRoleModal';
import { DeleteFamilyMemberModal } from '@/pages-layer/family/ui/modal/DeleteFamilyMemberModal';
import { LogoutConfirmModal } from '@/pages-layer/my-page/ui/modal/LogoutConfirmModal';
import { PolicyDetailModal } from '@/widgets/policy-modal/ui/PolicyDetailModal';
import { TestAlertModal } from '../../../pages-layer/home/ui/modal/TeatAlertModal';

type AppModalComponent = ComponentType<{ close: () => void; props?: Record<string, unknown> }>;

export const modalRegistry: Record<string, AppModalComponent> = {
  addFamilyMemberModal: AddFamilyMemberModal,
  changeFamilyRoleModal: ChangeFamilyRoleModal,
  deleteFamilyMemberModal: DeleteFamilyMemberModal,
  errorModal: ErrorModal,
  logoutConfirmModal: LogoutConfirmModal,
  policyDetailModal: PolicyDetailModal,
  testmodal: TestAlertModal,
} as const;

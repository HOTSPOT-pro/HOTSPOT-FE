'use client';

import { ErrorModal } from '@shared/ui';
import { LogoutConfirmModal } from '@/pages-layer/my-page/ui/modal/LogoutConfirmModal';
import { PolicyDetailModal } from '@/widgets/policy-modal/ui/PolicyDetailModal';
import { TestAlertModal } from '../../../pages-layer/home/ui/modal/TeatAlertModal';

export const modalRegistry = {
  errorModal: ErrorModal,
  logoutConfirmModal: LogoutConfirmModal,
  policyDetailModal: PolicyDetailModal,
  testmodal: TestAlertModal,
} as const;

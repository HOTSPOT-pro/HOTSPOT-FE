'use client';

import { ErrorModal } from '@shared/ui';
import { PolicyDetailModal } from '@/widgets/policy/ui/PolicyDetailModal';
import { TestAlertModal } from '../../../pages-layer/home/ui/modal/TeatAlertModal';

export const modalRegistry = {
  errorModal: ErrorModal,
  policyDetailModal: PolicyDetailModal,
  testmodal: TestAlertModal,
} as const;

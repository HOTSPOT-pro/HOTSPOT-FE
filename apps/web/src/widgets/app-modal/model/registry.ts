'use client';

import { PolicyDetailModal } from '@/widgets/policy/ui/PolicyDetailModal';
import { TestAlertModal } from '../../../pages-layer/home/ui/modal/TeatAlertModal';

export const modalRegistry = {
  policyDetailModal: PolicyDetailModal,
  testmodal: TestAlertModal,
} as const;

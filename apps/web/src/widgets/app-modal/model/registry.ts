'use client';

import { ErrorModal } from '@shared/ui';
import { TestAlertModal } from '../../../pages-layer/home/ui/modal/TeatAlertModal';

export const modalRegistry = {
  errorModal: ErrorModal,
  testmodal: TestAlertModal,
} as const;

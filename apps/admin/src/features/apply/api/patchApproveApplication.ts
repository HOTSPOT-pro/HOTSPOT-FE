import { api } from '@/shared/api/client';
import type { ApiResponse } from '@/shared/api/types';
import type { PatchApplicationStatusRequest } from './types';

export const patchApproveApplication = async ({
  applyType,
  requestId,
}: PatchApplicationStatusRequest): Promise<void> => {
  await api.patch<ApiResponse<unknown>>(
    `/api/v1/admin/families/requests/${applyType}/${requestId}/approve`,
  );
};

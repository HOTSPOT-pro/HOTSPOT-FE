import { api } from '@/shared/api/client';
import type { PutPolicyApplyRequest } from '../model/types';

export const patchBlockApplyClientApi = async (request: PutPolicyApplyRequest) => {
  const { data } = await api.patch(
    `/api/v1/admin/families/${request.familyId}/members/${request.subId}/policy-status/app`,
    { policies: request.policies },
  );
  return data.data;
};

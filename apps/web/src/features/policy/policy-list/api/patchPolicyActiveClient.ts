import { api } from '@shared/api/client';
import type { ApiResponse } from '@shared/api/types';
import type { PatchFamilyPolicyActive } from '../model/types';

export const patchPolicyActiveClient = async (request: PatchFamilyPolicyActive) => {
  const { data } = await api.patch<ApiResponse<string>>(`/api/v1/policies/families`, {
    blockPolicyIdList: request.blockPolicyIdList,
    familyId: request.familyId,
  });
  return data.data;
};

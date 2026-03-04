import { api } from '@/shared/api/client';
import type { PutPolicyApplyRequest } from './types';

export const putPolicyApplyClientApi = async (request: PutPolicyApplyRequest) => {
  const { data } = await api.put(`/api/v1/policies/apply`, {
    blockPolicyIdList: request.blockPolicyIdList,
    familyId: request.familyId,
    subId: request.subId,
  });
  return data.data;
};

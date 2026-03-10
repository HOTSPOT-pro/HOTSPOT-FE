import { api } from '@shared/api/client';
import type { ApiResponse } from '@shared/api/types';
import type { PostFamilyCustomPolicy } from '../model/types';

export const postFamilyCustomPolicyClinet = async (request: PostFamilyCustomPolicy) => {
  const { data } = await api.post<ApiResponse<string>>(`/api/v1/policies`, {
    isActive: request.isActive,
    name: request.name,
    policyDescription: request.policyDescription,
    policySnapshot: request.policySnapshot,
    policyType: request.policyType,
  });
  return data.data;
};

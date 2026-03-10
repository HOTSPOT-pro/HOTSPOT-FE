import { api } from '@shared/api/client';
import type { ApiResponse } from '@shared/api/types';
import type { PostFamilyCustomPolicy } from '../model/types';

interface Props {
  blockPolicyId: number;
  request: PostFamilyCustomPolicy;
}

export const patchFamilyCustomPolicyClient = async ({ blockPolicyId, request }: Props) => {
  const { data } = await api.patch<ApiResponse<string>>(`/api/v1/policies/${blockPolicyId}`, {
    isActive: request.isActive,
    name: request.name,
    policyDescription: request.policyDescription,
    policySnapshot: request.policySnapshot,
    policyType: request.policyType,
  });
  return data.data;
};

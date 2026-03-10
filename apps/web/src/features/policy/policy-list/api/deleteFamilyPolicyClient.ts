import { api } from '@shared/api/client';
import type { ApiResponse } from '@shared/api/types';
import { GetFamilyCustomPolicy } from '../model/types';

export const delelteFamilyPolicyClient = async (deleteId: number) => {
  const { data } = await api.delete<ApiResponse<string>>(`/api/v1/policies/families`, {
    params: {
      policyIdList: deleteId,
    },
  });
  return data.data;
};

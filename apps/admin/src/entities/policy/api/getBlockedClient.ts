import { api } from '@/shared/api/client';
import type { ApiResponse } from '@/shared/api/types';
import type { GetPolicyRequest, GetPolicyResponse } from '../model/types';

export const getBlockedClient = async (params: GetPolicyRequest) => {
  const { data } = await api.get<ApiResponse<GetPolicyResponse>>(`api/v1/admin/policies/app`, {
    params,
  });
  return data.data;
};

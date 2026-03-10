import { api } from '@shared/api/client';
import type { ApiResponse } from '@shared/api/types';
import type { GetFamilyCustomPolicy } from '../model/types';

export const getFamilyPolicyClient = async () => {
  const { data } = await api.get<ApiResponse<GetFamilyCustomPolicy[]>>(`/api/v1/policies/families`);
  return data.data;
};

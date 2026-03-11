import { api } from '@shared/api/client';
import type { ApiResponse } from '@shared/api/types';
import type { Policy } from './types';

export const getPolicyClientApi = async () => {
  const { data } = await api.get<ApiResponse<Policy[]>>(`/api/v1/policies`);
  return data.data;
};

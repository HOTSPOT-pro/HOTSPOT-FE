import { api } from '@shared/api/client';
import type { ApiResponse } from '@shared/api/types';
import type { GetDatalimitResponse } from './types';

export const getDatalimitClientApi = async (subId: number) => {
  const { data } = await api.get<ApiResponse<GetDatalimitResponse>>(
    `/api/v1/families/data-limit/${subId}`,
  );
  return data.data;
};

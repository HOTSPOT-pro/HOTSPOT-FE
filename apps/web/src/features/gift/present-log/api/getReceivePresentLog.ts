import { api } from '@/shared/api/client';
import type { ApiResponse } from '@/shared/api/types';
import type { PresentReceiveResponse } from './types';

export const getReceiveDataClient = async () => {
  const { data } = await api.get<ApiResponse<PresentReceiveResponse>>(
    `/api/v1/presentData/receive`,
  );
  return data.data;
};

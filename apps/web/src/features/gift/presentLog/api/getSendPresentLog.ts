import { api } from '@/shared/api/client';
import type { ApiResponse } from '@/shared/api/types';
import type { PresentSendResponse } from './types';

export const getSendDataClient = async () => {
  const { data } = await api.get<ApiResponse<PresentSendResponse>>(`/api/v1/presentData/provide`);
  return data.data;
};

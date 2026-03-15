import { api } from '@/shared/api/client';
import type { ApiResponse } from '@/shared/api/types';
import type { Subscribe } from '../model/types';

export const getSubscribeInfo = async () => {
  const { data } = await api.get<ApiResponse<Subscribe>>(`/api/v1/ai-reports/families`);
  return data.data;
};

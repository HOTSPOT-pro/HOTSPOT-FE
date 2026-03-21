import { api } from '@/shared/api/client';
import type { ApiResponse } from '@/shared/api/types';

export const deleteSubscribe = async () => {
  const { data } = await api.delete<ApiResponse<string>>(`/api/v1/ai-reports/families`);
  return data.data;
};

import { api } from '@/shared/api/client';
import type { ApiResponse } from '@/shared/api/types';
import type { DailyUsageRequest, DailyUsageResponse } from './types';

export const getFamilyDailyUsage = async (request: DailyUsageRequest) => {
  const { data } = await api.get<ApiResponse<DailyUsageResponse>>(`/api/v1/reportUsage/day`, {
    params: { month: request.month, targetSubId: request.targetSubId },
  });
  return data.data;
};

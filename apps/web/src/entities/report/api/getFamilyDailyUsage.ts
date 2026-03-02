import { api } from '@/shared/api/client';
import type { ApiResponse } from '@/shared/api/types';
import type { DailyUsageResponse } from './types';

export const getFamilyDailyUsage = async (subId?: number | null) => {
  const queryString = subId != null && subId !== -1 ? `?targetSubId=${subId}` : '';
  const { data } = await api.get<ApiResponse<DailyUsageResponse>>(
    `/api/v1/reportUsage/day${queryString}`,
  );
  return data.data;
};

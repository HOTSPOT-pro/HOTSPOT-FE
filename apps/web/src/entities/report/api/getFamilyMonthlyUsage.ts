import { api } from '@/shared/api/client';
import type { ApiResponse } from '@/shared/api/types';
import type { MonthlyUsageResponse } from './types';

export const getFamilyMonthlyUsage = async (subId?: number | null) => {
  const queryString = subId !== null && subId !== -1 ? `?targetSubId=${subId}` : '';
  const { data } = await api.get<ApiResponse<MonthlyUsageResponse>>(
    `/api/v1/reportUsage/month${queryString}`,
  );
  return data.data;
};

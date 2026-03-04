import { api } from '@/shared/api/client';
import type { ApiResponse } from '@/shared/api/types';
import type { ServiceUsageResponse } from './types';

export const getServiceDailyUsage = async (subId?: number) => {
  const { data } = await api.get<ApiResponse<ServiceUsageResponse>>(
    `/api/v1/reportUsage/app/day${`?targetSubId=${subId}`}`,
  );
  return data.data;
};

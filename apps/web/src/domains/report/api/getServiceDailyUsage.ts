import { api } from '@/shared/api/client';
import type { ApiResponse } from '@/shared/api/types';
import type { ServiceUsageRequest, ServiceUsageResponse } from './types';

export const getServiceDailyUsage = async ({ targetSubId, date }: ServiceUsageRequest) => {
  const { data } = await api.get<ApiResponse<ServiceUsageResponse>>(`/api/v1/reportUsage/app/day`, {
    params: {
      date: date,
      targetSubId: targetSubId,
    },
  });
  return data.data;
};

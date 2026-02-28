import { api } from '@/shared/api/client';
import type { ApiResponse } from '@/shared/api/types';
import type { GetNotificationResponse } from './types';

export const getNotificationClientApi = async () => {
  const { data } = await api.get<ApiResponse<GetNotificationResponse>>(`/api/v1/notifications`);
  return data.data;
};

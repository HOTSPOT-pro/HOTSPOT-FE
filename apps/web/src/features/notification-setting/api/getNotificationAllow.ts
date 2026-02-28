import { api } from '@shared/api/client';
import type { ApiResponse } from '@/shared/api/types';
import type { NotificationAllowResponse } from './type';

export const getNotificationAllow = async () => {
  const { data } = await api.get<ApiResponse<NotificationAllowResponse>>(
    `/api/v1/notifications/allow`,
  );
  return data.data;
};

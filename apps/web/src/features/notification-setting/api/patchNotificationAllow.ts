import { api } from '@shared/api/client';
import type { ApiResponse } from '@/shared/api/types';
import type { NotificationAllowResponse } from './type';

export const patchNotificationAllow = async (category: string, isAllowed: boolean) => {
  const { data } = await api.patch<ApiResponse<NotificationAllowResponse>>(
    `/api/v1/notifications/allow`,
    {
      notificationAllow: isAllowed,
      notificationCategory: category,
    },
  );
  return data.data;
};

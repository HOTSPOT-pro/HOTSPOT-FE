import { api } from '@/shared/api/client';
import type { ApiResponse } from '@/shared/api/types';

export const getUnreadCountClientApi = async () => {
  const { data } = await api.get<ApiResponse<{ unreadCount: number }>>(
    `/api/v1/notifications/unread-count`,
  );
  return data.data;
};

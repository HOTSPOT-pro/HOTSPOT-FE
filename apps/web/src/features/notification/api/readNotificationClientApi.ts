import { api } from '@/shared/api/client';

export const readNotificationClientApi = async (notificationId: number) => {
  const { data } = await api.patch(`/api/v1/notifications/${notificationId}/read`);
  return data.data;
};
export const readAllNotificationClientApi = async () => {
  const { data } = await api.patch(`/api/v1/notifications/read-all`);
  return data.data;
};

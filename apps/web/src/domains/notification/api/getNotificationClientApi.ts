import { api } from '@/shared/api/client';
import type { ApiResponse } from '@/shared/api/types';
import type { GetNofiticationRequest, GetNotificationResponse } from './types';

export const getNotificationClientApi = async ({ page, size }: GetNofiticationRequest) => {
  const { data } = await api.get<ApiResponse<GetNotificationResponse>>(`/api/v1/notifications`, {
    params: {
      page,
      size,
    },
  });
  return data.data;
};

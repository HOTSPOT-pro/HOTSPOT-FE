import { api } from '@/shared/api/client';
import type { ApiResponse } from '@/shared/api/types';

interface PostSubscribeProps {
  receiveDay: string;
}
export const postSubscribe = async ({ receiveDay }: PostSubscribeProps) => {
  const { data } = await api.post<ApiResponse<string>>(`/api/v1/ai-reports/families`, {
    receiveDay,
  });
  return data.data;
};

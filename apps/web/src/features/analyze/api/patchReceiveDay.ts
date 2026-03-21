import { api } from '@/shared/api/client';
import type { ApiResponse } from '@/shared/api/types';

interface PostSubscribeProps {
  receiveDay: string;
}
export const patchReceiveDay = async ({ receiveDay }: PostSubscribeProps) => {
  const { data } = await api.patch<ApiResponse<string>>(`/api/v1/ai-reports/families/receive-day`, {
    receiveDay,
  });
  return data.data;
};

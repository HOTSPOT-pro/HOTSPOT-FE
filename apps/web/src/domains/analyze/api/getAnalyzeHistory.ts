import { api } from '@/shared/api/client';
import type { ApiResponse } from '@/shared/api/types';
import type { History } from '../model/types';

interface GetAnalyzeHistoryProps {
  subId: number;
  yearMonth: string;
}

export const getAnalyzeHistory = async ({ subId, yearMonth }: GetAnalyzeHistoryProps) => {
  const { data } = await api.get<ApiResponse<History>>(
    `/api/v1/ai-reports/families/members/${subId}/monthly?yearMonth=${yearMonth}`,
  );
  return data.data;
};

import { api } from '@/shared/api/client';
import type { ApiResponse } from '@/shared/api/types';
import type { AnalyzeData } from '../model/types';

export const getAnalyzeMember = async () => {
  const { data } = await api.get<ApiResponse<AnalyzeData>>(`/api/v1/ai-reports/families/members`);
  return data.data;
};

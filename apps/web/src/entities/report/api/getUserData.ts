import { api } from '@/shared/api/client';
import type { ApiResponse } from '@/shared/api/types';
import type { ReportFamilyResponse } from './types';

export const getUserData = async () => {
  const { data } = await api.get<ApiResponse<ReportFamilyResponse[]>>(`/api/v1/reportUsage/family`);
  return data.data;
};

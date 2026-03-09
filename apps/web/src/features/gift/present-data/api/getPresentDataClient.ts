import { api } from '@/shared/api/client';
import type { ApiResponse } from '@/shared/api/types';
import type { PresentFamilyDataResponse } from './types';

export const getPresentDataClient = async () => {
  const { data } = await api.get<ApiResponse<PresentFamilyDataResponse>>(`/api/v1/presentData`);
  return data.data;
};

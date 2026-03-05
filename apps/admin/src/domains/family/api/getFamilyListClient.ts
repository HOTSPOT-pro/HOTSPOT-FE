import { api } from '@/shared/api/client';
import type { ApiResponse } from '@/shared/api/types';
import type { FamilyList, FamilyListRequest } from '../model/types';

export const getFamilyListClient = async ({ page, size }: FamilyListRequest) => {
  const { data } = await api.get<ApiResponse<FamilyList>>(
    `api/v1/admin/families?page=${page}&size=${size}`,
  );
  return data.data;
};

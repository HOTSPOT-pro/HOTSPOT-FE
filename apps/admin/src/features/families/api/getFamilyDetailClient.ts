import { api } from '@/shared/api/client';
import type { ApiResponse } from '@/shared/api/types';
import type { FamilyDetail } from '../model/types';

export const getFamilyDetailClient = async (familyId: number) => {
  const { data } = await api.get<ApiResponse<FamilyDetail>>(`api/v1/admin/families/${familyId}`);
  return data.data;
};

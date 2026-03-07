import type { FamilyDetail } from '@/domains/family';
import { api } from '@/shared/api/client';
import type { ApiResponse } from '@/shared/api/types';

export const getFamilyByPhoneClient = async (familyId: number) => {
  const { data } = await api.get<ApiResponse<FamilyDetail>>(`api/v1/admin/families/${familyId}`);
  return data.data;
};

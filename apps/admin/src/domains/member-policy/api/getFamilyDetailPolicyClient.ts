import type { FamilyPolicy } from '@/domains/family';
import { api } from '@/shared/api/client';
import type { ApiResponse } from '@/shared/api/types';

export const getFamilyDetailPolicyClient = async (familyId: number) => {
  const { data } = await api.get<ApiResponse<FamilyPolicy[]>>(
    `api/v1/admin/families/${familyId}/policy-status`,
  );
  return data.data;
};

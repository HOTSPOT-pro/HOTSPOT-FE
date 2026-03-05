import { api } from '@/shared/api/client';
import type { ApiResponse } from '@/shared/api/types';
import type { FamilyPolicy } from '../../../families/model/types';

export const getFamilyDetailPolicyClient = async (familyId: number) => {
  const { data } = await api.get<ApiResponse<FamilyPolicy[]>>(
    `api/v1/admin/families/${familyId}/policy-status`,
  );
  return data.data;
};

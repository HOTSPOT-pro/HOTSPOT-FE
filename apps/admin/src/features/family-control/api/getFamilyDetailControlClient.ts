import { api } from '@/shared/api/client';
import type { ApiResponse } from '@/shared/api/types';
import type { MemberControl } from '../model/types';

export const getFamilyDetailPolicyClient = async (familyId: number) => {
  const { data } = await api.get<ApiResponse<MemberControl>>(
    `api/v1/admin/families/${familyId}/control-status`,
  );
  return data.data;
};

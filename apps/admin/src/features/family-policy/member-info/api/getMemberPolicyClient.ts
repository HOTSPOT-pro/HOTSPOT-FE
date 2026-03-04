import { api } from '@/shared/api/client';
import type { ApiResponse } from '@/shared/api/types';
import type { GetMemberPolicyRequest, MemberPolicy } from '../model/types';

export const getMemberPolicyClient = async ({ familyId, subId }: GetMemberPolicyRequest) => {
  const { data } = await api.get<ApiResponse<MemberPolicy>>(
    `api/v1/admin/families/${familyId}/members/${subId}/policy-status`,
  );
  return data.data;
};

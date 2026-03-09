import { api } from '@/shared/api/client';
import type { ApiResponse } from '@/shared/api/types';
import type { GetMemberPolicyRequest, MemberBlock } from '../model/types';

export const getMemberBlockClient = async ({ familyId, subId }: GetMemberPolicyRequest) => {
  const { data } = await api.get<ApiResponse<MemberBlock>>(
    `api/v1/admin/families/${familyId}/members/${subId}/policy-status/app`,
  );
  return data.data;
};

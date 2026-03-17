import { api } from '@/shared/api/client';
import type { PutPolicyApplyRequest } from '../model/types';

export const patchPolicyApplyClientApi = async ({
  familyId,
  subId,
  policies,
}: PutPolicyApplyRequest) => {
  console.log(familyId, subId, policies);
  const { data } = await api.patch(
    `api/v1/admin/families/${familyId}/members/${subId}/policy-status/time`,
    {
      policies,
    },
  );
  return data.data;
};

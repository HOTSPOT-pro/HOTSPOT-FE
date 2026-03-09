import { api } from '@/shared/api/client';
import type { PostAppPolicyRequest } from '../model/types';

export const postAppPolicy = async (request: PostAppPolicyRequest) => {
  const { data } = await api.post(`/api/v1/admin/policies/app`, {
    policyCode: request.policyCode,
    policyName: request.policyName,
  });
  return data.data;
};

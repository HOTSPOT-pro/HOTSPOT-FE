import { api } from '@/shared/api/client';
import type { PostTimePolicyRequest } from '../model/types';

export const postTimePolicy = async (request: PostTimePolicyRequest) => {
  const { data } = await api.post(`/api/v1/admin/policies/time`, {
    policyDescription: request.policyDescription,
    policyName: request.policyName,
    policySnapshot: request.policySnapshot,
    policyType: request.policyType,
  });
  return data.data;
};

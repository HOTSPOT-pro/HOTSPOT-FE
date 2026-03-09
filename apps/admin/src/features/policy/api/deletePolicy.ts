import { api } from '@/shared/api/client';
import type { DeletePolicyRequest } from '../model/types';

export const deletePolicy = async ({ policyId, policyType }: DeletePolicyRequest) => {
  const { data } = await api.delete(`/api/v1/admin/policies/${policyType}/${policyId}`);
  return data.data;
};

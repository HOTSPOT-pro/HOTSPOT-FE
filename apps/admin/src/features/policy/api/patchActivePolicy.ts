import { api } from '@/shared/api/client';
import type { PolicyActivateRequest } from '../model/types';

export const patchActivePolicy = async ({
  policyType,
  policyId,
  isActive,
}: PolicyActivateRequest) => {
  const { data } = await api.patch(`/api/v1/admin/policies/${policyType}/${policyId}/active`, {
    isActive,
  });
  return data.data;
};

import { api } from '@shared/api/client';
import type { ApiResponse } from '@shared/api/types';
import type { CurrentBlockedPoliciesStatus } from './types';

export const getCurrentBlockedPoliciesStatusClientApi = async () => {
  const { data } = await api.get<ApiResponse<CurrentBlockedPoliciesStatus>>(
    '/api/v1/policies/blocked',
  );
  return data.data;
};

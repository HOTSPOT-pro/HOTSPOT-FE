import { api } from '@shared/api/client';
import type { ApiResponse } from '@shared/api/types';
import type { GetAppliedPolicyResponse } from './types';

export const getAppliedPolicyClient = async (isFamily: boolean) => {
  const { data } = await api.get<ApiResponse<GetAppliedPolicyResponse>>(
    `/api/v1/policies/applied/isFamily=${isFamily}`,
  );
  console.log(data);
  return data.data;
};

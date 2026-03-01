import { useQuery } from '@tanstack/react-query';
import { getAppliedPolicyClientApi } from '../api/getAppliedPolicyClientApi';
import type { GetAppliedPolicyResponse } from '../api/types';
import type { PolicyPerFamily } from './types';

export const useFamilyPolicy = () => {
  const { data, isPending } = useQuery<GetAppliedPolicyResponse>({
    queryFn: () => getAppliedPolicyClientApi(true),
    queryKey: ['policyPerFamily'],
  });
  const policyPerFamily = data as PolicyPerFamily;
  return {
    loading: isPending,
    policyPerFamily,
  };
};

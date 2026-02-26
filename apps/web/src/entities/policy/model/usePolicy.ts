import { useQuery } from '@tanstack/react-query';
import { getAppliedPolicyClient } from '../api/getAppliedPolicyClient';
import type { GetAppliedPolicyResponse } from '../api/types';

export const usePolicy = () => {
  const { data, isPending } = useQuery<GetAppliedPolicyResponse>({
    queryFn: () => getAppliedPolicyClient(true),
    queryKey: ['appliedPolicy'],
  });
  const policyPerFamily = data;

  // const policyList = MOCK_POLICY_LIST;
  // const blockList = MOCK_BLOCK_SERVICES;

  // const policyList = MOCK_POLICY_LIST;
  // const blockList = MOCK_BLOCK_SERVICES;

  return {
    // blockList,
    loading: isPending,
    policyPerFamily,
    // policyList
  };
};

import { useQuery } from '@tanstack/react-query';
import { getBlockedClient } from '../api/getBlockedClient';
import { getPolicyClient } from '../api/getPolicyClient';
import type { GetBlockResponse, GetPolicyRequest, GetPolicyResponse } from './types';

export const usePolicy = (params: GetPolicyRequest) => {
  const { data, isPending } = useQuery<GetPolicyResponse, Error>({
    queryFn: () => getPolicyClient(params),
    queryKey: ['adminPolicy', params.page, params.size],
  });
  return {
    loading: isPending,
    policyList: data,
  };
};

export const useBlocked = (params: GetPolicyRequest) => {
  const { data, isPending } = useQuery<GetBlockResponse, Error>({
    queryFn: () => getBlockedClient(params),
    queryKey: ['adminBlock', params.page, params.size],
  });
  return {
    blockedList: data,
    loading: isPending,
  };
};

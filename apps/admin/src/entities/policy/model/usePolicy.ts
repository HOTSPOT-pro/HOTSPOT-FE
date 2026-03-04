import { useQuery } from '@tanstack/react-query';
import { getBlockedClient } from '../api/getBlockedClient';
import { getPolicyClient } from '../api/getPolicyClient';
import type { GetPolicyRequest, GetPolicyResponse, Policy } from './types';

export const usePolicy = (params: GetPolicyRequest) => {
  const { data, isPending } = useQuery<GetPolicyResponse, Error, Policy[]>({
    queryFn: () => getPolicyClient(params),
    queryKey: ['adminPolicy'],
    select: (data: GetPolicyResponse): Policy[] => {
      return data.items;
    },
  });
  const policyList = data ?? [];
  return {
    loading: isPending,
    policyList,
  };
};

export const useBlocked = (params: GetPolicyRequest) => {
  const { data, isPending } = useQuery<GetPolicyResponse, Error, Policy[]>({
    queryFn: () => getBlockedClient(params),
    queryKey: ['adminPolicy'],
    select: (data: GetPolicyResponse): Policy[] => {
      return data.items;
    },
  });
  const blockedList = data ?? [];
  return {
    blockedList,
    loading: isPending,
  };
};

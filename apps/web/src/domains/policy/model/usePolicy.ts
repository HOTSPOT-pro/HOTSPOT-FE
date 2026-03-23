import { useQuery } from '@tanstack/react-query';
import { POLICY_KEYS } from '@/shared/constants/queryKey';
import { STALE_TIME } from '@/shared/constants/time';
import { getPolicyClientApi } from '../api/getPolicyClientApi';
import type { Policy } from './types';

export const usePolicy = () => {
  const { data, isPending } = useQuery<Policy[]>({
    queryFn: () => getPolicyClientApi(),
    queryKey: POLICY_KEYS.policy,
    staleTime: STALE_TIME.STATIC,
  });
  const policyList = data ?? [];
  return {
    loading: isPending,
    policyList,
  };
};

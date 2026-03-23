import { useQuery } from '@tanstack/react-query';
import { POLICY_KEYS } from '@/shared/constants/queryKey';
import { STALE_TIME } from '@/shared/constants/time';
import { getCurrentBlockedPoliciesStatusClientApi } from '../api/getCurrentBlockedPoliciesStatusClientApi';

export const useCurrentBlockedPoliciesStatus = () => {
  const query = useQuery({
    gcTime: STALE_TIME.NORMAL,
    queryFn: getCurrentBlockedPoliciesStatusClientApi,
    queryKey: POLICY_KEYS.currentBlock,
    refetchOnMount: 'always',
    staleTime: 0,
  });

  return {
    ...query,
    blockedStatus: query.data,
  };
};

import { useQuery } from '@tanstack/react-query';
import { getCurrentBlockedPoliciesStatusClientApi } from '../api/getCurrentBlockedPoliciesStatusClientApi';

export const useCurrentBlockedPoliciesStatus = () => {
  const query = useQuery({
    gcTime: 5 * 60 * 1000,
    queryFn: getCurrentBlockedPoliciesStatusClientApi,
    queryKey: ['currentBlockedPoliciesStatus'],
    refetchOnMount: 'always',
    staleTime: 0,
  });

  return {
    ...query,
    blockedStatus: query.data,
  };
};

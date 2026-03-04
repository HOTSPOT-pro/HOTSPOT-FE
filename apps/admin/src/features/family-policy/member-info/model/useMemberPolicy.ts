import { useQuery } from '@tanstack/react-query';
import { getMemberPolicyClient } from '../api/getMemberPolicyClient';
import type { GetMemberPolicyRequest } from './types';

const STALE_TIME = 600000; //10분

export const useMemberPolicy = (params: GetMemberPolicyRequest) => {
  const data = useQuery({
    placeholderData: (previousData) => previousData,
    queryFn: () => getMemberPolicyClient(params),
    queryKey: ['adminMemberPolicy', params],
    staleTime: STALE_TIME,
  });

  return {
    isLoading: data.isLoading,
    userData: data.data,
  };
};

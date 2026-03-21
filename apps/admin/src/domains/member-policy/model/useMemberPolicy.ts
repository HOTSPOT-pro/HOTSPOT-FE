import { useQuery } from '@tanstack/react-query';
import { getMemberBlockClient } from '../api/getMemberBlockClient';
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

export const useMemberBlock = (params: GetMemberPolicyRequest) => {
  const familyData = useQuery({
    placeholderData: (previousData) => previousData,
    queryFn: () => getMemberBlockClient(params),
    queryKey: ['adminMemberBlock', params],
    staleTime: STALE_TIME,
  });

  return {
    isLoading: familyData.isLoading,
    userData: familyData.data,
  };
};

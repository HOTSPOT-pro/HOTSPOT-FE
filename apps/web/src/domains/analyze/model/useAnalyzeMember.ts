import { useQuery } from '@tanstack/react-query';
import { SUBSCRIBE_KEYS } from '@/shared/constants/queryKey';
import { GC_TIME, STALE_TIME } from '@/shared/constants/time';
import { getAnalyzeMember } from '../api/getAnalyzeMember';

export const useAnalyzeMember = () => {
  const { data, isLoading } = useQuery({
    gcTime: GC_TIME.NORMAL,
    queryFn: getAnalyzeMember,
    queryKey: SUBSCRIBE_KEYS.member,
    staleTime: STALE_TIME.NORMAL,
  });

  return {
    isLoading,
    member: data,
  };
};

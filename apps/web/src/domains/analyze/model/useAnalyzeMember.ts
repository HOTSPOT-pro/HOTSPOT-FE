import { useQuery } from '@tanstack/react-query';
import { SUBSCRIBE_KEYS } from '@/shared/constants/queryKey';
import { getAnalyzeMember } from '../api/getAnalyzeMember';

const STALE_TIME = 1000 * 60 * 5;

export const useAnalyzeMember = () => {
  const { data, isLoading } = useQuery({
    queryFn: getAnalyzeMember,
    queryKey: SUBSCRIBE_KEYS.member,
    staleTime: STALE_TIME,
  });

  return {
    isLoading,
    member: data,
  };
};

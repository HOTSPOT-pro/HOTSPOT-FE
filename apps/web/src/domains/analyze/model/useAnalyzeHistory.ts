import { useSuspenseQuery } from '@tanstack/react-query';
import { SUBSCRIBE_KEYS } from '@/shared/constants/queryKey';
import { STALE_TIME } from '@/shared/constants/time';
import { getAnalyzeHistory } from '../api/getAnalyzeHistory';

interface UseAnalyzeDataProps {
  subId: number;
  yearMonth: string;
}

export const useAnalyzeHistory = ({ subId, yearMonth }: UseAnalyzeDataProps) => {
  const { data } = useSuspenseQuery({
    queryFn: () => getAnalyzeHistory({ subId, yearMonth }),
    queryKey: SUBSCRIBE_KEYS.history(subId, yearMonth),
    staleTime: STALE_TIME.STATIC,
  });

  return {
    history: data,
  };
};

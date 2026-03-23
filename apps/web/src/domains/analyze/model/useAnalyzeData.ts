import { useSuspenseQuery } from '@tanstack/react-query';
import { SUBSCRIBE_KEYS } from '@/shared/constants/queryKey';
import { GC_TIME, STALE_TIME } from '@/shared/constants/time';
import { getAnalyzeData } from '../api/getAnalyzeData';

interface UseAnalyzeDataProps {
  subId: number;
  reportId: number;
}

export const useAnalyzeData = ({ subId, reportId }: UseAnalyzeDataProps) => {
  const { data } = useSuspenseQuery({
    gcTime: GC_TIME.SHORT,
    queryFn: () => getAnalyzeData({ reportId, subId }),
    queryKey: SUBSCRIBE_KEYS.report(subId, reportId),
    staleTime: STALE_TIME.STATIC,
  });

  return {
    analyzeData: data,
  };
};

import { useSuspenseQuery } from '@tanstack/react-query';
import { STALE_TIME } from '@/shared/constants/time';
import { getAnalyzeData } from '../api/getAnalyzeData';

interface UseAnalyzeDataProps {
  subId: number;
  reportId: number;
}

export const useAnalyzeData = ({ subId, reportId }: UseAnalyzeDataProps) => {
  const { data } = useSuspenseQuery({
    queryFn: () => getAnalyzeData({ reportId, subId }),
    queryKey: ['analyzeData', subId, reportId],
    staleTime: STALE_TIME.STATIC,
  });

  return {
    analyzeData: data,
  };
};

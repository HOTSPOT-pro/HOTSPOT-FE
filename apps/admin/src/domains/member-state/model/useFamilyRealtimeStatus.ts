import { useSuspenseQuery } from '@tanstack/react-query';
import { getFamilyRealtimeStatusClient } from '../api/getFamilyRealtimeStatusClient';

const STALE_TIME = 4000;
const REFRESH_INTERVAL = 5000;

export const useFamilyRealtimeStatus = (familyId: number) => {
  const query = useSuspenseQuery({
    queryFn: () => getFamilyRealtimeStatusClient(familyId),
    queryKey: ['adminFamilyRealtimeStatus', familyId],
    refetchInterval: REFRESH_INTERVAL,
    staleTime: STALE_TIME,
  });

  return {
    isLoading: query.isLoading,
    realtimeStatus: query.data,
  };
};

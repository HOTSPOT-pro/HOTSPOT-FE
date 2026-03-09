import { useQuery } from '@tanstack/react-query';
import { getFamilyRealtimeStatusClient } from '../api/getFamilyRealtimeStatusClient';

const STALE_TIME = 30000;
const REFRESH_INTERVAL = 5000;

export const useFamilyRealtimeStatus = (familyId: number) => {
  const query = useQuery({
    enabled: Number.isFinite(familyId) && familyId > 0,
    placeholderData: (previousData) => previousData,
    queryFn: () => getFamilyRealtimeStatusClient(familyId),
    queryKey: ['adminFamilyRealtimeStatus', familyId],
    refetchInterval: REFRESH_INTERVAL,
    staleTime: STALE_TIME,
  });

  return {
    isError: query.isError,
    isLoading: query.isLoading,
    realtimeStatus: query.data,
    refetch: query.refetch,
  };
};

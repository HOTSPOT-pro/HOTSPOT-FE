import { useQuery } from '@tanstack/react-query';
import { getFamilyDetailClient } from '../api/getFamilyDetailClient';

const STALE_TIME = 600000; //10분

export const useFamilyDetail = (familyId: number) => {
  const familyData = useQuery({
    placeholderData: (previousData) => previousData,
    queryFn: () => getFamilyDetailClient(familyId),
    queryKey: ['adminFamilyDatail', familyId],
    staleTime: STALE_TIME,
  });

  return {
    familyData: familyData.data,
    isLoading: familyData.isLoading,
  };
};

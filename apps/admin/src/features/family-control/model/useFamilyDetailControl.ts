import { useQuery } from '@tanstack/react-query';
import { getFamilyDetailPolicyClient } from '../api/getFamilyDetailControlClient';

const STALE_TIME = 600000; //10분

export const useFamilyDetailControl = (familyId: number) => {
  const familyData = useQuery({
    placeholderData: (previousData) => previousData,
    queryFn: () => getFamilyDetailPolicyClient(familyId),
    queryKey: ['adminFamilyDatailControl', familyId],
    staleTime: STALE_TIME,
  });

  return {
    familyControlData: familyData.data,
    isLoading: familyData.isLoading,
  };
};

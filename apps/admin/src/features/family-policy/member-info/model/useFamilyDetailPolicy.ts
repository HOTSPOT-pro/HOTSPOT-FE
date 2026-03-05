import { useQuery } from '@tanstack/react-query';
import { getFamilyDetailPolicyClient } from '../api/getFamilyDetailPolicyClient';

const STALE_TIME = 600000; //10분

export const useFamilyDetailPolicy = (familyId: number) => {
  const familyData = useQuery({
    placeholderData: (previousData) => previousData,
    queryFn: () => getFamilyDetailPolicyClient(familyId),
    queryKey: ['adminFamilyDatailPolicy', familyId],
    staleTime: STALE_TIME,
  });

  return {
    familyPolicyData: familyData.data,
    isLoading: familyData.isLoading,
  };
};

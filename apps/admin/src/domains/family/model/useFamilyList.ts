import { useQuery } from '@tanstack/react-query';
import { getFamilyListClient } from '../api/getFamilyListClient';
import type { FamilyListRequest } from './types';

const STALE_TIME = 600000; //10분

export const useFamilyList = (params: FamilyListRequest) => {
  const familyData = useQuery({
    placeholderData: (previousData) => previousData,
    queryFn: () => getFamilyListClient(params),
    queryKey: ['adminFamilyList', params.page, params.size],
    select: (data) => ({
      ...data,
      familyList: data.familyList.map((item) => ({
        ...item,
        id: `${item.familyId}`,
      })),
    }),
    staleTime: STALE_TIME,
  });

  return {
    familyData: familyData.data,
    isFetching: familyData.isFetching,
    isLoading: familyData.isLoading,
  };
};

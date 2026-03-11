import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getPresentDataClient } from '../api/getPresentDataClient';
import { postPresentDataClient } from '../api/postPresentDataClient';
import type { PresentFamilyDataResponse, PresentFamilySubUsage } from '../api/types';
import type { PresentFamilyData, PresentSubUsage } from './types';

const STALE_TIME = 600000; //10분

export const useGift = () => {
  const familyData = useQuery({
    queryFn: getPresentDataClient,
    queryKey: ['presentFamilyData'],
    select: (data: PresentFamilyDataResponse): PresentFamilyData => {
      return {
        dataRemainAmount: data.selfDataRemainAmount,
        subId: data.selfSubId,
        subUsages: data.subUsages.map(
          (item: PresentFamilySubUsage): PresentSubUsage => ({
            dataUsagePercent: item.dataUsagePercent,
            subDataLimitAmount: item.subDataLimitAmount,
            subDataUsageAmount: item.subDataUsageAmount,
            subId: item.subId,
            subName: item.subName,
          }),
        ),
      };
    },
    staleTime: STALE_TIME,
  });

  const queryClient = useQueryClient();

  const presentData = useMutation({
    mutationFn: ({ targetSubId, dataAmount }: { targetSubId: number; dataAmount: number }) =>
      postPresentDataClient({ dataAmount, targetSubId }),
    onSuccess: (responseData) => {
      queryClient.setQueryData(['presentFamilyData'], (oldData: PresentFamilyData) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          dataRemainAmount: oldData.dataRemainAmount - responseData.data.dataAmount,
        };
      });
    },
  });

  return { familyData, presentData };
};

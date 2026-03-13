import { useModal } from '@hotspot/ui';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import type { ApiErrorResponse } from '@/shared/api/types';
import { getPresentDataClient } from '../api/getPresentDataClient';
import { postPresentDataClient } from '../api/postPresentDataClient';
import type { PresentFamilyDataResponse, PresentFamilySubUsage } from '../api/types';
import type { PresentFamilyData, PresentSubUsage } from './types';

const STALE_TIME = 600000; //10분

interface MutationContext {
  previousData?: PresentFamilyData;
}

export const useGift = () => {
  const { open } = useModal();

  const familyData = useQuery({
    queryFn: async () => {
      const data = await getPresentDataClient();
      return {
        dataRemainAmount: data.selfDataRemainAmount,
        subId: data.selfSubId,
        subUsages: data.subUsages.map((item) => ({
          dataUsagePercent: item.dataUsagePercent,
          subDataLimitAmount: item.subDataLimitAmount,
          subDataUsageAmount: item.subDataUsageAmount,
          subId: item.subId,
          subName: item.subName,
        })),
      } as PresentFamilyData;
    },
    queryKey: ['presentFamilyData'],
    staleTime: STALE_TIME,
  });

  const queryClient = useQueryClient();

  const presentData = useMutation<
    string,
    AxiosError<ApiErrorResponse>,
    { targetSubId: number; dataAmount: number },
    MutationContext
  >({
    mutationFn: ({ targetSubId, dataAmount }) => postPresentDataClient({ dataAmount, targetSubId }),
    onError: (error, _variables, context) => {
      console.log(error);
      if (context?.previousData) {
        queryClient.setQueryData(['presentFamilyData'], context.previousData);
      }
      const errorData = error.response?.data;
      const errorMessage = errorData?.message || '오류가 발생했습니다.';
      const errorCode = errorData?.code;
      open('errorModal', {
        props: {
          content: errorMessage,
          title: errorCode === 'PRESENT_004' ? '선물 한도 초과' : '오류',
        },
      });
    },
    onMutate: async (variables) => {
      await queryClient.cancelQueries({ queryKey: ['presentFamilyData'] });
      const previousData = queryClient.getQueryData<PresentFamilyData>(['presentFamilyData']);
      queryClient.setQueryData(['presentFamilyData'], (old: PresentFamilyData) => {
        if (!old || old.dataRemainAmount === -1) return old;
        return {
          ...old,
          dataRemainAmount: old.dataRemainAmount - variables.dataAmount,
        };
      });
      return { previousData };
    },
  });

  return { familyData, presentData };
};

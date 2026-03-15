import { useQuery } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import type { ApiErrorResponse } from '@/shared/api/types';
import { getFamilyDetailPolicyClient } from '../api/getFamilyDetailControlClient';

const STALE_TIME = 600000; //10분

export const useFamilyDetailControl = (familyId: number) => {
  const familyData = useQuery({
    placeholderData: (previousData) => previousData,
    queryFn: () => getFamilyDetailPolicyClient(familyId),
    queryKey: ['adminFamilyDatailControl', familyId],
    staleTime: STALE_TIME,
  });

  const axiosError = familyData.error as AxiosError<ApiErrorResponse>;
  const errorMessage =
    axiosError?.response?.data?.message ||
    '알 수 없는 에러가 발생했습니다. 나중에 다시 시도해주세요.';

  return {
    errorMessage,
    familyControlData: familyData.data,
    isError: familyData.isError,
    isLoading: familyData.isLoading,
  };
};

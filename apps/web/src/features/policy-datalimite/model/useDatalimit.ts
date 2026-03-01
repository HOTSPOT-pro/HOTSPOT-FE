import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getDatalimitClientApi } from '../api/getDatalimitClientApi';
import { patchDatalimitClientApi } from '../api/patchDatalimitClientApi';
import type { GetDatalimitResponse } from '../api/types';
import type { Datalimit, UpdateDatalimit } from './types';

interface useDatalimitProps {
  subId: number;
  familyId: number;
}

export const useDatalimit = ({ subId, familyId }: useDatalimitProps) => {
  const queryClient = useQueryClient();
  const { data, isPending } = useQuery<GetDatalimitResponse, Error, Datalimit>({
    enabled: Boolean(subId),
    queryFn: () => getDatalimitClientApi(subId),
    queryKey: ['datalimit', subId],
    select: (serverData): Datalimit => ({
      dataLimit: serverData.dataLimit,
      familyDataAmount: serverData.familyDataAmount,
      isLocked: serverData.isLocked,
      name: serverData.name,
      subId: subId,
    }),
  });

  const updateLockStatus = useMutation({
    mutationFn: (updates: UpdateDatalimit) =>
      patchDatalimitClientApi({
        familyId,
        subId,
        ...updates,
      }),
    onError: (error) => {
      console.error('데이터 제한 수정 실패:', error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['datalimit', subId],
      });
    },
  });

  return {
    datalimit: data,
    loading: isPending,
    updateLockStatus,
  };
};

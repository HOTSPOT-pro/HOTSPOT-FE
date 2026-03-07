import { useMutation, useQueryClient } from '@tanstack/react-query';
import { patchFamilyOrderClientApi } from '../api/patchFamilyOrderClient';
import type { MemberOrderItem } from '../model/types';

interface UseUpdateFamilyPriorityParams {
  familyId: number;
}

export const useFamilyOrder = ({ familyId }: UseUpdateFamilyPriorityParams) => {
  const queryClient = useQueryClient();

  const updatePriority = useMutation({
    mutationFn: ({
      priorityType,
      memberPriorities,
    }: {
      priorityType: 'FIFO' | 'PRIORITY';
      memberPriorities: MemberOrderItem[];
    }) => {
      return patchFamilyOrderClientApi({
        familyId,
        memberPriorities,
        priorityType,
      });
    },
    onError: (error) => {
      console.error('우선순위 수정 실패:', error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['adminFamilyDatailControl', familyId],
        refetchType: 'active',
      });
    },
  });

  return {
    updatePriority,
  };
};

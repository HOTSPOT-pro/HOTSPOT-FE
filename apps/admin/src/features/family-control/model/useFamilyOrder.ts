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
      // 해당 가족의 상세 데이터나 정책 관련 쿼리 무효화
      queryClient.invalidateQueries({
        queryKey: ['adminFamilyDetailPolicy', familyId], // 기존 패턴 유지
        refetchType: 'active',
      });
      // 우선순위와 관련된 다른 쿼리가 있다면 추가
      queryClient.invalidateQueries({
        queryKey: ['adminMemberControl', familyId],
        refetchType: 'active',
      });
    },
  });

  return {
    updatePriority,
  };
};

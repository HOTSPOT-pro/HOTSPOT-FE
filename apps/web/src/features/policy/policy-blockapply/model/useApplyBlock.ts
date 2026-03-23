import { useMutation, useQueryClient } from '@tanstack/react-query';
import { POLICY_KEYS } from '@/shared/constants/queryKey';
import { patchBlockApplyClientApi } from '../api/putBlockApplyClientApi';
import type { BlockApply } from './types';

interface useApplyPolicyParams {
  subId: number;
  familyId: number;
}

export const useApplyBlock = ({ subId, familyId }: useApplyPolicyParams) => {
  const queryClient = useQueryClient();
  const updateBlock = useMutation({
    mutationFn: (updates: BlockApply) => {
      return patchBlockApplyClientApi({
        blockServiceIdList: updates.blockedServiceIdList,
        familyId,
        subId,
      });
    },
    onError: (error) => {
      console.error('적용 정책 수정 실패:', error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: POLICY_KEYS.perFamily,
        refetchType: 'all',
      });
      queryClient.invalidateQueries({
        queryKey: POLICY_KEYS.currentBlock,
        refetchType: 'all',
      });
    },
  });

  return {
    updateBlock,
  };
};

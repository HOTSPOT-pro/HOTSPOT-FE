import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deletePolicy as deletePolicyApi } from '../api/deletePolicy'; // 이름 중복 방지
import type { DeletePolicyRequest } from '../model/types';

export const useDeletePolicy = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: ({ policyType, policyId }: DeletePolicyRequest) =>
      deletePolicyApi({ policyId, policyType }),

    onError: (error) => console.error('정책 삭제 실패:', error),

    onSuccess: (_, variables) => {
      if (variables.policyType === 'TIME') {
        queryClient.invalidateQueries({
          queryKey: ['adminPolicy'],
          refetchType: 'active',
        });
      } else if (variables.policyType === 'APP') {
        queryClient.invalidateQueries({
          queryKey: ['adminBlock'],
          refetchType: 'active',
        });
      }
    },
  });

  return { deletePolicy: mutation.mutate, isDeleting: mutation.isPending };
};

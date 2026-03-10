import { useMutation, useQueryClient } from '@tanstack/react-query';
import { patchFamilyCustomPolicyClinet } from '../api/patchFamilyPolicyClient';
import type { PostFamilyCustomPolicy } from '../model/types';

interface UpdateProps {
  blockPolicyId: number;
  request: PostFamilyCustomPolicy;
}

export const useEditFamilyPolicy = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ blockPolicyId, request }: UpdateProps) =>
      patchFamilyCustomPolicyClinet({ blockPolicyId, request }),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['familyPolicy'] });
    },
  });
};

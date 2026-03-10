import { useMutation, useQueryClient } from '@tanstack/react-query';
import { patchFamilyCustomPolicyClient } from '../api/patchFamilyPolicyClient';
import type { PostFamilyCustomPolicy } from '../model/types';

interface UpdateProps {
  blockPolicyId: number;
  request: PostFamilyCustomPolicy;
}

export const useEditFamilyPolicy = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ blockPolicyId, request }: UpdateProps) =>
      patchFamilyCustomPolicyClient({ blockPolicyId, request }),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['familyPolicy'] });
      queryClient.invalidateQueries({ queryKey: ['policyPerFamily'] });
    },
  });
};

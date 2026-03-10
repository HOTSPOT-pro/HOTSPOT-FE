import { useMutation, useQueryClient } from '@tanstack/react-query';
import { delelteFamilyPolicyClient } from '../api/deleteFamilyPolicyClient';

export const useDeleteFamilyPolicy = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (deleteId: number) => delelteFamilyPolicyClient(deleteId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['familyPolicy'] });
    },
  });
};

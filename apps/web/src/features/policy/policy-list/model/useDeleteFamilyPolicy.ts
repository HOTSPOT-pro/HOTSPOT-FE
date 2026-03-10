import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteFamilyPolicyClient } from '../api/deleteFamilyPolicyClient';

export const useDeleteFamilyPolicy = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (deleteId: number) => deleteFamilyPolicyClient(deleteId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['familyPolicy'] });
      queryClient.invalidateQueries({ queryKey: ['policyPerFamily'] });
    },
  });
};

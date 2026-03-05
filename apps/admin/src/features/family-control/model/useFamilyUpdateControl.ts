import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/shared/api/client';

// useUpdateMemberControl.ts
export const useFamilyUpdateControl = ({ familyId }: { familyId: number }) => {
  const queryClient = useQueryClient();
  const updateMember = useMutation({
    mutationFn: ({
      subId,
      data,
    }: {
      subId: number;
      data: { dataLimitGb: number; isBlocked: boolean; isParent?: boolean };
    }) => {
      return api.patch(`/api/v1/admin/families/${familyId}/members/${subId}/control-status`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminFamilyDatailControl', familyId] });
    },
  });

  return { updateMember };
};

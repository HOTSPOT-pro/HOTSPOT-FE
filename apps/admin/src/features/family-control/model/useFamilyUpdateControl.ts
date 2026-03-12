import { useMutation, useQueryClient } from '@tanstack/react-query';
import { patchFamilyControlClientApi } from '../api/patchFamilyControlClient';
import type { PatchControlRequest } from './types';

export const useFamilyUpdateControl = ({ familyId }: { familyId: number }) => {
  const queryClient = useQueryClient();
  const updateMember = useMutation({
    mutationFn: ({ subId, body }: PatchControlRequest) =>
      patchFamilyControlClientApi({ body, familyId, subId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminFamilyDatailControl', familyId] });
    },
  });

  return { updateMember };
};

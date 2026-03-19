import { api } from '@/shared/api/client';
import type { PatchOrderRequest } from '../model/types';

export const patchFamilyOrderClientApi = async ({
  familyId,
  priorityType,
  memberPriorities,
}: PatchOrderRequest) => {
  const { data } = await api.patch(`/api/v1/admin/families/${familyId}/priority`, {
    memberPriorities,
    priorityType,
  });
  return data.data;
};

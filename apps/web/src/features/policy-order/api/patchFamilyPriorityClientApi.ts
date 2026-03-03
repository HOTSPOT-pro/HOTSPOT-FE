import { api } from '@/shared/api/client';
import type { FamilyPriorityRequest } from './type';

export const patchPriorityFifoClientApi = async (familyId: number) => {
  const { data } = await api.patch(`/api/v1/families/priority`, {
    familyId,
    priorityType: 'FIFO',
  });
  return data.data;
};

export const patchPriorityPriorityClientApi = async (request: FamilyPriorityRequest) => {
  const { data } = await api.patch(`/api/v1/families/priority`, {
    familyId: request.familyId,
    memberPriorities: request.memberPriorities,
    priorityType: 'PRIORITY',
  });
  return data.data;
};

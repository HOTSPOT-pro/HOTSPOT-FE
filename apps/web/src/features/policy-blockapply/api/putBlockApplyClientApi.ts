import { api } from '@/shared/api/client';
import type { PutBlockApplyRequest } from './types';

export const patchBlockApplyClientApi = async (request: PutBlockApplyRequest) => {
  const { data } = await api.patch(`/api/v1/blocking`, {
    blockedServiceIdList: request.blockServiceIdList,
    familyId: request.familyId,
    subId: request.subId,
  });
  return data.data;
};

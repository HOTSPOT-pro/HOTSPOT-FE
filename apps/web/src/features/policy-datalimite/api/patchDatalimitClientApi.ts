import { api } from '@/shared/api/client';
import type { PatchDatalimitRequest } from './types';

export const patchDatalimitClientApi = async (request: PatchDatalimitRequest) => {
  const { data } = await api.patch(`/api/v1/families/data-limit`, {
    dataLimit: request.dataLimit,
    familyId: request.familyId,
    isLocked: request.isLocked,
    subId: request.subId,
  });
  return data.data;
};

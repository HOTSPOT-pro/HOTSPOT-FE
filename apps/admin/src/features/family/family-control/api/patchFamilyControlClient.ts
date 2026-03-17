import { api } from '@/shared/api/client';
import type { PatchControlRequest } from '../model/types';

export const patchFamilyControlClientApi = async ({
  familyId,
  subId,
  body,
}: PatchControlRequest) => {
  const { data } = await api.patch(
    `/api/v1/admin/families/${familyId}/members/${subId}/control-status`,
    body,
  );
  return data.data;
};

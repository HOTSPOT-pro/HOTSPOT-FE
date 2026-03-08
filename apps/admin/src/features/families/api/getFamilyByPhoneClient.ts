import type { FamilyList } from '@/domains/family';
import { api } from '@/shared/api/client';
import type { ApiResponse } from '@/shared/api/types';

export const getFamilyByPhoneClient = async (phone: string) => {
  const { data } = await api.get<ApiResponse<FamilyList>>(
    `api/v1/admin/families/search/phone?phoneNumber=${encodeURIComponent(phone)}`,
  );
  return data.data;
};

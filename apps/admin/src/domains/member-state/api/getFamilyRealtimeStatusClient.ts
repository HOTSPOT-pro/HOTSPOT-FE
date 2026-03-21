import { api } from '@/shared/api/client';
import type { ApiResponse } from '@/shared/api/types';
import type { FamilyRealtimeStatus, FamilyUsageStatus, MemberUsageStatus } from '../model/types';

const getFamilyUsageStatus = async (familyId: number) => {
  const { data } = await api.get<ApiResponse<FamilyUsageStatus>>(
    `/api/v1/admin/familyUsage/${familyId}`,
  );
  return data.data;
};

const getMemberUsageStatus = async (familyId: number) => {
  const { data } = await api.get<ApiResponse<MemberUsageStatus[]>>(
    `/api/v1/admin/subscriptionUsage/${familyId}`,
  );
  return data.data;
};

export const getFamilyRealtimeStatusClient = async (
  familyId: number,
): Promise<FamilyRealtimeStatus> => {
  const [familyUsage, members] = await Promise.all([
    getFamilyUsageStatus(familyId),
    getMemberUsageStatus(familyId),
  ]);

  return {
    familyUsage,
    members,
  };
};

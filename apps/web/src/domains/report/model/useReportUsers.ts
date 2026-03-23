import { useQuery } from '@tanstack/react-query';
import { REPORT_KEYS } from '@/shared/constants/queryKey';
import { getUserData } from '../api/getUserData';
import type { ReportFamilyResponse } from '../api/types';
import type { ReportUser } from './type';

export const useReportUsers = () => {
  return useQuery<ReportFamilyResponse[], Error, ReportUser[]>({
    queryFn: getUserData,
    queryKey: REPORT_KEYS.user,
    select: (data) =>
      data.map((u) => ({
        name: u.subName,
        subId: u.subId,
      })),
  });
};

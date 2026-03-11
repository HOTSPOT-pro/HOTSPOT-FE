import { useQuery } from '@tanstack/react-query';
import { getUserData } from '../api/getUserData';
import type { ReportFamilyResponse } from '../api/types';
import type { ReportUser } from './type';

export const useReportUsers = () => {
  return useQuery<ReportFamilyResponse[], Error, ReportUser[]>({
    queryFn: getUserData,
    queryKey: ['reportUsers'],
    select: (data) =>
      data.map((u) => ({
        name: u.subName,
        subId: u.subId,
      })),
  });
};

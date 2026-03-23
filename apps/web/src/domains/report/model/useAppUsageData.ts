import { useQuery } from '@tanstack/react-query';
import { REPORT_KEYS } from '@/shared/constants/queryKey';
import { STALE_TIME } from '@/shared/constants/time';
import { formatDate } from '@/shared/lib';
import { getServiceDailyUsage } from '../api/getServiceDailyUsage';
import { getServiceMonthlyUsage } from '../api/getServiceMonthlyUsage';
import type { MemberAppUsage, ReportRange } from './type';

interface UseUsageReportProps {
  userId: number | null;
  range: ReportRange;
}

export const useAppUsageData = ({
  userId,
  range,
  userName,
}: UseUsageReportProps & { userName?: string }) => {
  return useQuery<MemberAppUsage>({
    enabled: Boolean(userName),
    queryFn: async () => {
      const targetId = userId === null || userId === -1 ? -1 : userId;
      const res =
        range.unit === 'MONTH'
          ? await getServiceMonthlyUsage(targetId)
          : await getServiceDailyUsage({ date: formatDate(range.date), targetSubId: targetId });

      return {
        memberId: userId ?? -1,
        name: userName ?? '전체',
        total: res.appUsages.reduce((acc, cur) => acc + cur.appDataUsageAmount, 0),
        usage: res.appUsages.map((app) => ({
          appName: app.appName,
          usage: app.appDataUsageAmount,
        })),
      };
    },
    queryKey: REPORT_KEYS.service(range.unit, range.date, userId),
    staleTime: STALE_TIME.STATIC,
  });
};

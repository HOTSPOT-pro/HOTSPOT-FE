import type { LineChartDataProps } from '@hotspot/ui';
import { useQuery } from '@tanstack/react-query';
import { REPORT_KEYS } from '@/shared/constants/queryKey';
import { STALE_TIME } from '@/shared/constants/time';
import { formatYearMonth } from '@/shared/lib';
import { getFamilyDailyUsage } from '../api/getFamilyDailyUsage';
import { getFamilyMonthlyUsage } from '../api/getFamilyMonthlyUsage';
import { transformDailyData, transformMonthlyData } from '../lib/transformReportData';
import type { ReportRange } from './type';

interface UseUsageReportProps {
  userId: number | null;
  range: ReportRange;
}

export const useFamilyChartData = ({ userId, range }: UseUsageReportProps) => {
  const targetId = userId === null || userId === -1 ? null : userId;

  return useQuery<LineChartDataProps[]>({
    queryFn: async () => {
      // 월간 데이터
      if (range.unit === 'MONTH') {
        const res = await getFamilyMonthlyUsage(targetId);
        return transformMonthlyData(res.subUsages, targetId);
      }
      // 일간 데이터
      const res = await getFamilyDailyUsage({
        month: formatYearMonth(range.date),
        targetSubId: targetId ?? undefined,
      });
      return transformDailyData(res.subUsages, targetId);
    },
    queryKey: REPORT_KEYS.usage(range.unit, range.date, userId),
    staleTime: STALE_TIME.STATIC,
  });
};

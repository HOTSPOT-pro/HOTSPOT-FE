import type { ReportRange } from './type';
import { useAppUsageData } from './useAppUsageData';
import { useFamilyChartData } from './useFamilyChartData';
import { useReportUsers } from './useReportUsers';

interface UseUsageReportProps {
  userId: number | null;
  range: ReportRange;
}

export const useUsageReport = ({ userId, range }: UseUsageReportProps) => {
  const { data: users } = useReportUsers();
  const currentUserName = users?.find((u) => u.subId === userId)?.name;

  const { data: chartData, isLoading: isChartLoading } = useFamilyChartData({ range, userId });
  const { data: appUsageData, isLoading: isAppLoading } = useAppUsageData({
    range,
    userId,
    userName: currentUserName,
  });

  return {
    appUsageData: appUsageData ?? { memberId: -1, name: '전체', total: 0, usage: [] },
    chartData: {
      data: chartData ?? [],
      personalName: userId === -1 || userId === null ? null : currentUserName,
      type: range.unit,
      unit: range.unit === 'MONTH' ? '월' : '일',
    },
    isLoading: isChartLoading || isAppLoading,
    users,
  };
};

'use client';
import { useMemo } from 'react';
import { getChartData } from '../lib/ChartDataMapper';
import { APP_USAGE_DATA, REPORT_USERS, TOTAL_USAGE, USAGE_DATA_BY_USER } from './Mockup';

interface UseUsageReportProps {
  userId: string;
  year: number;
  month: number;
}

//year, month는 api 연결하며 사용됨
export const useUsageReport = ({ userId, year, month }: UseUsageReportProps) => {
  // const { data } = useQuery({ queryKey: ['usage', year, month, userId], queryFn: ... });

  const result = useMemo(() => {
    // 차트용 개인 데이터
    const personalData =
      userId === 'all' ? new Array(TOTAL_USAGE.length).fill(0) : USAGE_DATA_BY_USER[userId] || [];
    // 차트 최종 데이터
    const chartData = getChartData(TOTAL_USAGE, personalData);

    // 앱별 상세 사용량
    const appUsageData = APP_USAGE_DATA[userId] || [];

    return {
      appUsageData,
      chartData,
      isLoading: false,
      users: REPORT_USERS,
    };
  }, [userId]);

  return result;
};

'use client';
import type { LineChartDataProps } from '@hotspot/ui';
import { useQuery } from '@tanstack/react-query';
import { getFamilyDailyUsage } from '../api/getFamilyDailyUsage'; // 추가 가정
import { getFamilyMonthlyUsage } from '../api/getFamilyMonthlyUsage';
import { getServiceDailyUsage } from '../api/getServiceDailyUsage'; // 추가 가정
import { getServiceMonthlyUsage } from '../api/getServiceMonthlyUsage';
import { getUserData } from '../api/getUserData';
import type { DailyUsageResponse, MonthlyUsageResponse } from '../api/types';
import type { MemberAppUsage, ReportRange } from './type';

interface UseUsageReportProps {
  userId: number | null;
  range: ReportRange;
}

export const useUsageReport = ({ userId, range }: UseUsageReportProps) => {
  // 유저 목록
  const users = useQuery({
    queryFn: getUserData,
    queryKey: ['reportUsers'],
    select: (data) => [
      { name: '전체', subId: null },
      ...data.map((u) => ({ name: u.subName, subId: u.subId })),
    ],
  });

  // 차트 데이터
  const { data: chartData = [], isLoading: isChartLoading } = useQuery<LineChartDataProps[]>({
    queryFn: async () => {
      const targetId = userId === null || userId === -1 ? null : userId;
      // 월간 데이터 호출
      if (range.unit === 'MONTH') {
        const res = await getFamilyMonthlyUsage(targetId);
        const { subUsages } = res;
        const totalData = subUsages.find((s) => s.subId === -1);
        const personalData = targetId ? subUsages.find((s) => s.subId === targetId) : null;

        if (!totalData) return [];

        return totalData.dataUsageMonths.map((item, index) => {
          const totalUsage = item.usageAmount;
          const personalUsage = personalData?.dataUsageMonths[index]?.usageAmount ?? 0;
          return {
            date: Number(item.usageMonth.split('-')[1]),
            total: totalUsage,
            totalRatio: Math.min(Math.ceil((totalUsage / 10) * 100), 100),
            ...(personalData && {
              personal: personalUsage,
              personalRatio: Math.min(Math.ceil((personalUsage / 10) * 100), 100),
            }),
          };
        });
      } else {
        // 일간 데이터 호출
        const res = await getFamilyDailyUsage({
          month: `${range.year}-${String(range.month).padStart(2, '0')}`,
          targetSubId: targetId ?? undefined,
        });
        const { subUsages } = res;
        const totalData = subUsages.find((s) => s.subId === -1);
        const personalData = targetId ? subUsages.find((s) => s.subId === targetId) : null;

        if (!totalData) return [];

        return totalData.dataUsageDays.map((item, index) => {
          const totalUsage = item.usageDayAmount;
          const personalUsage = personalData?.dataUsageDays[index]?.usageDayAmount ?? 0;
          return {
            date: Number(item.usageDate.split('-')[2]),
            total: totalUsage,
            totalRatio: Math.min(Math.ceil((totalUsage / 10) * 100), 100),
            ...(personalData && {
              personal: personalUsage,
              personalRatio: Math.min(Math.ceil((personalUsage / 10) * 100), 100),
            }),
          };
        });
      }
    },
    queryKey: ['familyUsage', range.unit, range.year, range.month, userId],
  });

  // 앱 사용량 데이터
  const { data: appUsageData, isLoading: isAppLoading } = useQuery<MemberAppUsage>({
    queryFn: async () => {
      const targetId = userId === null || userId === -1 ? -1 : userId;
      const res =
        range.unit === 'MONTH'
          ? await getServiceMonthlyUsage(targetId)
          : await getServiceDailyUsage(targetId);

      const currentUserName = users.data?.find((u) => u.subId === userId)?.name ?? '전체';

      return {
        memberId: userId ?? -1,
        name: userId === -1 || userId === null ? '전체' : currentUserName,
        total: res.appUsages.reduce((acc, cur) => acc + cur.appDataUsageAmount, 0),
        usage: res.appUsages.map((app) => ({
          appName: app.appName,
          usage: app.appDataUsageAmount,
        })),
      };
    },
    queryKey: ['serviceUsage', range.unit, userId],
  });

  return {
    appUsageData: appUsageData ?? { memberId: -1, name: '전체', total: 0, usage: [] },
    chartData: {
      data: chartData,
      personalName:
        userId === -1 || userId === null ? null : users.data?.find((u) => u.subId === userId)?.name,
      type: range.unit,
      unit: range.unit === 'MONTH' ? '월' : '일',
    },
    isAppLoading,
    isChartLoading,
    users: users.data,
  };
};

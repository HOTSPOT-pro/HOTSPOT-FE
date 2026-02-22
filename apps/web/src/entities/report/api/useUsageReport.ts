'use client';
import { useMemo } from 'react';
import type {
  AppUsageResponse,
  MemberAppUsage,
  MemberUsage,
  ReportRange,
  ReportUser,
  UsageDetail,
  UsageResponse,
} from '../model/type';
import { MOCK_APP_USAGE_DATA, MOCK_DAILY_USAGE, MOCK_MONTHLY_USAGE } from './mockup';

interface UseUsageReportProps {
  userId: number | null;
  range: ReportRange;
}

export const useUsageReport = ({ userId, range }: UseUsageReportProps) => {
  const usageDailyData: UsageResponse = MOCK_DAILY_USAGE;
  const usageMonthlyData: UsageResponse = MOCK_MONTHLY_USAGE;
  const appData: AppUsageResponse = MOCK_APP_USAGE_DATA;

  const result = useMemo(() => {
    const { detail } = range.unit === 'MONTH' ? usageMonthlyData : usageDailyData;
    const appDetail = appData.detail;

    const chartData = detail.map((item: UsageDetail) => {
      const member = userId !== null ? item.memberUsages.find((m) => m.memberId === userId) : null;
      const dateParts = item.date.split('-');
      const formattedDate = range.unit === 'MONTH' ? Number(dateParts[1]) : Number(dateParts[2]);

      return {
        date: formattedDate,
        personal: member ? member.usage : 0,
        personalRatio: member ? Math.ceil((member.usage / member.limit) * 10000) / 100 : 0,
        total: item.totalUsage,
        totalRatio: Math.ceil((item.totalUsage / item.totalLimit) * 10000) / 100,
      };
    });

    const users: ReportUser[] = [
      { id: null, name: null },
      ...(detail[0]?.memberUsages.map((m: MemberUsage) => ({
        id: m.memberId,
        name: m.name,
      })) || []),
    ];

    const foundMember = appDetail.personal.find((p) => p.memberId === userId);
    const appUsageData: MemberAppUsage =
      userId === null
        ? {
            memberId: null,
            name: '전체',
            total: appDetail.total.total,
            usage: appDetail.total.usage,
          }
        : (foundMember ?? { memberId: userId, name: '', total: 0, usage: [] });

    return {
      appUsageData,
      chartData,
      isLoading: false,
      users,
    };
  }, [userId, range]);

  return result;
};

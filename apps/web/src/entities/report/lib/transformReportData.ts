// src/features/report/lib/transformData.ts (추천 위치)

import type { LineChartDataProps } from '@hotspot/ui';
import type { MonthlyUsageResponse } from '../api/types';

const DATA_SCALE_FACTOR = 10;
const MAX_RATIO = 100;

export const transformMonthlyData = (
  subUsages: MonthlyUsageResponse['subUsages'],
  targetId: number | null,
): LineChartDataProps[] => {
  const totalData = subUsages.find((s) => s.subId === -1);
  const personalData = targetId ? subUsages.find((s) => s.subId === targetId) : null;

  if (!totalData) return [];

  return totalData.dataUsageMonths.map((item, index) => {
    const totalUsage = item.usageAmount;
    const personalUsage = personalData?.dataUsageMonths[index]?.usageAmount ?? 0;

    return {
      date: Number(item.usageMonth.split('-')[1]), // "2026-03" -> 3
      total: totalUsage,
      totalRatio: Math.min(Math.ceil((totalUsage / DATA_SCALE_FACTOR) * MAX_RATIO), MAX_RATIO),
      ...(personalData && {
        personal: personalUsage,
        personalRatio: Math.min(
          Math.ceil((personalUsage / DATA_SCALE_FACTOR) * MAX_RATIO),
          MAX_RATIO,
        ),
      }),
    };
  });
};

import type { DailyUsageResponse } from '../api/types';

export const transformDailyData = (
  subUsages: DailyUsageResponse['subUsages'],
  targetId: number | null,
): LineChartDataProps[] => {
  const totalData = subUsages.find((s) => s.subId === -1);
  const personalData = targetId ? subUsages.find((s) => s.subId === targetId) : null;

  if (!totalData) return [];

  return totalData.dataUsageDays.map((item, index) => {
    const totalUsage = item.usageDayAmount;
    const personalUsage = personalData?.dataUsageDays[index]?.usageDayAmount ?? 0;

    return {
      date: Number(item.usageDate.split('-')[2]),
      total: totalUsage,
      totalRatio: Math.min(Math.ceil((totalUsage / DATA_SCALE_FACTOR) * MAX_RATIO), MAX_RATIO),
      ...(personalData && {
        personal: personalUsage,
        personalRatio: Math.min(
          Math.ceil((personalUsage / DATA_SCALE_FACTOR) * MAX_RATIO),
          MAX_RATIO,
        ),
      }),
    };
  });
};

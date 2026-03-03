'use client';

import { DonutChart, ProgressBar } from '@hotspot/ui';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { RefreshButton } from '@/features/refresh/ui/RefreshButton';
import { api } from '@/shared/api/client';
import type { ApiResponse } from '@/shared/api/types';

interface SubUsage {
  subId: number;
  subName: string;
  dataLimit: number;
  dataUsageAmount: number;
  dataUsageRemainAmount: number;
  dataUsagePercent: number;
}

interface FamilyUsage {
  currentTime: string;
  familyDataAmount: number;
  familyDataUsageAmount: number;
  familyDataRemainAmount: number;
  dataUsagePercent: number;
  subUsages: SubUsage[];
}

const START_COLOR = '#4F46E5';
const END_COLOR = '#D9C9FF';
const REMAINING_COLOR = '#E5E7EB';

const interpolateColor = (factor: number) => {
  const clamped = Math.min(1, Math.max(0, factor));
  const start = Number.parseInt(START_COLOR.slice(1), 16);
  const end = Number.parseInt(END_COLOR.slice(1), 16);

  const sr = (start >> 16) & 255;
  const sg = (start >> 8) & 255;
  const sb = start & 255;
  const er = (end >> 16) & 255;
  const eg = (end >> 8) & 255;
  const eb = end & 255;

  const r = Math.round(sr + (er - sr) * clamped);
  const g = Math.round(sg + (eg - sg) * clamped);
  const b = Math.round(sb + (eb - sb) * clamped);

  return `rgb(${r}, ${g}, ${b})`;
};

const getFamilyUsage = async () => {
  const { data } = await api.get<ApiResponse<FamilyUsage>>('/api/v1/familyUsage');
  return data.data;
};

const formatCurrentTime = (currentTime: string) => {
  const parsedDate = new Date(currentTime);

  if (Number.isNaN(parsedDate.getTime())) {
    return '-';
  }

  return new Intl.DateTimeFormat('ko-KR', {
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    month: '2-digit',
  }).format(parsedDate);
};

export const FamilyDataStatusPage = () => {
  const { data, isError, isFetching, isPending, refetch } = useQuery({
    queryFn: getFamilyUsage,
    queryKey: ['familyUsage'],
  });

  const coloredSubUsages = useMemo(
    () =>
      data?.subUsages.map((subUsage, index, list) => ({
        ...subUsage,
        color: interpolateColor(list.length > 1 ? index / (list.length - 1) : 0),
      })) ?? [],
    [data],
  );

  const donutData = useMemo(
    () => [
      {
        fill: REMAINING_COLOR,
        name: '잔여량',
        value: Math.max(0, (data?.familyDataAmount ?? 0) - (data?.familyDataUsageAmount ?? 0)),
      },
      ...coloredSubUsages.map((subUsage) => ({
        fill: subUsage.color,
        name: subUsage.subName,
        value: subUsage.dataUsageAmount,
      })),
    ],
    [coloredSubUsages, data?.familyDataAmount, data?.familyDataUsageAmount],
  );

  if (isPending) {
    return (
      <div className="flex flex-col w-full h-fit rounded-[0.75rem] p-4 gap-4 shadow-[0_0_4px_rgba(0,0,0,0.1)]">
        <h2 className="text-lg font-semibold">가족 데이터 현황</h2>
        <p className="text-sm text-gray-500">가족 데이터 정보를 불러오는 중입니다.</p>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="flex flex-col w-full h-fit rounded-[0.75rem] p-4 gap-4 shadow-[0_0_4px_rgba(0,0,0,0.1)]">
        <h2 className="text-lg font-semibold">가족 데이터 현황</h2>
        <p className="text-sm text-red-500">가족 데이터 정보를 불러오지 못했습니다.</p>
        <button
          className="w-fit rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-700"
          onClick={() => void refetch()}
          type="button"
        >
          다시 시도
        </button>
      </div>
    );
  }

  return (
    <section className="flex flex-col w-full h-fit rounded-[0.75rem] p-4 gap-4 shadow-[0_0_4px_rgba(0,0,0,0.1)]">
      <h2 className="text-lg font-semibold">가족 데이터 현황</h2>
      <div className="flex w-full justify-center items-center">
        <div className="flex w-full max-w-70">
          <DonutChart
            data={donutData}
            total={data.familyDataAmount}
            totalUsed={data.familyDataUsageAmount}
            totalUsedLabel="총 사용"
          />
        </div>
      </div>
      <div className="h-px bg-gray-200" />

      <div className="space-y-3">
        {coloredSubUsages.map((subUsage) => (
          <div className="space-y-0" key={subUsage.subId}>
            <div className="flex items-center justify-between text-sm">
              <div className="flex flex-row items-center gap-2">
                <div
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: subUsage.color }}
                />
                <span className="text-gray-700">{subUsage.subName}</span>
              </div>
              <span className="text-gray-900">
                {subUsage.dataUsageAmount.toFixed(1)}GB / {subUsage.dataLimit.toFixed(1)}GB (
                {subUsage.dataUsagePercent}%)
              </span>
            </div>
            <ProgressBar
              label={subUsage.subName}
              total={Math.max(subUsage.dataLimit, 1)}
              value={subUsage.dataUsageAmount}
            />
          </div>
        ))}
      </div>

      <div className="flex items-center justify-end gap-2 text-xs text-gray-500">
        <time>{formatCurrentTime(data.currentTime)} 기준</time>
        <div className="flex items-center gap-1">
          {isFetching ? <span>갱신 중</span> : null}
          <RefreshButton onRefresh={() => void refetch()} />
        </div>
      </div>
    </section>
  );
};

'use client';

import { DonutChartContainer } from '@hotspot/ui';
import { useQuery } from '@tanstack/react-query';
import { RefreshButton } from '@/features/refresh/ui/RefreshButton';
import { api } from '@/shared/api/client';
import type { ApiResponse } from '@/shared/api/types';

interface SubscriptionUsage {
  currentTime: string;
  subDataAmount: number;
  subDataUsageAmount: number;
  subDataRemainAmount: number;
  dataUsagePercent: number;
}

const getSubscriptionUsage = async () => {
  const { data } = await api.get<ApiResponse<SubscriptionUsage>>('/api/v1/subscriptionUsage');
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

export const MyDataStatusPage = () => {
  const { data, isError, isFetching, isPending, refetch } = useQuery({
    queryFn: getSubscriptionUsage,
    queryKey: ['subscriptionUsage', 'myDataStatus'],
  });

  if (isPending) {
    return (
      <div className="flex flex-col w-full h-fit rounded-[0.75rem] p-4 gap-4 shadow-[0_0_4px_rgba(0,0,0,0.1)]">
        <h2 className="text-lg font-semibold">내 요금제 데이터</h2>
        <p className="text-sm text-gray-500">내 요금제 데이터를 불러오는 중입니다.</p>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="flex flex-col w-full h-fit rounded-[0.75rem] p-4 gap-4 shadow-[0_0_4px_rgba(0,0,0,0.1)]">
        <h2 className="text-lg font-semibold">내 요금제 데이터</h2>
        <p className="text-sm text-red-500">내 요금제 데이터를 불러오지 못했습니다.</p>
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
      <h2 className="text-lg font-semibold">내 요금제 데이터</h2>

      <DonutChartContainer
        data={[{ name: '사용량', value: data.subDataUsageAmount }]}
        total={Math.max(data.subDataAmount, 0)}
        totalUsedLabel="사용량"
      />

      <div className="h-px bg-gray-200" />

      <div className="flex items-center justify-between text-sm">
        <span className="font-semibold text-gray-600">전체</span>
        <span className="font-semibold text-gray-900">{data.subDataAmount.toFixed(1)}GB</span>
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

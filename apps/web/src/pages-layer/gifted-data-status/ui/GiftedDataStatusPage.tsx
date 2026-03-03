'use client';

import { useQuery } from '@tanstack/react-query';
import { RefreshButton } from '@/features/refresh/ui/RefreshButton';
import { api } from '@/shared/api/client';
import type { ApiResponse } from '@/shared/api/types';

interface GiftUsage {
  giftId: number;
  giftUserName: string;
  giftDataLimit: number;
  giftDataUsageAmount: number;
  giftDataUsageRemainAmount: number;
  dataUsagePercent: number;
}

interface GiftedDataStatus {
  currentTime: string;
  giftDataAmount: number;
  giftDataUsageAmount: number;
  giftDataRemainAmount: number;
  giftUsagePercent: number;
  giftUsages: GiftUsage[];
}

const getGiftedDataStatus = async () => {
  const { data } = await api.get<ApiResponse<GiftedDataStatus>>('/api/v1/subscriptionUsage');
  return data.data;
};

const formatData = (value: number) => `${value.toFixed(1)}GB`;

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
    year: 'numeric',
  })
    .format(parsedDate)
    .replace(/\.\s?/g, '.')
    .replace(',', '');
};

export const GiftedDataStatusPage = () => {
  const { data, isError, isFetching, isPending, refetch } = useQuery({
    queryFn: getGiftedDataStatus,
    queryKey: ['giftedDataStatus'],
  });

  if (isPending) {
    return (
      <div className="flex flex-col w-full h-fit rounded-[0.75rem] p-4 gap-4 shadow-[0_0_4px_rgba(0,0,0,0.1)]">
        <h2 className="text-lg font-semibold">선물받은 데이터</h2>
        <p className="text-sm text-gray-500">선물 데이터 정보를 불러오는 중입니다.</p>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="flex flex-col w-full h-fit rounded-[0.75rem] p-4 gap-4 shadow-[0_0_4px_rgba(0,0,0,0.1)]">
        <h2 className="text-lg font-semibold">선물받은 데이터</h2>
        <p className="text-sm text-red-500">선물 데이터 정보를 불러오지 못했습니다.</p>
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
      <div className="space-y-1">
        <h2 className="text-lg font-semibold">선물받은 데이터</h2>
        <p className="text-base text-gray-500">가족 구성원으로부터 선물받은 데이터</p>
      </div>

      <div className="flex items-center gap-4">
        <div
          className="relative h-28 w-28 shrink-0 rounded-full"
          style={{
            background: `conic-gradient(#7BD67A ${Math.max(0, Math.min(100, data.giftUsagePercent))}%, #E5E7EB 0)`,
          }}
        >
          <div className="absolute inset-[10px] flex items-center justify-center rounded-full bg-white">
            <span className="text-3xl font-bold text-gray-900">{data.giftUsagePercent}%</span>
          </div>
        </div>

        <div className="w-full space-y-3">
          <div className="flex items-center justify-between text-gray-600">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-green-400" />
              <span className="text-2xl font-semibold">사용량</span>
            </div>
            <span className="text-2xl font-bold text-gray-900">
              {formatData(data.giftDataUsageAmount)}
            </span>
          </div>

          <div className="flex items-center justify-between text-gray-500">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-gray-300" />
              <span className="text-2xl font-semibold">잔여</span>
            </div>
            <span className="text-2xl font-bold text-gray-900">
              {formatData(data.giftDataRemainAmount)}
            </span>
          </div>

          <div className="h-px bg-gray-200" />

          <div className="flex items-center justify-between">
            <span className="text-2xl font-semibold text-gray-600">총 선물</span>
            <span className="text-2xl font-bold text-gray-900">
              {formatData(data.giftDataAmount)}
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-5 pt-2">
        {data.giftUsages.map((giftUsage) => {
          const isOver = giftUsage.dataUsagePercent >= 100;
          const barColor = isOver ? 'bg-red-500' : 'bg-green-400';

          return (
            <div key={giftUsage.giftId}>
              <div className="mb-2 flex items-center justify-between">
                <p className="text-[1.75rem] font-semibold text-gray-900">
                  {giftUsage.giftUserName}
                </p>
                <p className="text-[1.75rem] font-semibold text-gray-900">
                  {giftUsage.giftDataUsageAmount.toFixed(1)}GB{' '}
                  <span className="text-gray-500">/ {giftUsage.giftDataLimit.toFixed(1)}GB</span>
                </p>
              </div>

              <div className="h-4 overflow-hidden rounded-full bg-gray-200">
                <div
                  className={`h-full rounded-full ${barColor}`}
                  style={{ width: `${Math.max(0, Math.min(giftUsage.dataUsagePercent, 100))}%` }}
                />
              </div>

              <div className="mt-1 flex items-center justify-between text-[1.25rem]">
                <span className={isOver ? 'text-red-500' : 'text-gray-600'}>
                  {giftUsage.dataUsagePercent}% 사용
                </span>
                <span className="text-gray-500">
                  잔여 {giftUsage.giftDataUsageRemainAmount.toFixed(1)}GB
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex items-center justify-end gap-2 text-base text-gray-500">
        <time>{formatCurrentTime(data.currentTime)} 기준</time>
        <div className="flex items-center gap-1">
          {isFetching ? <span>갱신 중</span> : null}
          <RefreshButton onRefresh={() => void refetch()} />
        </div>
      </div>

      <button
        className="h-12 w-full rounded-lg border border-purple-500 bg-white text-2xl font-semibold text-purple-600"
        type="button"
      >
        데이터 선물하기
      </button>
    </section>
  );
};

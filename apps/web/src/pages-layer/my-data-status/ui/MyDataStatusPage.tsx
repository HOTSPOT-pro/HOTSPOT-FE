'use client';

import { useQuery } from '@tanstack/react-query';
import { RefreshButton } from '@/features/refresh/ui/RefreshButton';
import { api } from '@/shared/api/client';
import type { ApiResponse } from '@/shared/api/types';

interface SubscriptionUsage {
  currentTime: string;
  planName: string;
  subDataAmount: number;
  subDataUsageAmount: number;
  subDataRemainAmount: number;
  dataRemainPercent: number;
}
const PERCENT_MAX = 100;
const UNLIMITED_DATA_AMOUNT = -1;

const getSubscriptionUsage = async () => {
  const { data } = await api.get<ApiResponse<SubscriptionUsage>>('/api/v1/subscriptionUsage');
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

export const MyDataStatusPage = () => {
  const { data, isError, isPending, refetch } = useQuery({
    queryFn: getSubscriptionUsage,
    queryKey: ['subscriptionUsage', 'myDataStatus'],
  });

  if (isPending) {
    return (
      <div className="elevation-1 flex flex-col w-full h-fit rounded-12 p-16 gap-16">
        <h2 className="font-title-title3-semibold">내 요금제 데이터</h2>
        <p className="text-sm text-gray-500">내 요금제 데이터를 불러오는 중입니다.</p>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="elevation-1 flex flex-col w-full h-fit rounded-12 p-16 gap-16">
        <h2 className="font-title-title3-semibold">내 요금제 데이터</h2>
        <p className="text-sm text-red-500">내 요금제 데이터를 불러오지 못했습니다.</p>
        <button
          className="w-fit rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-700"
          onClick={async () => {
            await refetch();
          }}
          type="button"
        >
          다시 시도
        </button>
      </div>
    );
  }

  const isUnlimitedPlan = data.subDataAmount === UNLIMITED_DATA_AMOUNT;
  const remainPercent = isUnlimitedPlan ? PERCENT_MAX : data.dataRemainPercent;
  const remainAmountLabel = isUnlimitedPlan ? '무제한' : formatData(data.subDataRemainAmount);
  const totalAmountLabel = isUnlimitedPlan ? '무제한' : formatData(data.subDataAmount);

  return (
    <section className="elevation-1 flex flex-col w-full h-fit rounded-12 p-16 gap-16">
      <div className="space-y-1">
        <h2 className="font-title-title3-semibold">내 요금제 데이터</h2>
        <p className="text-sm text-gray-500">{data.planName}</p>
      </div>

      <div className="flex items-center gap-16">
        <div
          className="relative w-[6rem] h-[6rem] shrink-0 rounded-full"
          style={{
            background: `conic-gradient(#7C4DFF ${Math.max(0, Math.min(PERCENT_MAX, remainPercent))}%, #E5E7EB 0)`,
          }}
        >
          <div className="absolute inset-[10px] flex items-center justify-center rounded-full bg-white">
            <span className="text-[1.5rem] font-bold text-gray-900">{remainPercent}%</span>
          </div>
        </div>

        <div className="w-full space-y-3">
          <div className="flex items-center justify-between text-gray-600">
            <div className="flex items-center gap-8">
              <span className="h-10 w-10 rounded-full bg-purple-500" />
              <span className="font-title-title3-semibold">잔여량</span>
            </div>
            <span className="text-[1rem] font-bold text-gray-900">{remainAmountLabel}</span>
          </div>

          <div className="flex items-center justify-between text-gray-500">
            <div className="flex items-center gap-8">
              <span className="h-10 w-10 rounded-full bg-gray-300" />
              <span className="font-title-title3-semibold">사용량</span>
            </div>
            <span className="text-[1rem] font-bold text-gray-900">
              {formatData(data.subDataUsageAmount)}
            </span>
          </div>

          <div className="h-px bg-gray-200" />

          <div className="flex items-center justify-between">
            <span className="font-title-title3-semibold text-gray-600">전체</span>
            <span className="text-[1rem] font-bold text-gray-900">{totalAmountLabel}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end gap-2 text-xs text-gray-500">
        <time>{formatCurrentTime(data.currentTime)} 기준</time>
        <div className="flex items-center gap-1">
          <RefreshButton
            onRefresh={async () => {
              await refetch();
            }}
          />
        </div>
      </div>
    </section>
  );
};

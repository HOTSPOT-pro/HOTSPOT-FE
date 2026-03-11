'use client';

import { Button } from '@hotspot/ui';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import type {
  GiftUsageItem as GiftUsageItemResponse,
  GiftUsage as GiftUsageResponse,
} from '@/entities/usage/api/types';
import { RefreshButton } from '@/features/refresh/ui/RefreshButton';
import { api } from '@/shared/api/client';
import type { ApiResponse } from '@/shared/api/types';
import { ROUTES } from '@/shared/constants/routes';

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
const PERCENT_MAX = 100;
const ZERO_PERCENT = 0;

const toRemainPercent = (remainAmount: number, totalAmount: number) => {
  if (totalAmount <= 0) return ZERO_PERCENT;
  return Math.min(
    PERCENT_MAX,
    Math.max(ZERO_PERCENT, Math.round((remainAmount / totalAmount) * 100)),
  );
};

const mapGiftUsageItem = (giftUsage: GiftUsageItemResponse): GiftUsage => ({
  dataUsagePercent: toRemainPercent(giftUsage.giftDataUsageRemainAmount, giftUsage.giftDataLimit),
  giftDataLimit: giftUsage.giftDataLimit,
  giftDataUsageAmount: giftUsage.giftDataUsageAmount,
  giftDataUsageRemainAmount: giftUsage.giftDataUsageRemainAmount,
  giftId: giftUsage.giftId,
  giftUserName: giftUsage.giftUserName,
});

const mapGiftedDataStatus = (data: GiftUsageResponse): GiftedDataStatus => ({
  currentTime: data.currentTime,
  giftDataAmount: data.giftDataAmount,
  giftDataRemainAmount: data.giftDataRemainAmount,
  giftDataUsageAmount: data.giftDataUsageAmount,
  giftUsagePercent: toRemainPercent(data.giftDataRemainAmount, data.giftDataAmount),
  giftUsages: data.giftUsages.map(mapGiftUsageItem),
});

const getGiftedDataStatus = async () => {
  const response = await api.get<ApiResponse<GiftUsageResponse>>('/api/v1/giftUsage');
  return mapGiftedDataStatus(response.data.data);
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
  const router = useRouter();

  const { data, isError, isPending, refetch } = useQuery({
    queryFn: getGiftedDataStatus,
    queryKey: ['giftedDataStatus'],
  });

  if (isPending) {
    return (
      <div className="flex flex-col w-full h-fit rounded-[0.75rem] p-4 gap-4 shadow-[0_0_4px_rgba(0,0,0,0.1)]">
        <h2 className="text-[1rem] font-semibold">선물받은 데이터</h2>
        <p className="text-sm text-gray-500">선물 데이터 정보를 불러오는 중입니다.</p>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="flex flex-col w-full h-fit rounded-[0.75rem] p-4 gap-4 shadow-[0_0_4px_rgba(0,0,0,0.1)]">
        <h2 className="text-[1rem] font-semibold">선물받은 데이터</h2>
        <p className="text-sm text-red-500">선물 데이터 정보를 불러오지 못했습니다.</p>
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

  return (
    <section className="flex flex-col w-full h-fit rounded-[0.75rem] p-4 gap-4 shadow-[0_0_4px_rgba(0,0,0,0.1)]">
      <div className="space-y-1">
        <h2 className="text-[1rem] font-semibold">선물받은 데이터</h2>
      </div>

      <div className="flex items-center gap-8">
        <div
          className="relative h-28 w-28 shrink-0 rounded-full"
          style={{
            background: `conic-gradient(#7BD67A ${Math.max(0, Math.min(PERCENT_MAX, data.giftUsagePercent))}%, #E5E7EB 0)`,
          }}
        >
          <div className="absolute inset-[10px] flex items-center justify-center rounded-full bg-white">
            <span className="text-[1.5rem] font-bold text-gray-900">{data.giftUsagePercent}%</span>
          </div>
        </div>

        <div className="w-full space-y-3">
          <div className="flex items-center justify-between text-gray-600">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-green-400" />
              <span className="text-[1rem] font-semibold">잔여량</span>
            </div>
            <span className="text-[1rem] font-bold text-gray-900">
              {formatData(data.giftDataRemainAmount)}
            </span>
          </div>

          <div className="flex items-center justify-between text-gray-500">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-gray-300" />
              <span className="text-[1rem] font-semibold">사용량</span>
            </div>
            <span className="text-[1rem] font-bold text-gray-900">
              {formatData(data.giftDataUsageAmount)}
            </span>
          </div>

          <div className="h-px bg-gray-200" />

          <div className="flex items-center justify-between">
            <span className="text-[1rem] font-semibold text-gray-600">총 선물</span>
            <span className="text-[1rem] font-bold text-gray-900">
              {formatData(data.giftDataAmount)}
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-5 pt-2">
        {data.giftUsages.map((giftUsage) => {
          const isExhausted = giftUsage.dataUsagePercent <= ZERO_PERCENT;
          const barColor = isExhausted ? 'bg-red-500' : 'bg-green-400';

          return (
            <div key={giftUsage.giftId}>
              <div className="mb-2 flex items-center justify-between">
                <p className="text-[1rem] font-semibold text-gray-900">{giftUsage.giftUserName}</p>
                <p className="text-[1rem] font-semibold text-gray-900">
                  {giftUsage.giftDataUsageRemainAmount.toFixed(1)}GB{' '}
                  <span className="text-gray-500">/ {giftUsage.giftDataLimit.toFixed(1)}GB</span>
                </p>
              </div>

              <div className="h-4 overflow-hidden rounded-full bg-gray-200">
                <div
                  className={`h-full rounded-full ${barColor}`}
                  style={{
                    width: `${Math.max(0, Math.min(giftUsage.dataUsagePercent, PERCENT_MAX))}%`,
                  }}
                />
              </div>

              <div className="mt-1 flex items-center justify-between text-sm">
                <span className={isExhausted ? 'text-red-500' : 'text-gray-600'}>
                  {giftUsage.dataUsagePercent}% 잔여
                </span>
                <span className="text-gray-500">
                  사용 {giftUsage.giftDataUsageAmount.toFixed(1)}GB
                </span>
              </div>
            </div>
          );
        })}
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

      <Button onClick={() => router.push(ROUTES.GIFT)} type="button">
        데이터 선물하기
      </Button>
    </section>
  );
};

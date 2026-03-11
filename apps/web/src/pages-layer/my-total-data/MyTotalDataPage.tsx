'use client';

import { DonutChart } from '@hotspot/ui';
import { useQuery } from '@tanstack/react-query';
import type { TotalUsage } from '@/entities/usage';
import { RefreshButton } from '@/features/refresh/ui/RefreshButton';
import { api } from '@/shared/api/client';
import type { ApiResponse } from '@/shared/api/types';

const getTotalUsage = async () => {
  const { data } = await api.get<ApiResponse<TotalUsage>>('/api/v1/totalUsage');
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

const SEGMENTS = [
  { color: '#7C4DFF', key: 'subDataRemainAmount', label: '내 데이터' },
  { color: '#7BD67A', key: 'giftDataRemainAmount', label: '선물 데이터' },
  { color: '#4F46E5', key: 'familyDataRemainAmount', label: '가족 데이터' },
] as const satisfies ReadonlyArray<{
  color: string;
  key: keyof Pick<
    TotalUsage,
    'familyDataRemainAmount' | 'giftDataRemainAmount' | 'subDataRemainAmount'
  >;
  label: string;
}>;

export const MyTotalDataPage = () => {
  const { data, isError, isPending, refetch } = useQuery({
    queryFn: getTotalUsage,
    queryKey: ['totalUsage', 'myTotalData'],
  });

  if (isPending) {
    return (
      <div className="flex flex-col w-full h-fit rounded-[0.75rem] p-4 gap-4 shadow-[0_0_4px_rgba(0,0,0,0.1)]">
        <h2 className="text-[1rem] font-semibold">전체 데이터</h2>
        <p className="text-sm text-gray-500">전체 데이터 정보를 불러오는 중입니다.</p>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="flex flex-col w-full h-fit rounded-[0.75rem] p-4 gap-4 shadow-[0_0_4px_rgba(0,0,0,0.1)]">
        <h2 className="text-[1rem] font-semibold">전체 데이터</h2>
        <p className="text-sm text-red-500">전체 데이터 정보를 불러오지 못했습니다.</p>
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

  const donutData = SEGMENTS.map((segment) => ({
    fill: segment.color,
    name: segment.label,
    value: data[segment.key],
  }));

  return (
    <section className="flex flex-col w-full h-fit rounded-[0.75rem] p-4 gap-4 shadow-[0_0_4px_rgba(0,0,0,0.1)]">
      <h2 className="text-[1rem] font-semibold">전체 데이터</h2>

      <div className="flex w-full justify-center items-center">
        <div className="flex w-full max-w-72">
          <DonutChart
            centerDisplayMode="valueOnly"
            data={donutData}
            total={data.totalDataAmount}
            totalUsed={data.totalDataRemainAmount}
            totalUsedLabel="총 잔여"
          />
        </div>
      </div>

      <div className="h-px bg-gray-200" />

      <div className="space-y-3">
        {SEGMENTS.map((segment) => (
          <div className="flex items-center justify-between text-md font-bold" key={segment.key}>
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full" style={{ backgroundColor: segment.color }} />
              <span className="text-gray-700">{segment.label}</span>
            </div>
            <span className="font-semibold text-gray-900">{formatData(data[segment.key])}</span>
          </div>
        ))}
      </div>

      <div className="flex items-center ml-auto gap-2 text-xs text-gray-500 pt-1">
        <time>{formatCurrentTime(data.currentTime)} 기준</time>
        <RefreshButton
          onRefresh={async () => {
            await refetch();
          }}
        />
      </div>
    </section>
  );
};

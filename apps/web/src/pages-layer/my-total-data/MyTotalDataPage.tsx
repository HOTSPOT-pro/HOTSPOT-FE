'use client';

import { DonutChart, Skeleton } from '@hotspot/ui';
import { useQuery } from '@tanstack/react-query';
import type { TotalUsage } from '@/domains/usage';
import { RefreshButton } from '@/features/refresh/ui/RefreshButton';
import { api } from '@/shared/api/client';
import type { ApiResponse } from '@/shared/api/types';

const getTotalUsage = async () => {
  const { data } = await api.get<ApiResponse<TotalUsage>>('/api/v1/totalUsage');
  return data.data;
};

const PERCENT_MAX = 100;
const UNLIMITED_DATA_AMOUNT = -1;

const isUnlimitedValue = (value: number) => value === UNLIMITED_DATA_AMOUNT;

const formatData = (value: number) =>
  isUnlimitedValue(value) ? '무제한' : `${value.toFixed(1)}GB`;

const normalizeUnlimitedSegments = (values: number[]) => {
  const finiteSum = values.reduce(
    (sum, value) => (isUnlimitedValue(value) ? sum : sum + Math.max(0, value)),
    0,
  );
  const unlimitedIndexes = values.flatMap((value, index) =>
    isUnlimitedValue(value) ? [index] : [],
  );
  const remaining = Math.max(0, PERCENT_MAX - finiteSum);
  const sharedUnlimitedValue =
    unlimitedIndexes.length > 0 ? remaining / unlimitedIndexes.length : 0;

  return values.map((value) =>
    isUnlimitedValue(value) ? sharedUnlimitedValue : Math.max(0, value),
  );
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
    year: 'numeric',
  })
    .format(parsedDate)
    .replace(/\.\s?/g, '.')
    .replace(',', '');
};

const SEGMENTS = [
  { color: '#7C4DFF', key: 'subDataRemainAmount', label: 'planName' },
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

const MyTotalDataSkeleton = () => {
  return (
    <section className="elevation-1 flex flex-col w-full h-fit rounded-12 p-16 gap-16">
      <Skeleton height={24} width="6rem" />

      <div className="flex w-full justify-center">
        <Skeleton className="rounded-full" height="18rem" width="18rem" />
      </div>

      <div className="h-px bg-gray-200" />

      <div className="space-y-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <div className="flex items-center justify-between" key={`my-total-segment-${index}`}>
            <div className="flex items-center gap-8">
              <Skeleton className="rounded-full" height={10} width={10} />
              <Skeleton height={18} width={96} />
            </div>
            <Skeleton height={18} width={88} />
          </div>
        ))}
      </div>

      <div className="ml-auto flex items-center gap-2 pt-1">
        <Skeleton height={14} width={120} />
        <Skeleton className="rounded-full" height={20} width={20} />
      </div>
    </section>
  );
};

export const MyTotalDataPage = () => {
  const { data, isError, isPending, refetch } = useQuery({
    queryFn: getTotalUsage,
    queryKey: ['totalUsage', 'myTotalData'],
  });

  if (isPending) {
    return <MyTotalDataSkeleton />;
  }

  if (isError || !data) {
    return (
      <div className="elevation-1 flex flex-col w-full h-fit rounded-12 p-16 gap-16">
        <h2 className="font-title-title3-semibold">전체 데이터</h2>
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

  const isUnlimitedTotal =
    isUnlimitedValue(data.totalDataAmount) || isUnlimitedValue(data.totalDataRemainAmount);

  const segmentValues = SEGMENTS.map((segment) => data[segment.key]);
  const normalizedSegmentValues = isUnlimitedTotal
    ? normalizeUnlimitedSegments(segmentValues)
    : segmentValues.map((value) => Math.max(0, value));

  const donutData = SEGMENTS.map((segment, index) => ({
    fill: segment.color,
    name: segment.label === 'planName' ? data.planName : segment.label,
    value: normalizedSegmentValues[index] ?? 0,
  }));

  return (
    <section className="elevation-1 flex flex-col w-full h-fit rounded-12 p-16 gap-16">
      <h2 className="font-title-title3-semibold">전체 데이터</h2>

      <div className="flex w-full justify-center items-center">
        <div className="flex w-full max-w-72">
          <DonutChart
            centerDisplayMode="valueOnly"
            centerValueSuffix={isUnlimitedTotal ? '' : 'GB'}
            data={donutData}
            total={isUnlimitedTotal ? PERCENT_MAX : data.totalDataAmount}
            totalUsed={isUnlimitedTotal ? PERCENT_MAX : data.totalDataRemainAmount}
            totalUsedLabel="총 잔여"
            valueFormatter={(value) => {
              if (isUnlimitedTotal && value === PERCENT_MAX) {
                return '무제한';
              }

              return value.toFixed(1);
            }}
          />
        </div>
      </div>

      <div className="h-px bg-gray-200" />

      <div className="space-y-3">
        {SEGMENTS.map((segment) => (
          <div className="flex items-center justify-between text-md font-bold" key={segment.key}>
            <div className="flex items-center gap-8">
              <span className="h-10 w-10 rounded-full" style={{ backgroundColor: segment.color }} />
              <span className="text-gray-700">
                {segment.label === 'planName' ? data.planName : segment.label}
              </span>
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

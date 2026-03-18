'use client';

import { Skeleton } from '@hotspot/ui';
import { useRouter } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useAnalyzeHistory } from '@/domains/analyze';
import { formatYearMonth } from '@/shared/lib';
import { MonthNavigation } from '@/shared/ui';
import { useSubHeaderStore } from '@/widgets/app-header/ui/SubHeaderProvider';

const HistoryList = ({ subId, date }: { subId: number; date: Date }) => {
  const router = useRouter();
  const { setHeader } = useSubHeaderStore();

  const { history } = useAnalyzeHistory({
    subId,
    yearMonth: formatYearMonth(date),
  });

  useEffect(() => {
    setHeader({
      leftAction: { type: 'back' },
      rightAction: { type: 'none' },
      title: `${history?.name || ''} 히스토리`,
      variant: 'sub',
    });
  }, [setHeader, history?.name]);

  return (
    <div className="flex flex-col gap-8">
      {history?.reports?.map((i) => (
        <button
          className="p-16 shadow-sm rounded-2xl bg-white text-left"
          key={i.reportId}
          onClick={() => router.push(`/analyze/${subId}/${i.reportId}`)}
          type="button"
        >
          <div className="flex flex-col items-start">
            <h3 className="text-[13px] font-bold">{i.title}</h3>
            <p className="text-[12px] text-gray-600">{i.period}</p>
          </div>
        </button>
      ))}
      {(!history?.reports || history.reports.length === 0) && (
        <p className="text-center py-20 text-gray-400">해당 월의 리포트가 없습니다.</p>
      )}
    </div>
  );
};

export const AnalyzeHistoryPage = ({ subId }: { subId: number }) => {
  const [date, setDate] = useState<Date>(new Date());

  return (
    <div className="p-16 flex flex-col gap-16">
      <div className="shadow-sm rounded-2xl bg-white">
        <MonthNavigation date={date} isLimit={false} onChange={(d) => setDate(d)} />
      </div>

      <ErrorBoundary
        fallback={
          <div className="p-20 text-center text-red-400">데이터를 불러오지 못했습니다.</div>
        }
        resetKeys={[date]}
      >
        <Suspense fallback={<HistoryListSkeleton />}>
          <HistoryList date={date} subId={subId} />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

const HistoryListSkeleton = () => {
  return (
    <div className="flex flex-col gap-8">
      {[1, 2, 3, 4].map((i) => (
        <div className="p-16 shadow-sm rounded-2xl bg-white flex flex-col gap-6" key={i}>
          <Skeleton height={18} variant="text" width="60%" />
          <Skeleton height={14} variant="text" width="40%" />
        </div>
      ))}
    </div>
  );
};

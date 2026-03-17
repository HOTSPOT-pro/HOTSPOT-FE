'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAnalyzeHistory } from '@/domains/analyze';
import { formatYearMonth } from '@/shared/lib';
import { MonthNavigation } from '@/shared/ui';
import { useSubHeaderStore } from '@/widgets/app-header/ui/SubHeaderProvider';

interface AnalyzeHistoryPageProps {
  subId: number;
}

export const AnalyzeHistoryPage = ({ subId }: AnalyzeHistoryPageProps) => {
  const [date, setDate] = useState<Date>(new Date());
  const { history } = useAnalyzeHistory({ subId, yearMonth: formatYearMonth(date) });

  const { setHeader } = useSubHeaderStore();
  useEffect(() => {
    setHeader({
      leftAction: { type: 'back' },
      rightAction: { type: 'none' },
      title: `${history?.name || ''} 히스토리`,
      variant: 'sub',
    });
  }, [setHeader, history]);

  const router = useRouter();

  return (
    <div className="p-16 flex flex-col gap-16">
      <div className="shadow-sm rounded-2xl">
        <MonthNavigation date={date} isLimit={false} onChange={(d) => setDate(d)} />
      </div>
      <div className="flex flex-col gap-8 cursor-pointer">
        {history?.reports.map((i) => (
          <button
            className="p-16 shadow-sm rounded-2xl"
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
      </div>
    </div>
  );
};

'use client';
import { useEffect, useState } from 'react';
import { MonthNavigation } from '@/shared/ui';
import { useSubHeaderStore } from '@/widgets/app-header/ui/SubHeaderProvider';

const TempReport = [
  { date: '2026.05.25~2026.05.31', title: '2026년 6월 1주차 분석 리포트' },
  { date: '2026.06.01~2026.06.07', title: '2026년 6월 2주차 분석 리포트' },
];

export const AnalyzeHistoryPage = () => {
  const { setHeader } = useSubHeaderStore();
  useEffect(() => {
    setHeader({
      leftAction: { type: 'back' },
      rightAction: { type: 'none' },
      title: '히스토리',
      variant: 'sub',
    });
  }, [setHeader]);

  const [date, setDate] = useState<Date>(new Date());
  return (
    <div className="p-4 flex flex-col gap-4">
      <div className="shadow-sm rounded-2xl">
        <MonthNavigation date={date} onChange={(d) => setDate(d)} />
      </div>
      <div className="flex flex-col gap-2 cursor-pointer">
        {TempReport.map((i) => (
          <div className="p-4 shadow-sm rounded-2xl">
            <h3 className="text-[13px] font-bold">{i.title}</h3>
            <p className="text-[12px] text-gray-600">{i.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

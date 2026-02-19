'use client';
import { DateNavigation, ReportTypeSelector } from '@features/report';
import { useState } from 'react';
import { PeriodReport } from '@/widgets/report';

export const ReportPage = () => {
  const [selectedTab, setSelectedTab] = useState<'MONTH' | 'DAY'>('MONTH');
  const [selectedDate, setSelectedDate] = useState({
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
  });

  const handleDateChange = (year: number, month: number) => {
    setSelectedDate({ month, year });
  };

  return (
    <div className="w-full h-full">
      {/* 월일별 탭 버튼 */}
      <div className="py-2 px-4">
        <ReportTypeSelector onChange={(unit) => setSelectedTab(unit)} unit={selectedTab} />
      </div>

      <div className="px-5 py-4">
        {/* 날짜 선택 바*/}
        <DateNavigation
          date={{ month: selectedDate.month, year: selectedDate.year }}
          onChange={handleDateChange}
        />
        {/* 기간별 리포트 */}
        <PeriodReport month={selectedDate.month} unit={selectedTab} year={selectedDate.year} />
      </div>
    </div>
  );
};

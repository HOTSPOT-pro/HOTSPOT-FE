'use client';

import type { ReportUser } from '@entities/report';
import { LineChart } from '@hotspot/ui/components';
import { useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useFamilyChartData } from '@/entities/report/model/useFamilyChartData';
import { MonthNavigation } from '@/shared/ui';

interface PeriodReportProps {
  user: ReportUser;
  unit: 'MONTH' | 'DAY';
}

export const PeriodReport = ({ user, unit }: PeriodReportProps) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const range = {
    date: selectedDate,
    unit,
  };

  const { data: chartData = [], isLoading: isChartLoading } = useFamilyChartData({
    range,
    userId: user.subId,
  });

  const handleDateChange = (newDate: Date) => {
    setSelectedDate(newDate);
  };

  return (
    <div className="p-5 bg-white rounded-3xl flex flex-col gap-1">
      <p className="text-base font-bold leading-relaxed text-gray-900">사용량 추이</p>

      <div className="py-2">
        {unit === 'DAY' && <MonthNavigation date={selectedDate} onChange={handleDateChange} />}
      </div>

      {/* 사용량 그래프 영역 */}
      <div className="w-full h-96 min-w-0 min-h-0 pt-3">
        {isChartLoading ? (
          <div className="flex h-full items-center justify-center text-gray-400">
            데이터를 불러오는 중...
          </div>
        ) : (
          <ErrorBoundary
            fallback={
              <div className="flex h-full items-center justify-center text-gray-400 text-center">
                데이터를 불러오는 중 오류가 발생했습니다.
              </div>
            }
          >
            {chartData.length === 0 ? (
              <div className="flex h-full items-center justify-center text-gray-400">
                데이터가 없습니다.
              </div>
            ) : (
              <LineChart data={chartData} personalName={user.name} type={unit} unit="GB" />
            )}
          </ErrorBoundary>
        )}
      </div>
    </div>
  );
};

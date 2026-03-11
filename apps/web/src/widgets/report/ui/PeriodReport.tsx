'use client';

import type { ReportUser } from '@entities/report';
import { LineChart } from '@hotspot/ui/components';
import { useMemo, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useFamilyChartData } from '@/entities/report/model/useFamilyChartData';
import { MonthNavigation } from '@/shared/ui';

interface PeriodReportProps {
  user: ReportUser;
  unit: 'MONTH' | 'DAY';
}

export const PeriodReport = ({ user, unit }: PeriodReportProps) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const range = { date: selectedDate, unit };

  const {
    data: chartData = [],
    isLoading,
    isError,
  } = useFamilyChartData({
    range,
    userId: user.subId,
  });

  const handleDateChange = (newDate: Date) => {
    setSelectedDate(newDate);
  };

  // 1. 차트 컨텐츠를 렌더링하는 로직을 변수로 추출 (추천)
  const renderChartContent = useMemo(() => {
    if (isLoading) {
      return (
        <div className="flex h-full items-center justify-center text-gray-400">
          데이터를 불러오는 중...
        </div>
      );
    }

    if (isError) {
      return (
        <div className="flex h-full items-center justify-center text-gray-400 text-center">
          데이터를 불러오지 못했습니다.
        </div>
      );
    }

    if (chartData.length === 0) {
      return (
        <div className="flex h-full items-center justify-center text-gray-400">
          데이터가 없습니다.
        </div>
      );
    }

    return <LineChart data={chartData} personalName={user.name} type={unit} unit="GB" />;
  }, [isLoading, isError, chartData, user.name, unit]);

  return (
    <div className="p-5 bg-white rounded-3xl flex flex-col gap-1">
      <p className="text-base font-bold leading-relaxed text-gray-900">사용량 추이</p>

      <div className="py-2">
        {unit === 'DAY' && <MonthNavigation date={selectedDate} onChange={handleDateChange} />}
      </div>

      <div className="w-full h-96 min-w-0 min-h-0 pt-3">
        <ErrorBoundary
          fallback={
            <div className="flex h-full items-center justify-center text-gray-400 text-center">
              데이터를 불러오는 중 오류가 발생했습니다.
            </div>
          }
        >
          {/* 복잡한 삼항 연산자 대신 변수만 배치 */}
          {renderChartContent}
        </ErrorBoundary>
      </div>
    </div>
  );
};

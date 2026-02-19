'use client';

import { type ReportUser, ServiceReport, useUsageReport } from '@entities/report';
import { UserSelector } from '@features/report';
import { LineChart } from '@hotspot/ui/components';
import { useState } from 'react';

interface PeriodReportProps {
  unit: 'MONTH' | 'DAY';
  month: number;
  year: number;
}

export const PeriodReport = ({ unit, month, year }: PeriodReportProps) => {
  const [selectedUser, setSelectedUser] = useState<ReportUser>({ id: 'all', name: null });

  const { users, chartData, appUsageData, isLoading } = useUsageReport({
    month,
    userId: selectedUser.id,
    year,
  });

  if (isLoading) return <div>로딩 중...</div>;

  return (
    <div className="mt-8 p-5 bg-white rounded-3xl flex flex-col gap-1">
      <p className="text-base font-bold leading-relaxed text-gray-900">사용량 추이</p>
      <p className="text-sm text-gray-600 mb-2">
        {year}년 {month}월 {unit === 'MONTH' ? '월' : '일'}별 추이
      </p>

      {/* 구성원 선택 */}
      <UserSelector onSelect={setSelectedUser} selectedUser={selectedUser} users={users} />

      {/* 사용량 그래프 */}
      <div className="w-full h-100 pt-3">
        <LineChart
          data={chartData}
          max={100}
          personalName={selectedUser.name}
          type={unit}
          unit="GB"
        />
      </div>

      {/* 앱별 사용량 */}
      <ServiceReport data={appUsageData} userName={selectedUser.name} />
    </div>
  );
};

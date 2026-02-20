'use client';

import { type ReportUser, ServiceReport, useUsageReport } from '@entities/report';
import { UserSelector } from '@features/report';
import { LineChart } from '@hotspot/ui/components';
import { useState } from 'react';
import type { ReportRange } from '@/entities/report/model/type';

export const PeriodReport = (range: ReportRange) => {
  const [selectedUser, setSelectedUser] = useState<ReportUser>({
    id: null,
    name: null,
  });

  const { users, chartData, appUsageData, isLoading } = useUsageReport({
    range,
    userId: selectedUser.id,
  });

  if (isLoading) return <div>로딩 중...</div>;

  return (
    <div className="mt-4">
      {/* 구성원 선택 */}
      <UserSelector onSelect={setSelectedUser} selectedUser={selectedUser} users={users} />

      <div className="p-5 bg-white rounded-3xl flex flex-col gap-1">
        <p className="text-base font-bold leading-relaxed text-gray-900">사용량 추이</p>

        {/* 사용량 그래프 */}
        <div className="w-full h-96 pt-3">
          <LineChart
            data={chartData}
            personalName={selectedUser.name}
            type={range.unit}
            unit="GB"
          />
        </div>
      </div>

      {/* 앱별 사용량 */}
      <ServiceReport data={appUsageData} isTotal={selectedUser.id === null} />
    </div>
  );
};

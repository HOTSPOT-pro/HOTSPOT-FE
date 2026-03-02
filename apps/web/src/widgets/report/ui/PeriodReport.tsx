'use client';

import { type ReportUser, ServiceReport, useUsageReport } from '@entities/report';
import type { ReportRange } from '@entities/report/model/type';
import { UserSelector } from '@entities/user';
import { LineChart } from '@hotspot/ui/components';
import { useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

export const PeriodReport = (range: ReportRange) => {
  const [selectedUser, setSelectedUser] = useState<ReportUser>({
    name: null,
    subId: null,
  });

  const { users, chartData, appUsageData, isAppLoading, isChartLoading } = useUsageReport({
    range,
    userId: selectedUser.subId,
  });

  if (!(users && appUsageData)) return <div>오류 발생. 나중에 다시 시도해주세요.</div>;

  return (
    <div className="mt-4">
      {/* 구성원 선택 */}
      <UserSelector onSelect={setSelectedUser} selectedUser={selectedUser} users={users} />

      <div className="p-5 bg-white rounded-3xl flex flex-col gap-1">
        <p className="text-base font-bold leading-relaxed text-gray-900">사용량 추이</p>

        {/* 사용량 그래프 */}
        <div className="w-full h-96 min-w-0 min-h-0 pt-3">
          {isAppLoading ? (
            <div className="mt-8 p-10 bg-white rounded-3xl text-center text-gray-400">
              Loading...
            </div>
          ) : (
            <ErrorBoundary
              fallback={
                <div className="mt-8 p-10 bg-white rounded-3xl text-center text-gray-400">
                  데이터를 불러오는 중 오류가 발생했습니다.
                </div>
              }
            >
              {chartData.data.length === 0 ? (
                <div className="mt-8 p-10 bg-white rounded-3xl text-center text-gray-400">
                  데이터가 없습니다.
                </div>
              ) : (
                <LineChart
                  data={chartData.data}
                  personalName={selectedUser.name}
                  type={range.unit}
                  unit="GB"
                />
              )}
            </ErrorBoundary>
          )}
        </div>
      </div>

      {/* 앱별 사용량 */}
      {isChartLoading ? (
        <div className="mt-8 p-10 bg-white rounded-3xl text-center text-gray-400">Loading...</div>
      ) : (
        <ServiceReport data={appUsageData} isTotal={selectedUser.subId === null} />
      )}
    </div>
  );
};

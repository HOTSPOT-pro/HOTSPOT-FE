'use client';

import { ProgressBar } from '@hotspot/ui/components';
import { COLORS, cn } from '@hotspot/ui/lib';
import { useState } from 'react';
import { type ReportUser, useAppUsageData } from '@/domains/report'; // 경로에 맞춰 수정
import { DayNavigation } from '@/shared/ui';

interface ServiceReportProps {
  unit: 'MONTH' | 'DAY';
  user: ReportUser;
}

export const ServiceReport = ({ unit, user }: ServiceReportProps) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const range = {
    date: selectedDate,
    unit,
  };

  const { data, isLoading, isError } = useAppUsageData({
    range,
    userId: user.subId,
    userName: user.name ?? undefined,
  });

  if (isLoading) return <div className="mt-8 p-10 text-center text-gray-400">Loading...</div>;
  if (isError) {
    return (
      <div className="mt-8 p-10 bg-gray-50 rounded-2xl text-center text-gray-400">
        앱 사용량을 불러오지 못했습니다.
      </div>
    );
  }

  const usageList = data?.usage ?? [];
  const sortedData = [...usageList].sort((a, b) => b.usage - a.usage);

  return (
    <div className="mt-8 p-5 bg-white rounded-3xl flex flex-col gap-1">
      <div className="flex justify-between items-end mb-2">
        <p className="text-md font-bold leading-relaxed text-gray-900">앱별 상세 사용량</p>
        <p className="text-sm text-gray-500 font-medium">{`${data?.name ?? user.name} 님`}</p>
      </div>

      {/* 날짜 네비게이션 */}
      <section className="py-2">
        {unit === 'MONTH' ? null : <DayNavigation date={selectedDate} onChange={setSelectedDate} />}
      </section>

      {sortedData.length === 0 ? (
        <div className="mt-8 p-10 bg-gray-50 rounded-2xl text-center text-gray-400">
          앱 사용 기록이 없습니다.
        </div>
      ) : (
        <div className="flex flex-col gap-4 h-fit mt-2">
          {sortedData.map((item, index) => (
            <div
              className="w-full flex flex-row gap-4 items-center"
              key={`${item.appName}-${index}`}
            >
              <div
                className={cn(
                  'w-10 h-10 flex-none flex items-center justify-center rounded-full text-base font-bold',
                  index === 0 ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-500',
                )}
              >
                {index + 1}
              </div>

              <div className="flex-1 flex flex-col gap-1.5 min-w-0">
                <div className="flex flex-row justify-between items-center">
                  <p className="font-bold text-gray-900 truncate">{item.appName}</p>
                  <div className="text-right">
                    <span className="font-bold text-gray-900">{item.usage} GB</span>
                  </div>
                </div>

                <ProgressBar
                  color={index === 0 ? COLORS.TEXT_SECONDARY : COLORS.TEXT_SECONDARY}
                  label={`ServiceUsage-${item.appName}`}
                  total={data?.total ?? 1}
                  value={item.usage}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

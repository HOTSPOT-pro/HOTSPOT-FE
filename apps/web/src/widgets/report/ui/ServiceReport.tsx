"use client";

import { ProgressBar, Skeleton } from "@hotspot/ui/components";
import { COLORS, cn } from "@hotspot/ui/lib";
import { useState } from "react";
import { type ReportUser, useAppUsageData } from "@/domains/report"; // 경로에 맞춰 수정
import { DayNavigation } from "@/shared/ui";

interface ServiceReportProps {
  unit: "MONTH" | "DAY";
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

  if (isLoading)
    return (
      <div className="space-y-6 py-8">
        <div className="flex items-center justify-between">
          <Skeleton height={24} width={120} />
          <Skeleton height={16} width={48} />
        </div>
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            className="flex items-center gap-16"
            key={`service-skeleton-${index}`}
          >
            <Skeleton
              className="rounded-full shrink-0"
              height={24}
              width={24}
            />
            <div className="flex-1 space-y-4">
              <div className="flex items-center justify-between">
                <Skeleton height={16} width={96} />
                <Skeleton height={16} width={48} />
              </div>
              <Skeleton height={10} width="100%" />
            </div>
          </div>
        ))}
      </div>
    );
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
    <>
      <div className="flex justify-between items-center mb-2">
        <h2 className="font-title-title3-semibold">앱별 상세 사용량</h2>

        <div>
          <p className="text-sm text-gray-500 font-medium text-right">
            {unit === "MONTH" && `${selectedDate.getMonth() + 1}월`}
          </p>
        </div>
      </div>

      {/* 날짜 네비게이션 */}

      {unit === "MONTH" ? null : (
        <section className="py-8">
          <DayNavigation date={selectedDate} onChange={setSelectedDate} />
        </section>
      )}

      {sortedData.length === 0 ? (
        <div className="mt-8 p-10 bg-gray-50 rounded-2xl text-center text-gray-400">
          앱 사용 기록이 없습니다.
        </div>
      ) : (
        <div className="flex flex-col gap-16 h-fit">
          {sortedData.map((item, index) => (
            <div
              className="w-full flex flex-row gap-16 items-center"
              key={`${item.appName}-${index}`}
            >
              <div className="w-24 h-24 flex-none flex items-center justify-center rounded-full bg-gray-100 text-gray-900 font-body-body4">
                {index + 1}
              </div>

              <div className="flex-1 flex flex-col gap-4 min-w-0">
                <p className="flex flex-row justify-between items-center">
                  <span className="font-title-title5-semibold text-gray-900">
                    {item.appName}
                  </span>
                  <span className="font-body-body4 text-gray-900 text-right">
                    {item.usage} GB
                  </span>
                </p>

                <ProgressBar
                  color={
                    index === 0 ? COLORS.TEXT_SECONDARY : COLORS.TEXT_SECONDARY
                  }
                  label={`ServiceUsage-${item.appName}`}
                  total={data?.total ?? 1}
                  value={item.usage}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

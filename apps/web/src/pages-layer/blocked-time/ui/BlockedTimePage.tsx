"use client";

import { Skeleton } from "@hotspot/ui";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/shared/api/client";
import type { ApiResponse } from "@/shared/api/types";

type DayOfWeek =
  | "MONDAY"
  | "TUESDAY"
  | "WEDNESDAY"
  | "THURSDAY"
  | "FRIDAY"
  | "SATURDAY"
  | "SUNDAY";

interface BlockedTimeRange {
  endTime: string;
  startTime: string;
}

interface DayBlockedTime {
  day: DayOfWeek;
  ranges: BlockedTimeRange[];
}

interface BlockedTimeResponse {
  dayBlockedTimes: DayBlockedTime[];
  subId: number;
}

const TIMELINE_HOURS = ["0", "6", "12", "18", "24"];
const DAY_LABEL_WIDTH_CLASS = "w-28";

const DAY_ORDER: DayOfWeek[] = [
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
  "SUNDAY",
];

const DAY_LABEL: Record<DayOfWeek, string> = {
  FRIDAY: "금",
  MONDAY: "월",
  SATURDAY: "토",
  SUNDAY: "일",
  THURSDAY: "목",
  TUESDAY: "화",
  WEDNESDAY: "수",
};

const getBlockedTime = async () => {
  const { data } = await api.get<ApiResponse<BlockedTimeResponse>>(
    "/api/v1/policies/blockedTime",
    {
      params: {
        isFamily: false,
      },
    },
  );

  return data.data;
};

const formatTime = (time: string) => time.slice(0, 5);

const timeToMinutes = (time: string) => {
  const [hourText = "0", minuteText = "0"] = time.split(":");
  const hour = Number(hourText);
  const minute = Number(minuteText);
  return hour * 60 + minute;
};

const BlockedTimeSkeleton = () => {
  return (
    <section className="elevation-1 flex flex-col w-full h-fit rounded-12 p-16 gap-16">
      <Skeleton height={24} width="10rem" />

      <div className="space-y-12">
        <div className="flex items-center gap-12">
          <Skeleton height={12} width={28} />
          <Skeleton height={12} width="100%" />
        </div>
        {Array.from({ length: 7 }).map((_, index) => (
          <div
            className="flex items-center gap-8"
            key={`blocked-time-${index}`}
          >
            <Skeleton className="rounded-full" height={24} width={24} />
            <Skeleton height={20} width="100%" />
          </div>
        ))}
      </div>
    </section>
  );
};

export const BlockedTimePage = () => {
  const { data, isError, isPending, refetch } = useQuery({
    queryFn: getBlockedTime,
    queryKey: ["blockedTime", "self"],
  });

  if (isPending) {
    return <BlockedTimeSkeleton />;
  }

  if (isError || !data) {
    return (
      <section className="elevation-1 flex flex-col w-full h-fit rounded-12 p-16 gap-16">
        <h2 className="font-title-title3-semibold">데이터 사용 불가 시간대</h2>
        <p className="text-sm text-red-500">
          차단 시간대를 불러오지 못했습니다.
        </p>
        <button
          className="w-fit rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-700"
          onClick={async () => {
            await refetch();
          }}
          type="button"
        >
          다시 시도
        </button>
      </section>
    );
  }

  const blockedTimesByDay = new Map(
    data.dayBlockedTimes.map((item) => [item.day, item.ranges]),
  );
  const hasBlockedTime = data.dayBlockedTimes.some(
    (item) => item.ranges.length > 0,
  );

  return (
    <section className="elevation-1 flex flex-col w-full h-fit rounded-12 p-16 gap-16">
      <div className="space-y-4">
        <h2 className="font-title-title3-semibold">데이터 사용 불가 시간대</h2>
      </div>

      {!hasBlockedTime ? (
        <p className="text-sm text-gray-500">설정된 차단 시간대가 없습니다.</p>
      ) : (
        <div className="overflow-x-auto">
          <div className="min-w-[30rem] space-y-12">
            <div className="flex items-center gap-12 text-[0.6875rem] text-gray-500">
              <div className={`shrink-0 ${DAY_LABEL_WIDTH_CLASS}`} />
              <div className="relative flex-1">
                <div className="flex justify-between">
                  {TIMELINE_HOURS.map((label) => (
                    <div
                      className="w-0 text-center first:-translate-x-0 last:-translate-x-full"
                      key={label}
                    >
                      {label}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <ul className="space-y-12">
              {DAY_ORDER.map((day) => {
                const ranges = blockedTimesByDay.get(day) ?? [];

                return (
                  <li className="flex items-center gap-8" key={day}>
                    <div
                      className={`flex shrink-0 items-center justify-center ${DAY_LABEL_WIDTH_CLASS}`}
                    >
                      <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gray-100 text-gray-900 font-body-body4">
                        {DAY_LABEL[day]}
                      </div>
                    </div>

                    <div className="relative h-20 flex-1 overflow-hidden rounded-md bg-gray-100">
                      <div className="pointer-events-none absolute inset-y-0 left-1/4 w-px bg-white" />
                      <div className="pointer-events-none absolute inset-y-0 left-2/4 w-px bg-white" />
                      <div className="pointer-events-none absolute inset-y-0 left-3/4 w-px bg-white" />

                      {ranges.length === 0 ? (
                        <div className="flex h-full items-center px-10 text-[0.6875rem] text-gray-400">
                          차단 없음
                        </div>
                      ) : (
                        ranges.map((range, index) => {
                          const startMinutes = timeToMinutes(range.startTime);
                          const endMinutes = timeToMinutes(range.endTime);
                          const left = (startMinutes / 1440) * 100;
                          const width =
                            ((endMinutes - startMinutes) / 1440) * 100;

                          return (
                            <div
                              className="absolute top-1/2 flex h-20 -translate-y-1/2 items-center rounded-full bg-red-400 px-8 text-[0.625rem] font-medium text-white"
                              key={`${day}-${range.startTime}-${range.endTime}-${index}`}
                              style={{
                                left: `${left}%`,
                                width: `${Math.max(width, 2)}%`,
                              }}
                              title={`${formatTime(range.startTime)} - ${formatTime(range.endTime)}`}
                            >
                              <span className="truncate">
                                {formatTime(range.startTime)} -{" "}
                                {formatTime(range.endTime)}
                              </span>
                            </div>
                          );
                        })
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
    </section>
  );
};

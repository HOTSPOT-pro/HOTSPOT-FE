"use client";

import { DonutChart, ProgressBar, Skeleton } from "@hotspot/ui";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { RefreshButton } from "@/features/refresh/ui/RefreshButton";
import { api } from "@/shared/api/client";
import type { ApiResponse } from "@/shared/api/types";

interface SubUsage {
  subId: number;
  subName: string;
  dataLimit: number;
  dataUsageAmount: number;
  dataRemainAmount: number;
  remainDataPercent: number;
}

interface FamilyUsage {
  currentTime: string;
  familyDataAmount: number;
  familyDataUsageAmount: number;
  familyDataRemainAmount: number;
  remainDataPercent: number;
  subUsages: SubUsage[];
}

const TOTAL_COLOR = "#4F46E5";
const START_COLOR = "#16A34A";
const END_COLOR = "#BBF7D0";
const HIDDEN_SEGMENT_COLOR = "transparent";

const interpolateColor = (factor: number) => {
  const clamped = Math.min(1, Math.max(0, factor));
  const start = Number.parseInt(START_COLOR.slice(1), 16);
  const end = Number.parseInt(END_COLOR.slice(1), 16);

  const sr = (start >> 16) & 255;
  const sg = (start >> 8) & 255;
  const sb = start & 255;
  const er = (end >> 16) & 255;
  const eg = (end >> 8) & 255;
  const eb = end & 255;

  const r = Math.round(sr + (er - sr) * clamped);
  const g = Math.round(sg + (eg - sg) * clamped);
  const b = Math.round(sb + (eb - sb) * clamped);

  return `rgb(${r}, ${g}, ${b})`;
};

const getFamilyUsage = async () => {
  const { data } = await api.get<ApiResponse<FamilyUsage>>(
    "/api/v1/familyUsage",
  );
  return data.data;
};

const formatCurrentTime = (currentTime: string) => {
  const parsedDate = new Date(currentTime);

  if (Number.isNaN(parsedDate.getTime())) {
    return "-";
  }

  return new Intl.DateTimeFormat("ko-KR", {
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    month: "2-digit",
  }).format(parsedDate);
};

const FamilyDataStatusSkeleton = () => {
  return (
    <section className="elevation-1 flex flex-col w-full h-fit rounded-12 p-16 gap-16">
      <Skeleton height={24} width="10rem" />

      <div className="flex w-full justify-center">
        <Skeleton className="rounded-full" height="17.5rem" width="17.5rem" />
      </div>

      <div className="h-px bg-gray-200" />

      <div className="space-y-12">
        {Array.from({ length: 4 }).map((_, index) => (
          <div className="space-y-4" key={`family-member-${index}`}>
            <div className="flex items-center justify-between text-sm">
              <div className="flex flex-row items-center gap-8">
                <Skeleton className="rounded-full" height={10} width={10} />
                <Skeleton height={16} width={72} />
              </div>
              <Skeleton height={16} width={120} />
            </div>
            <Skeleton height={10} width="100%" />
          </div>
        ))}
      </div>

      <div className="ml-auto flex items-center gap-2">
        <Skeleton height={14} width={100} />
        <Skeleton className="rounded-full" height={20} width={20} />
      </div>
    </section>
  );
};

export const FamilyDataStatusPage = () => {
  const { data, isError, isPending, refetch } = useQuery({
    queryFn: getFamilyUsage,
    queryKey: ["familyUsage"],
  });

  const sortedSubUsages = useMemo(
    () =>
      [...(data?.subUsages ?? [])].sort((a, b) => {
        return b.dataRemainAmount - a.dataRemainAmount;
      }),
    [data],
  );

  const coloredSubUsages = useMemo(
    () =>
      sortedSubUsages.map((subUsage, index, list) => ({
        ...subUsage,
        color: interpolateColor(
          list.length > 1 ? index / (list.length - 1) : 0,
        ),
      })),
    [sortedSubUsages],
  );

  const donutData = useMemo(
    () => [
      {
        fill: TOTAL_COLOR,
        name: "잔여 데이터",
        value: data?.familyDataRemainAmount ?? 0,
      },
      {
        fill: HIDDEN_SEGMENT_COLOR,
        name: "사용 데이터",
        value: data?.familyDataUsageAmount ?? 0,
      },
    ],
    [data?.familyDataRemainAmount, data?.familyDataUsageAmount],
  );

  if (isPending) {
    return <FamilyDataStatusSkeleton />;
  }

  if (isError || !data) {
    return (
      <div className="elevation-1 flex flex-col w-full h-fit rounded-12 p-16 gap-16">
        <h2 className="font-title-title3-semibold">가족 공유 데이터 현황</h2>
        <p className="text-sm text-red-500">
          가족 데이터 정보를 불러오지 못했습니다.
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
      </div>
    );
  }

  return (
    <section className="elevation-1 flex flex-col w-full h-fit rounded-12 p-16 gap-16">
      <h2 className="font-title-title3-semibold">가족 공유 데이터 현황</h2>
      <div className="flex w-full justify-center items-center">
        <div className="flex w-full max-w-70">
          <DonutChart
            data={donutData}
            total={data.familyDataAmount}
            totalUsed={data.familyDataRemainAmount}
            totalUsedLabel="잔여"
          />
        </div>
      </div>
      <div className="h-px bg-gray-200" />

      <div className="space-y-12">
        {coloredSubUsages.map((subUsage) => (
          <div className="space-y-0" key={subUsage.subId}>
            <div className="flex items-center justify-between text-sm">
              <div className="flex flex-row items-center gap-8">
                <div
                  className="w-10 h-10 rounded-full shrink-0"
                  style={{ backgroundColor: subUsage.color }}
                />
                <span className="font-title-title5-semibold text-text-normal">
                  {subUsage.subName}
                </span>
              </div>
              <span className="font-body-body4 text-gray-600">
                {subUsage.dataRemainAmount.toFixed(1)}GB /{" "}
                {subUsage.dataLimit.toFixed(1)}GB ({subUsage.remainDataPercent}
                %)
              </span>
            </div>
            <ProgressBar
              color={subUsage.color}
              label={subUsage.subName}
              total={Math.max(subUsage.dataLimit, 1)}
              value={subUsage.dataRemainAmount}
            />
          </div>
        ))}
      </div>

      <div className="flex items-center justify-end gap-2 text-xs text-gray-500">
        <time>{formatCurrentTime(data.currentTime)} 기준</time>
        <div className="flex items-center gap-1">
          <RefreshButton
            onRefresh={async () => {
              await refetch();
            }}
          />
        </div>
      </div>
    </section>
  );
};

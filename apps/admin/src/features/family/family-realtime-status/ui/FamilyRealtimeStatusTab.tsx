'use client';

import { DonutChart, interpolateColor, ProgressBar } from '@hotspot/ui';
import { useParams } from 'next/navigation';
import { useMemo } from 'react';
import { BlockedStateChip, RoleChip } from '@/domains/family';
import { useFamilyRealtimeStatus } from '@/domains/member-state';

const PERCENT_MAX = 100;

const clampPercent = (percent: number) => {
  return Math.max(0, Math.min(PERCENT_MAX, percent));
};

const formatData = (value: number) => `${value.toFixed(1)} GB`;

const formatDataOrUnlimited = (value: number) => {
  if (value < 0) {
    return '무제한';
  }
  return formatData(value);
};

const formatCurrentTime = (value?: string) => {
  if (!value) {
    return '-';
  }

  const parsedDate = new Date(value);
  if (Number.isNaN(parsedDate.getTime())) {
    return '-';
  }

  return new Intl.DateTimeFormat('ko-KR', {
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
    .format(parsedDate)
    .replace(/\.\s?/g, '.')
    .replace(',', '');
};

export const FamilyRealtimeStatusTab = () => {
  const params = useParams();
  const familyId = Number(params.familyId);
  const { realtimeStatus } = useFamilyRealtimeStatus(familyId);

  const familyUsage = realtimeStatus.familyUsage;
  const members = realtimeStatus.members;

  const sortedSubUsages = useMemo(
    () =>
      [...(familyUsage?.subUsages ?? [])].sort((a, b) => {
        return b.dataUsageAmount - a.dataUsageAmount;
      }),
    [familyUsage?.subUsages],
  );

  const coloredSubUsages = useMemo(
    () =>
      sortedSubUsages.map((subUsage, index, list) => ({
        ...subUsage,
        color: interpolateColor(list.length > 1 ? index / (list.length - 1) : 0),
      })),
    [sortedSubUsages],
  );

  const usageBySubId = useMemo(() => {
    return new Map(coloredSubUsages.map((usage) => [usage.subId, usage]));
  }, [coloredSubUsages]);

  const donutData = useMemo(
    () =>
      coloredSubUsages.map((usage) => ({
        fill: usage.color,
        name: usage.subName,
        value: usage.dataUsageAmount,
      })),
    [coloredSubUsages],
  );

  return (
    <div className="grid grid-cols-1 xl:grid-cols-[380px_1fr] gap-20">
      <section className="flex flex-col w-full h-fit rounded-[0.75rem] p-16 gap-16 bg-white shadow-[0_0_15px_rgba(0,0,0,0.05)]">
        <h3 className="font-body-body2-bold">가족 전체 데이터 사용량</h3>
        <div className="flex w-full justify-center items-center">
          <div className="flex w-full max-w-70">
            <DonutChart
              data={donutData}
              total={familyUsage.familyDataAmount}
              totalUsed={familyUsage.familyDataUsageAmount}
              totalUsedLabel="사용"
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
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: subUsage.color }}
                  />
                  <span className="text-gray-700">{subUsage.subName}</span>
                </div>
                <span className="text-gray-900">
                  {subUsage.dataUsageAmount.toFixed(1)}GB / {subUsage.dataLimit.toFixed(1)}GB (
                  {clampPercent(subUsage.dataUsagePercent)}
                  %)
                </span>
              </div>
              <ProgressBar
                color={subUsage.color}
                label={subUsage.subName}
                total={Math.max(subUsage.dataLimit, 1)}
                value={subUsage.dataUsageAmount}
              />
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white rounded-xl shadow-[0_0_15px_rgba(0,0,0,0.05)] px-20 py-16 flex flex-col gap-12">
        <h3 className="font-body-body2-bold">구성원 목록</h3>
        <div className="flex flex-col gap-12">
          {members.map((member, index) => {
            const memberFamilyUsage = usageBySubId.get(member.subId);
            const memberDataTotal =
              member.subDataAmount < 0
                ? Math.max(member.subDataUsageAmount, 1)
                : Math.max(member.subDataAmount, 1);
            const giftTotal = Math.max(member.giftDataAmount, 1);
            const memberColor =
              memberFamilyUsage?.color ?? interpolateColor(index / Math.max(1, members.length - 1));

            return (
              <article
                className="border border-gray-200 rounded-xl p-16 flex flex-col gap-12"
                key={member.subId}
              >
                <div className="flex items-center justify-between gap-16">
                  <div className="flex flex-wrap items-center gap-8">
                    <h4 className="font-body-body2-bold text-gray-900">{member.subName}</h4>
                    <RoleChip role={member.familyRole} />
                    <BlockedStateChip isBlocked={member.blocked} />
                    <span className="text-xs text-gray-500">{member.phoneEnc}</span>
                  </div>
                  <span className="text-xs text-gray-500">{member.planName}</span>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between text-[12px] text-gray-700">
                    <span>요금제 데이터</span>
                    <span className="font-medium">
                      {formatData(member.subDataUsageAmount)} /{' '}
                      {formatDataOrUnlimited(member.subDataAmount)}
                    </span>
                  </div>
                  <ProgressBar
                    color={memberColor}
                    label={`${member.subName}-plan`}
                    total={memberDataTotal}
                    value={member.subDataUsageAmount}
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between text-[12px] text-gray-700">
                    <span>선물 데이터</span>
                    <span className="font-medium">
                      {formatData(member.giftDataUsageAmount)} / {formatData(member.giftDataAmount)}
                    </span>
                  </div>
                  <ProgressBar
                    color="#22C55E"
                    label={`${member.subName}-gift`}
                    total={giftTotal}
                    value={member.giftDataUsageAmount}
                  />
                </div>

                {memberFamilyUsage && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-[12px] text-gray-700">
                      <span>가족 한도</span>
                      <span className="font-medium">
                        {formatData(memberFamilyUsage.dataUsageAmount)} /{' '}
                        {formatData(memberFamilyUsage.dataLimit)}
                        {'  '}({clampPercent(memberFamilyUsage.dataUsagePercent)}%)
                      </span>
                    </div>
                    <ProgressBar
                      color="#6366F1"
                      label={`${member.subName}-family`}
                      total={Math.max(memberFamilyUsage.dataLimit, 1)}
                      value={memberFamilyUsage.dataUsageAmount}
                    />
                  </div>
                )}
              </article>
            );
          })}
        </div>

        <div className="pt-4 text-xs text-gray-500 text-right">
          {formatCurrentTime(familyUsage.currentTime)} 기준
        </div>
      </section>
    </div>
  );
};

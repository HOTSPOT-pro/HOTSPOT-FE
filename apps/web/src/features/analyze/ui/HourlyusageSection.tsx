'use client';

import { DoubleBarChart } from '@hotspot/ui';
import type { HourlyUsage } from '@/domains/analyze';
import { formatGB } from '../lib/format';

interface HourlyUsageSectionProps {
  hourlyUsage: HourlyUsage;
}

export const HourlyusageSection = ({ hourlyUsage }: HourlyUsageSectionProps) => {
  const { hourlyUsageList, lateNightUsage, studyTimeUsage, ai_feedback } = hourlyUsage;

  const chartData = hourlyUsageList.map((item) => ({
    label: `${item.hour}시`,
    lastWeek: item.lastWeek,
    thisWeek: item.thisWeek,
  }));

  return (
    <div className="bg-white rounded-2xl p-4 mb-3 shadow-sm">
      <h2 className="text-base font-bold text-gray-900 mb-2">시간대별 사용량</h2>

      <ul className="list-none p-0 mb-4 space-y-1">
        <li className="flex items-center gap-2 text-xs text-gray-500">
          <span className="w-2 h-2 rounded-full bg-indigo-900 shrink-0" />
          심야 사용: <strong className="text-gray-700 ml-0.5">{formatGB(lateNightUsage)}</strong>
        </li>
        <li className="flex items-center gap-2 text-xs text-gray-500">
          <span className="w-2 h-2 rounded-full bg-violet-600 shrink-0" />
          학습 집중 시간대 사용:{' '}
          <strong className="text-gray-700 ml-0.5">{formatGB(studyTimeUsage)}</strong>
        </li>
      </ul>

      <div className="h-52">
        <DoubleBarChart data={chartData} unit="GB" />
      </div>

      <div className="bg-violet-50 rounded-xl px-3 py-3 mt-3">
        <span className="text-[11px] font-semibold text-violet-600 block mb-1">AI 피드백</span>
        <p className="text-[13px] text-gray-600 leading-relaxed m-0">{ai_feedback}</p>
      </div>
    </div>
  );
};

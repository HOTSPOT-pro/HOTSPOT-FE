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
    <div className="bg-white rounded-2xl p-16 mb-12 shadow-sm">
      <h2 className="font-body-body2-bold text-gray-900 mb-8">시간대별 사용량</h2>

      <ul className="list-none p-0 mb-12 space-y-1">
        <li className="flex items-center gap-8 font-body-body3 text-gray-500">
          <span className="w-2 h-2 rounded-full bg-gray-700 shrink-0" />
          심야 사용: {formatGB(lateNightUsage)}
        </li>
        <li className="flex items-center gap-8 font-body-body3 text-gray-500">
          <span className="w-2 h-2 rounded-full bg-gray-700 shrink-0" />
          학습 집중 시간대 사용: {formatGB(studyTimeUsage)}
        </li>
      </ul>

      <div className="h-52">
        <DoubleBarChart data={chartData} unit="GB" />
      </div>

      <div className="bg-violet-50 rounded-xl px-12 py-12 mt-12">
        <span className="font-heading-heading4 text-violet-600 block mb-4">AI 피드백</span>
        <p className="font-body-body4 text-gray-600 leading-relaxed m-0">{ai_feedback}</p>
      </div>
    </div>
  );
};

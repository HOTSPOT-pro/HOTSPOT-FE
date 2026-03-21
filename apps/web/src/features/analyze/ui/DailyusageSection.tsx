'use client';

import { DoubleBarChart } from '@hotspot/ui';
import type { DailyUsage } from '@/domains/analyze';
import { DAY_LABELS, formatGB } from '../lib/format';

interface DailyUsageSectionProps {
  dailyUsage: DailyUsage;
}

export const DailyusageSection = ({ dailyUsage }: DailyUsageSectionProps) => {
  const { dailyUsageList, weekdayAvg, weekendAvg, ai_feedback } = dailyUsage;

  const chartData = dailyUsageList.map((item) => ({
    label: DAY_LABELS[item.day],
    lastWeek: item.lastWeek,
    thisWeek: item.thisWeek,
  }));

  return (
    <div className="bg-white rounded-2xl p-16 mb-12 shadow-sm">
      <h2 className="font-body-body2-bold text-gray-900 mb-8">일별 사용량</h2>
      <p className="text-gray-500 font-body-body3 mb-12">
        평일 평균: {formatGB(weekdayAvg)} · 주말 평균: {formatGB(weekendAvg)}
      </p>

      <div className="h-52">
        <DoubleBarChart data={chartData} unit="GB" />
      </div>

      <div className="bg-violet-50 rounded-xl px-12 py-12 mt-12">
        <span className="font-heading-heading4 text-violet-600 block mb-4">AI 피드백</span>
        <p className="text-gray-600 leading-relaxed m-0 font-body-body4">{ai_feedback}</p>
      </div>
    </div>
  );
};

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
    <div className="bg-white rounded-2xl p-4 mb-3 shadow-sm">
      <h2 className="text-base font-bold text-gray-900 mb-0.5">일별 사용량</h2>
      <p className="text-xs text-gray-400 mb-4">
        평일 평균: {formatGB(weekdayAvg)} · 주말 평균: {formatGB(weekendAvg)}
      </p>

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

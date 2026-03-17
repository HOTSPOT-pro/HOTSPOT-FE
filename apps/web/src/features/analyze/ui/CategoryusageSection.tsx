'use client';

import { cn, DonutChart, interpolateColor } from '@hotspot/ui';
import { useCallback, useMemo } from 'react';
import type { CategoryUsageList } from '@/domains/analyze';
import { CATEGORY_LABELS } from '../lib/format';

interface CategoryUsageSectionProps {
  categoryUsageList: CategoryUsageList;
}

const toGBValue = (value: number) => value.toFixed(1);

export const CategoryusageSection = ({ categoryUsageList }: CategoryUsageSectionProps) => {
  const { thisWeek, lastWeek, comparison, ai_feedback } = categoryUsageList;

  const compMap = Object.fromEntries(comparison.map((c) => [c.category, c.changeRate]));
  const thisWeekItemMap = useMemo(
    () => Object.fromEntries(thisWeek.map((item) => [CATEGORY_LABELS[item.category], item])),
    [thisWeek],
  );

  const toChartData = useCallback((items: typeof thisWeek) => {
    return [
      ...items.map((item, index) => ({
        category: item.category,
        fill: interpolateColor(items.length > 1 ? index / (items.length - 1) : 0),
        name: CATEGORY_LABELS[item.category],
        value: item.usage,
      })),
    ];
  }, []);

  const totalLastWeek = useMemo(
    () => lastWeek.reduce((acc, cur) => acc + (cur.usage ?? 0), 0),
    [lastWeek],
  );
  const totalThisWeek = useMemo(
    () => thisWeek.reduce((acc, cur) => acc + (cur.usage ?? 0), 0),
    [thisWeek],
  );
  const lastWeekChartData = useMemo(() => toChartData(lastWeek), [lastWeek, toChartData]);
  const thisWeekChartData = useMemo(() => toChartData(thisWeek), [thisWeek, toChartData]);

  console.log(lastWeekChartData);

  // 저번 주 legend용
  const lastWeekLegendItems = lastWeekChartData.filter((d) => d.name !== '잔여량');
  // 이번 주 legend용
  const thisWeekLegendItems = thisWeekChartData.filter((d) => d.name !== '잔여량');

  return (
    <div className="bg-white rounded-2xl p-16 mb-12 shadow-sm">
      <h2 className="font-body-body2-bold text-gray-900 mb-8">카테고리별 사용량</h2>

      {/* 도넛 차트 2개 */}
      <div className="grid grid-cols-2 gap-12 mb-16">
        <div className="flex flex-col items-center gap-4">
          <span className="font-body-body3 text-gray-400 mb-4">지난 주</span>
          <div className="w-full mb-8">
            <DonutChart
              data={lastWeekChartData}
              total={totalLastWeek}
              totalUsed={lastWeek.reduce((acc, cur) => acc + cur.usage, 0)}
              totalUsedLabel="지난 주"
              valueFormatter={toGBValue}
            />
          </div>
          <div className="flex flex-col gap-8 mb-12">
            {lastWeekLegendItems.map((item) => {
              return (
                <div className="flex items-center gap-8" key={item.name}>
                  {/* 색상 dot */}
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ background: item.fill }}
                  />
                  {/* 카테고리명 */}
                  <span className="font-body-body3 w-full text-gray-700">{item.name}</span>
                  {/* GB 값 */}
                  <span className="font-body-body3-bold text-gray-900">
                    {toGBValue(item.value)}GB
                  </span>
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex flex-col items-center gap-4">
          <span className="font-body-body3 text-gray-400 mb-4">이번 주</span>
          <div className="w-full mb-8">
            <DonutChart
              data={thisWeekChartData}
              total={totalThisWeek}
              totalUsed={thisWeek.reduce((acc, cur) => acc + cur.usage, 0)}
              totalUsedLabel="이번 주"
              valueFormatter={toGBValue}
            />
          </div>
          <div className="flex flex-col gap-8 mb-12">
            {thisWeekLegendItems.map((item) => {
              const thisItem = thisWeekItemMap[item.name];
              const rate = thisItem ? (compMap[thisItem.category] ?? 0) : 0;

              return (
                <div className="flex items-center gap-8" key={item.category}>
                  {/* GB 값 */}
                  <span className="font-body-body3-bold text-gray-900">
                    {toGBValue(item.value)}GB
                  </span>
                  {/* 변화율 */}
                  <span
                    className={cn(
                      'font-body-body4-bold w-full text-right text-gray-400',
                      rate > 0 && 'text-violet-600',
                      rate < 0 && 'text-red-500',
                    )}
                  >
                    {rate === 0 && '변동 없음'}
                    {rate > 0 && `▲ ${rate}%`}
                    {rate < 0 && `▼ ${Math.abs(rate)}%`}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="bg-violet-50 rounded-xl px-12 py-12">
        <span className="font-heading-heading4 text-violet-600 block mb-1">AI 피드백</span>
        <p className="font-body-body4 text-gray-600 leading-relaxed m-0">{ai_feedback}</p>
      </div>
    </div>
  );
};

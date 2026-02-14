'use client';

import { memo, useMemo } from 'react';
import { cn } from '../../lib/cssMerge';
import { COLORS, interpolateColor } from '../../lib/interpolateColor';
import { DonutChart, type DonutChartDataProps } from './DonutChart';

interface DonutChartContainerProps {
  data: DonutChartDataProps[];
  total: number;
  type?: 'WEB' | 'MOBILE';
}

const LegendItem = memo(
  ({ name, value, color }: { name: string; value: number; color: string }) => (
    <div className="flex items-center px-3 py-1.5 gap-1">
      <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color }} />
      <span className="text-sm font-medium text-gray-700 whitespace-nowrap">{name}</span>
      <span className="text-xs text-gray-400 ml-1.5 whitespace-nowrap">{value.toFixed(2)}GB</span>
    </div>
  ),
);
LegendItem.displayName = 'LegendItem';

export const DonutChartContainer = ({ data, total, type = 'MOBILE' }: DonutChartContainerProps) => {
  const isWeb = type === 'WEB';

  const { chartData, totalUsed, remaining } = useMemo(() => {
    const used = data.reduce((acc, cur) => acc + cur.value, 0);
    const remain = Math.max(0, total - used);

    const coloredData = [
      { fill: COLORS.REMAINING, name: '잔여', value: remain },
      ...data.map((item, index) => ({
        ...item,
        fill: interpolateColor(data.length > 1 ? index / (data.length - 1) : 0),
      })),
    ];

    return { chartData: coloredData, remaining: remain, totalUsed: used };
  }, [data, total]);

  return (
    <div
      className={cn(
        'flex items-center p-4',
        isWeb ? 'flex-col w-full h-full gap-5' : 'flex-row w-full h-full gap-11',
      )}
    >
      <DonutChart data={chartData} remaining={remaining} total={total} totalUsed={totalUsed} />

      <div
        className={cn('flex flex-wrap justify-center', isWeb ? 'flex-row gap-3' : 'flex-col gap-2')}
      >
        {[
          ...chartData.filter((item) => item.name !== '잔여'),
          ...chartData.filter((item) => item.name === '잔여'),
        ].map((item) => (
          <LegendItem color={item.fill} key={item.name} name={item.name} value={item.value} />
        ))}
      </div>
    </div>
  );
};

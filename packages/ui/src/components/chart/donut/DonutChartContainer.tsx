'use client';

import { useMemo } from 'react';
import { COLORS, interpolateColor } from '../../../lib/interpolateColor';
import { LegendItem } from '../legend/LegendItem';
import { DonutChart, type DonutChartDataProps, type DonutPercentFormatter } from './DonutChart';

interface DonutChartContainerProps {
  data: DonutChartDataProps[];
  percentFormatter?: DonutPercentFormatter;
  totalUsedLabel?: string;
  total: number;
  totalLabel?: string;
  valueFormatter?: (value: number) => string;
}

export const DonutChartContainer = ({
  data,
  percentFormatter,
  totalUsedLabel,
  total,
  totalLabel = '전체',
  valueFormatter = (value) => value.toFixed(1),
}: DonutChartContainerProps) => {
  const { chartData, totalUsed } = useMemo(() => {
    const used = data.reduce((acc, cur) => acc + cur.value, 0);
    const remain = Math.max(0, total - used);

    const coloredData = [
      { fill: COLORS.REMAINING, name: '잔여량', value: remain },
      ...data.map((item, index) => ({
        ...item,
        fill: interpolateColor(data.length > 1 ? index / (data.length - 1) : 0),
      })),
    ];

    return { chartData: coloredData, totalUsed: used };
  }, [data, total]);

  return (
    <div className="flex w-full h-full flex-row items-center gap-6 lg:flex-col">
      <div className="min-w-35">
        <DonutChart
          data={chartData}
          percentFormatter={percentFormatter}
          total={total}
          totalUsed={totalUsed}
          totalUsedLabel={totalUsedLabel}
          valueFormatter={valueFormatter}
        />
      </div>

      <div className="w-full space-y-2 lg:max-w-full">
        <div className="flex flex-col justify-center gap-3 lg:flex-row lg:flex-wrap">
          {[
            ...chartData.filter((item) => item.name !== '잔여량'),
            ...chartData.filter((item) => item.name === '잔여량'),
          ].map((item) => (
            <LegendItem
              color={item.fill}
              key={item.name}
              name={item.name}
              valueText={`${valueFormatter(item.value)}GB`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

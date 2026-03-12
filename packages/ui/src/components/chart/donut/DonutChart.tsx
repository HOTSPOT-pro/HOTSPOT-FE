'use client';

import { memo, useCallback, useMemo, useState } from 'react';
import { Pie, PieChart, type PieProps, ResponsiveContainer, Sector, Tooltip } from 'recharts';
import { COLORS } from '../../../lib/interpolateColor';
import { ChartTooltip } from '../tooltip/ChartTooltip';

export interface DonutChartDataProps {
  name: string;
  value: number;
  fill?: string;
}

export type DonutPercentFormatter = (
  value: number,
  total: number,
  kind: 'active' | 'total',
) => string;

export interface DonutChartProps {
  centerDisplayMode?: 'default' | 'valueOnly';
  centerValueSuffix?: string;
  data: DonutChartDataProps[];
  total: number;
  totalUsed: number;
  totalUsedLabel?: string;
  valueFormatter?: (value: number) => string;
  percentFormatter?: DonutPercentFormatter;
}

interface SectorProps {
  startAngle: number;
  endAngle: number;
  fill?: string;
  index?: number;
}

interface DonutTooltipPayload {
  name: string;
  value: number;
}

interface DonutChartTooltipContentProps {
  active?: boolean;
  payload?: Array<{ payload: DonutTooltipPayload }>;
  total: number;
}

const DonutChartTooltipContent = ({ active, payload, total }: DonutChartTooltipContentProps) => {
  if (!(active && payload?.length)) return null;
  const firstPayload = payload[0]?.payload;
  if (!firstPayload) return null;

  const percent = total > 0 ? Number(((firstPayload.value / total) * 100).toFixed(1)) : 0;

  return (
    <ChartTooltip
      header={firstPayload.name}
      sections={[{ percent, unit: 'GB', value: firstPayload.value.toFixed(1) }]}
    />
  );
};

export const DonutChart = memo(
  ({
    centerDisplayMode = 'default',
    centerValueSuffix = 'GB',
    data,
    total,
    totalUsed,
    totalUsedLabel = '총 사용',
    valueFormatter = (value) => value.toFixed(1),
    percentFormatter = (value, baseTotal, kind) => {
      if (baseTotal <= 0) return '0%';
      if (kind === 'total') return `${Math.ceil((value / baseTotal) * 100)}%`;
      return `${((value / baseTotal) * 100).toFixed(1)}%`;
    },
  }: DonutChartProps) => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    type PieMouseEnterHandler = NonNullable<PieProps['onMouseEnter']>;

    const onMouseEnter = useCallback<PieMouseEnterHandler>((_, index) => {
      setActiveIndex(typeof index === 'number' ? index : null);
    }, []);

    const onMouseLeave = useCallback(() => {
      setActiveIndex(null);
    }, []);

    const displayContent = useMemo(() => {
      return {
        label: totalUsedLabel,
        percent: percentFormatter(totalUsed, total, 'total'),
        totalValue: valueFormatter(total),
        value: valueFormatter(totalUsed),
      };
    }, [percentFormatter, total, totalUsed, totalUsedLabel, valueFormatter]);

    const highlightedIndex = activeIndex;

    const renderCustomSector = useCallback(
      (props: SectorProps) => {
        const { fill, index } = props;
        const isHighlighted = index === highlightedIndex;

        return (
          <g className="cursor-pointer outline-none">
            <Sector
              {...props}
              cornerRadius={0}
              fill={isHighlighted ? COLORS.HOVER : fill}
              strokeWidth={2}
            />
          </g>
        );
      },
      [highlightedIndex],
    );

    return (
      <div className="w-full h-full aspect-square relative @container [&_*:focus-visible]:outline-none [&_*:focus]:outline-none">
        <ResponsiveContainer className="w-full h-full">
          <PieChart>
            <Pie
              cx="50%"
              cy="50%"
              data={[{ fill: COLORS.REMAINING, name: 'base', value: 1 }]}
              dataKey="value"
              endAngle={90}
              innerRadius="90%"
              isAnimationActive={false}
              outerRadius="100%"
              startAngle={-270}
              stroke="none"
            />
            <Pie
              cx="50%"
              cy="50%"
              data={data}
              dataKey="value"
              endAngle={90}
              innerRadius="90%"
              isAnimationActive={true}
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}
              outerRadius="100%"
              shape={renderCustomSector}
              startAngle={-270}
              stroke="none"
            />
            <Tooltip
              content={<DonutChartTooltipContent total={total} />}
              cursor={false}
              wrapperStyle={{ outline: 'none', zIndex: 'var(--z-dropdown)' }}
            />
          </PieChart>
        </ResponsiveContainer>

        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none">
          <span className="text-gray-400 font-medium leading-none text-[6cqi]">
            {displayContent.label}
          </span>
          {centerDisplayMode === 'valueOnly' ? (
            <div className="mt-[3%] text-[13cqi] font-bold leading-none">
              {displayContent.value}
              {centerValueSuffix}
            </div>
          ) : (
            <>
              <div className="flex items-baseline my-[1%] text-[13cqi]">
                {displayContent.percent}
              </div>
              <span className="font-medium text-gray-400 leading-none text-[6cqi] transition-colors text-gray-400">
                <span className="font-bold">{displayContent.value}</span>
                <span className="font-semibold text-[6cqi]">
                  GB / {displayContent.totalValue}GB
                </span>
              </span>
            </>
          )}
        </div>
      </div>
    );
  },
);

DonutChart.displayName = 'DonutChart';

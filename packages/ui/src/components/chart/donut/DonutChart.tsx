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
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

    type PieMouseEnterHandler = NonNullable<PieProps['onMouseEnter']>;
    type PieClickHandler = NonNullable<PieProps['onClick']>;

    const onMouseEnter = useCallback<PieMouseEnterHandler>((_, index) => {
      setActiveIndex(typeof index === 'number' ? index : null);
    }, []);

    const onMouseLeave = useCallback(() => {
      setActiveIndex(null);
    }, []);

    const onClick = useCallback<PieClickHandler>((_, index) => {
      if (typeof index !== 'number') return;
      setSelectedIndex((prev) => (prev === index ? null : index));
    }, []);

    const displayContent = useMemo(() => {
      return {
        label: totalUsedLabel,
        percent: percentFormatter(totalUsed, total, 'total'),
        value: valueFormatter(totalUsed),
      };
    }, [percentFormatter, total, totalUsed, totalUsedLabel, valueFormatter]);

    const highlightedIndex = activeIndex ?? selectedIndex;

    const renderCustomSector = useCallback(
      (props: SectorProps) => {
        const { startAngle, endAngle, fill, index } = props;
        const overlap = 4;
        const angleSize = Math.abs(endAngle - startAngle);
        const isNearFullCircle = angleSize >= 359.5;
        const canExpand = angleSize > overlap * 2 && !isNearFullCircle;
        const isHighlighted = index === highlightedIndex;

        return (
          <g className="cursor-pointer outline-none">
            <Sector
              {...props}
              cornerRadius={canExpand ? 20 : 0}
              endAngle={canExpand ? endAngle + overlap : endAngle}
              fill={isHighlighted ? COLORS.HOVER : fill}
              startAngle={canExpand ? startAngle - overlap : startAngle}
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
              data={data}
              dataKey="value"
              endAngle={90}
              innerRadius="90%"
              isAnimationActive={true}
              onClick={onClick}
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
          <div className="flex items-baseline my-[1%] text-[13cqi]">{displayContent.percent}</div>
          <span className="font-medium text-gray-400 leading-none text-[6cqi] transition-colors text-gray-400">
            <span className="font-bold  ">{displayContent.value}</span>
            <span className="font-semibold  text-[6cqi]">GB / {displayContent.value}GB</span>
          </span>
        </div>
      </div>
    );
  },
);

DonutChart.displayName = 'DonutChart';

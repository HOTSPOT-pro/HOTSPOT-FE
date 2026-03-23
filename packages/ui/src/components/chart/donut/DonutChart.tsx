'use client';

import { memo, useCallback, useLayoutEffect, useMemo, useRef, useState, type MouseEvent as ReactMouseEvent } from 'react';
import { Pie, PieChart, type PieProps, ResponsiveContainer, Sector } from 'recharts';
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

interface TooltipPosition {
  x: number;
  y: number;
}

const TOOLTIP_OFFSET = 12;
const TOOLTIP_PADDING = 8;

const getTooltipPosition = ({
  containerHeight,
  containerWidth,
  coordinates,
  tooltipHeight,
  tooltipWidth,
}: {
  containerHeight: number;
  containerWidth: number;
  coordinates: TooltipPosition;
  tooltipHeight: number;
  tooltipWidth: number;
}) => {
  let x = coordinates.x + TOOLTIP_OFFSET;
  if (x + tooltipWidth + TOOLTIP_PADDING > containerWidth) {
    x = coordinates.x - tooltipWidth - TOOLTIP_OFFSET;
  }

  let y = coordinates.y - tooltipHeight - TOOLTIP_OFFSET;
  if (y < TOOLTIP_PADDING) {
    y = coordinates.y + TOOLTIP_OFFSET;
  }

  return {
    x: Math.min(Math.max(TOOLTIP_PADDING, x), Math.max(TOOLTIP_PADDING, containerWidth - tooltipWidth - TOOLTIP_PADDING)),
    y: Math.min(Math.max(TOOLTIP_PADDING, y), Math.max(TOOLTIP_PADDING, containerHeight - tooltipHeight - TOOLTIP_PADDING)),
  };
};

interface DonutChartTooltipContentProps {
  payload?: DonutTooltipPayload | null;
  total: number;
}

const DonutChartTooltipContent = ({ payload, total }: DonutChartTooltipContentProps) => {
  if (!payload) return null;

  const percent = total > 0 ? Number(((payload.value / total) * 100).toFixed(1)) : 0;

  return (
    <ChartTooltip
      header={payload.name}
      sections={[{ percent, unit: 'GB', value: payload.value.toFixed(1) }]}
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
    const [tooltipPosition, setTooltipPosition] = useState<{ x: number; y: number } | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const tooltipRef = useRef<HTMLDivElement>(null);
    const [tooltipSize, setTooltipSize] = useState({ height: 0, width: 0 });

    type PieMouseEnterHandler = NonNullable<PieProps['onMouseEnter']>;
    type PieMouseMoveHandler = NonNullable<PieProps['onMouseMove']>;

    const updateTooltipPosition = useCallback(
      (event: ReactMouseEvent<SVGElement | Element> | undefined) => {
      if (!(event && containerRef.current)) return;

      const bounds = containerRef.current.getBoundingClientRect();
      const nextX = event.clientX - bounds.left;
      const nextY = event.clientY - bounds.top;

      setTooltipPosition({ x: nextX, y: nextY });
      },
      [],
    );

    const onMouseEnter = useCallback<PieMouseEnterHandler>((entry, index, event) => {
      setActiveIndex(typeof index === 'number' ? index : null);
      updateTooltipPosition(event);
    }, [updateTooltipPosition]);

    const onMouseMove = useCallback<PieMouseMoveHandler>((entry, index, event) => {
      if (typeof index === 'number') {
        setActiveIndex(index);
      }
      updateTooltipPosition(event);
    }, [updateTooltipPosition]);

    const onMouseLeave = useCallback(() => {
      setActiveIndex(null);
      setTooltipPosition(null);
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
    const tooltipPayload = highlightedIndex !== null ? data[highlightedIndex] ?? null : null;

    useLayoutEffect(() => {
      if (!(tooltipPayload && tooltipRef.current)) return;

      const { height, width } = tooltipRef.current.getBoundingClientRect();
      setTooltipSize((prev) => {
        if (prev.height === height && prev.width === width) {
          return prev;
        }

        return { height, width };
      });
    }, [tooltipPayload, total]);

    const adjustedTooltipPosition = useMemo(() => {
      if (!(tooltipPayload && tooltipPosition && containerRef.current)) return null;

      return getTooltipPosition({
        containerHeight: containerRef.current.clientHeight,
        containerWidth: containerRef.current.clientWidth,
        coordinates: tooltipPosition,
        tooltipHeight: tooltipSize.height,
        tooltipWidth: tooltipSize.width,
      });
    }, [tooltipPayload, tooltipPosition, tooltipSize.height, tooltipSize.width]);

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
      <div
        className="w-full h-full aspect-square relative @container [&_*:focus-visible]:outline-none [&_*:focus]:outline-none"
        ref={containerRef}
      >
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
              onMouseMove={onMouseMove}
              outerRadius="100%"
              shape={renderCustomSector}
              startAngle={-270}
              stroke="none"
            />
          </PieChart>
        </ResponsiveContainer>

        <div
          className="pointer-events-none absolute left-0 top-0 z-dropdown transition-opacity duration-150 ease-out"
          style={{
            opacity: tooltipPayload && adjustedTooltipPosition ? 1 : 0,
            transform: adjustedTooltipPosition
              ? `translate(${adjustedTooltipPosition.x}px, ${adjustedTooltipPosition.y}px)`
              : 'translate(0, 0)',
          }}
          ref={tooltipRef}
        >
          <DonutChartTooltipContent payload={tooltipPayload} total={total} />
        </div>

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
              <div className="flex items-baseline my-[1%] text-[13cqi] font-bold">
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

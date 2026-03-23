'use client';

import { memo, useCallback, useLayoutEffect, useMemo, useRef, useState, type ComponentProps } from 'react';
import {
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts';
import { getRoundedMax } from '../../../lib/getRoundedMax';
import { COLORS } from '../../../lib/interpolateColor';
import { ChartTooltip } from '../tooltip/ChartTooltip';
import { LineChartLegend } from './LineChartLegend';

export interface LineChartDataProps {
  date: number;
  total: number;
  personal?: number;
}

export interface UsageLineChartProps {
  personalName?: string | null;
  data: LineChartDataProps[];
  unit?: string;
  type: 'MONTH' | 'DAY';
}

interface LineTooltipPayload {
  date: number;
  personal?: number;
  total: number;
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

interface LineChartTooltipContentProps {
  dateUnit: string;
  hasPersonalData: boolean;
  payload?: LineTooltipPayload | null;
  unit: string;
}

const LineChartTooltipContent = ({
  payload,
  unit,
  dateUnit,
  hasPersonalData,
}: LineChartTooltipContentProps) => {
  if (!payload) return null;

  const { date, total, personal } = payload;

  return (
    <ChartTooltip
      header={`${date}${dateUnit} 전체 사용량`}
      sections={[
        { unit, value: total.toFixed(2) },
        ...(hasPersonalData
          ? [
              {
                dividerTop: true,
                title: '개별 사용량',
                unit,
                value: (personal ?? 0).toFixed(2),
              },
            ]
          : []),
      ]}
    />
  );
};

export const LineChart = memo(({ data, personalName, unit = 'GB', type }: UsageLineChartProps) => {
  const MAIN_COLOR = COLORS.SECONDARY || '#3b82f6';
  const SECOND_COLOR = COLORS.START || '#141414';

  const dateUnit = type === 'MONTH' ? '월' : '일';
  const hasPersonalData = personalName !== null;

  const max = getRoundedMax(data.map((item) => item.total));
  const containerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [tooltipState, setTooltipState] = useState<{
    activeIndex: number | null;
    x: number;
    y: number;
  } | null>(null);
  const [tooltipSize, setTooltipSize] = useState({ height: 0, width: 0 });

  type ComposedChartMouseMoveHandler = NonNullable<ComponentProps<typeof ComposedChart>['onMouseMove']>;
  type ComposedChartMouseLeaveHandler = NonNullable<
    ComponentProps<typeof ComposedChart>['onMouseLeave']
  >;

  const handleMouseMove = useCallback<ComposedChartMouseMoveHandler>((state) => {
    if (!(state?.isTooltipActive && state.activeCoordinate)) {
      setTooltipState(null);
      return;
    }

    const nextIndex = Number(state.activeTooltipIndex);
    if (!(Number.isInteger(nextIndex) && data[nextIndex])) {
      setTooltipState(null);
      return;
    }

    setTooltipState({
      activeIndex: nextIndex,
      x: state.activeCoordinate.x,
      y: state.activeCoordinate.y,
    });
  }, [data]);

  const handleMouseLeave = useCallback<ComposedChartMouseLeaveHandler>(() => {
    setTooltipState(null);
  }, []);

  const tooltipPayload =
    tooltipState && tooltipState.activeIndex !== null ? data[tooltipState.activeIndex] ?? null : null;

  useLayoutEffect(() => {
    if (!(tooltipPayload && tooltipRef.current)) return;

    const { height, width } = tooltipRef.current.getBoundingClientRect();
    setTooltipSize((prev) => {
      if (prev.height === height && prev.width === width) {
        return prev;
      }

      return { height, width };
    });
  }, [tooltipPayload, dateUnit, hasPersonalData, unit]);

  const tooltipPosition = useMemo(() => {
    if (!(tooltipState && tooltipPayload && containerRef.current)) return null;

    return getTooltipPosition({
      containerHeight: containerRef.current.clientHeight,
      containerWidth: containerRef.current.clientWidth,
      coordinates: { x: tooltipState.x, y: tooltipState.y },
      tooltipHeight: tooltipSize.height,
      tooltipWidth: tooltipSize.width,
    });
  }, [tooltipPayload, tooltipSize.height, tooltipSize.width, tooltipState]);

  return (
    <div
      className="w-full h-full relative @container [&_*:focus-visible]:outline-none [&_*:focus]:outline-none"
      ref={containerRef}
    >
      <ResponsiveContainer height="100%" width="100%">
        <ComposedChart
          data={data}
          margin={{ bottom: 10, left: 0, right: 10, top: 10 }}
          onMouseLeave={handleMouseLeave}
          onMouseMove={handleMouseMove}
        >
          <CartesianGrid stroke={COLORS.CARTESIAN} strokeDasharray="3 3" vertical={false} />

          <XAxis
            axisLine={false}
            dataKey="date"
            dy={10}
            tick={{ fill: COLORS.TEXT_SECONDARY, fontSize: '12px' }}
            tickFormatter={(value) => `${value}${dateUnit}`}
            tickLine={false}
          />

          <YAxis
            axisLine={false}
            domain={[0, max]}
            tick={{ fill: COLORS.TEXT_SECONDARY, fontSize: '12px' }}
            tickFormatter={(value) => `${value}${unit}`}
            tickLine={false}
            width={50}
          />

          <Legend content={<LineChartLegend />} verticalAlign="bottom" />

          <Line
            animationDuration={1500}
            dataKey="total"
            dot={false}
            name="전체 사용량"
            stroke={MAIN_COLOR}
            strokeDasharray={'5 5'}
            strokeWidth={3}
            type="monotone"
          />

          {hasPersonalData && (
            <Line
              animationDuration={1500}
              dataKey="personal"
              dot={false}
              name={personalName || '개인 사용량'}
              stroke={SECOND_COLOR}
              strokeWidth={3}
              type="monotone"
            />
          )}
        </ComposedChart>
      </ResponsiveContainer>

      <div
        className="pointer-events-none absolute left-0 top-0 z-dropdown transition-opacity duration-150 ease-out"
        style={{
          opacity: tooltipPayload && tooltipPosition ? 1 : 0,
          transform: tooltipPosition
            ? `translate(${tooltipPosition.x}px, ${tooltipPosition.y}px)`
            : 'translate(0, 0)',
        }}
        ref={tooltipRef}
      >
        <LineChartTooltipContent
          dateUnit={dateUnit}
          hasPersonalData={hasPersonalData}
          payload={tooltipPayload}
          unit={unit}
        />
      </div>
    </div>
  );
});

LineChart.displayName = 'LineChart';

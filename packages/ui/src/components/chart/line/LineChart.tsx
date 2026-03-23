'use client';

import { memo, useCallback, useState, type ComponentProps } from 'react';
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
  const [tooltipState, setTooltipState] = useState<{
    payload: LineTooltipPayload | null;
    x: number;
    y: number;
  } | null>(null);

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
    const nextPayload = Number.isInteger(nextIndex) ? data[nextIndex] : undefined;
    if (!nextPayload) {
      setTooltipState(null);
      return;
    }

    setTooltipState({
      payload: nextPayload,
      x: state.activeCoordinate.x,
      y: state.activeCoordinate.y,
    });
  }, [data]);

  const handleMouseLeave = useCallback<ComposedChartMouseLeaveHandler>(() => {
    setTooltipState(null);
  }, []);

  return (
    <div className="w-full h-full relative @container [&_*:focus-visible]:outline-none [&_*:focus]:outline-none">
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
          opacity: tooltipState?.payload ? 1 : 0,
          transform: tooltipState
            ? `translate(${tooltipState.x + 12}px, ${tooltipState.y - 12}px) translateY(-100%)`
            : 'translate(0, 0)',
        }}
      >
        <LineChartTooltipContent
          dateUnit={dateUnit}
          hasPersonalData={hasPersonalData}
          payload={tooltipState?.payload}
          unit={unit}
        />
      </div>
    </div>
  );
});

LineChart.displayName = 'LineChart';

'use client';

import { memo } from 'react';
import {
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
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
  totalRatio: number;
  personalRatio?: number;
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
  personalRatio?: number;
  total: number;
  totalRatio: number;
}

interface LineChartTooltipContentProps {
  active?: boolean;
  dateUnit: string;
  hasPersonalData: boolean;
  payload?: Array<{ payload: LineTooltipPayload }>;
  unit: string;
}

const LineChartTooltipContent = ({
  active,
  payload,
  unit,
  dateUnit,
  hasPersonalData,
}: LineChartTooltipContentProps) => {
  if (!(active && payload?.length)) return null;
  const firstPayload = payload[0]?.payload;
  if (!firstPayload) return null;

  const { date, total, totalRatio, personal, personalRatio } = firstPayload;

  return (
    <ChartTooltip
      header={`${date}${dateUnit} 전체 사용량`}
      sections={[
        { percent: totalRatio, unit, value: total },
        ...(hasPersonalData
          ? [
              {
                dividerTop: true,
                percent: personalRatio ?? 0,
                title: '개별 사용량',
                unit,
                value: personal ?? 0,
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

  return (
    <div className="w-full h-full @container [&_*:focus-visible]:outline-none [&_*:focus]:outline-none">
      <ResponsiveContainer height="100%" width="100%">
        <ComposedChart data={data} margin={{ bottom: 10, left: 0, right: 10, top: 10 }}>
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

          <Tooltip
            content={
              <LineChartTooltipContent
                dateUnit={dateUnit}
                hasPersonalData={hasPersonalData}
                unit={unit}
              />
            }
            cursor={{ stroke: COLORS.STROKE, strokeWidth: 2 }}
            wrapperStyle={{ zIndex: 'var(--z-dropdown)' }}
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
    </div>
  );
});

LineChart.displayName = 'LineChart';

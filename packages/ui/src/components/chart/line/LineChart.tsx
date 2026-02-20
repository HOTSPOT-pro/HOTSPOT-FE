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
import { COLORS } from '../../../lib/interpolateColor';
import { getRoundedMax } from './getRoundedMax';
import { LineChartLegend } from './LineChartLegend';
import { LineChartTooltip } from './LineChartTooltip';
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

export const LineChart = memo(({ data, personalName, unit = 'GB', type }: UsageLineChartProps) => {
  const MAIN_COLOR = COLORS.SECONDARY || '#3b82f6';
  const SECOND_COLOR = COLORS.START || '#141414';

  const dateUnit = type === 'MONTH' ? '월' : '일';
  const hasPersonalData = personalName !== null;

  const max = getRoundedMax(data.map((item) => item.total));

  return (
    <div className="w-full h-full @container">
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
              <LineChartTooltip dateUnit={dateUnit} hasPersonalData={hasPersonalData} unit={unit} />
            }
            cursor={{ stroke: COLORS.STROKE, strokeWidth: 2 }}
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
              name={personalName}
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

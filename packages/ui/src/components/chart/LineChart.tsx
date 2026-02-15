'use client';

import { memo } from 'react';
import {
  CartesianGrid,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { COLORS } from '../../lib/interpolateColor';
import { LineChartTooltip } from './LineChartTooltip';

export interface LineChartDataProps {
  date: string;
  total: number;
  personal?: number;
  totalRatio: number;
  personalRatio?: number;
}

export interface UsageLineChartProps {
  max: number;
  totalData: LineChartDataProps[];
  unit?: string;
  type: 'MONTH' | 'DAY';
}

export const LineChart = memo(({ max, totalData, unit = 'GB', type }: UsageLineChartProps) => {
  const MAIN_COLOR = COLORS.SECONDARY || '#3b82f6';
  const SECOND_COLOR = COLORS.START || '#141414';

  const dateUnit = type === 'MONTH' ? '월' : '일';

  return (
    <div className="w-full h-full @container">
      <ResponsiveContainer height="100%" width="100%">
        <ComposedChart data={totalData} margin={{ bottom: 0, left: 0, right: 10, top: 10 }}>
          <CartesianGrid stroke="#f0f0f0" strokeDasharray="3 3" vertical={false} />

          <XAxis
            axisLine={false}
            dataKey="date"
            dy={10}
            tick={{ fill: '#9ca3af', fontSize: '12px' }}
            tickFormatter={(value) => `${value}${dateUnit}`}
            tickLine={false}
          />

          <YAxis
            axisLine={false}
            domain={[0, max]}
            tick={{ fill: '#9ca3af', fontSize: '12px' }}
            tickFormatter={(value) => `${value}GB`}
            tickLine={false}
            width={50}
          />

          <Tooltip
            content={<LineChartTooltip dateUnit={dateUnit} unit={unit} />}
            cursor={{ stroke: '#e5e7eb', strokeWidth: 2 }}
          />

          <Line
            animationDuration={1500}
            dataKey="total"
            dot={false}
            stroke={MAIN_COLOR}
            strokeDasharray={'5 5'}
            strokeWidth={3}
            type="monotone"
          />
          <Line
            animationDuration={1500}
            dataKey="personal"
            dot={false}
            stroke={SECOND_COLOR}
            strokeWidth={3}
            type="monotone"
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
});

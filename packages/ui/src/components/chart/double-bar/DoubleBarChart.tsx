'use client';

import { memo } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { getRoundedMax } from '../../../lib/getRoundedMax';
import { COLORS } from '../../../lib/interpolateColor';
import { ChartTooltip } from '../tooltip/ChartTooltip';

export interface BarChartDataProps {
  label: string; // '월', '화' 또는 '1주', '2주'
  lastWeek: number;
  thisWeek: number;
  lastWeekRatio?: number;
  thisWeekRatio?: number;
}

export interface UsageBarChartProps {
  data: BarChartDataProps[];
  unit?: string;
}

const BarChartTooltipContent = ({ active, payload, unit }: any) => {
  if (!(active && payload?.length)) return null;
  const data = payload[0].payload;

  return (
    <ChartTooltip
      header={`${data.label} 사용량 비교`}
      sections={[
        {
          percent: data.lastWeekRatio,
          title: '지난주',
          unit,
          value: data.lastWeek.toFixed(2),
        },
        {
          dividerTop: true,
          percent: data.thisWeekRatio,
          title: '이번주',
          unit,
          value: data.thisWeek.toFixed(2),
        },
      ]}
    />
  );
};

export const DoubleBarChart = memo(({ data, unit = 'GB' }: UsageBarChartProps) => {
  const LAST_WEEK_COLOR = COLORS.SECONDARY || '#94a3b8';
  const THIS_WEEK_COLOR = COLORS.START || '#3b82f6';

  // Y축 최댓값 계산 (두 데이터 중 큰 값 기준)
  const allValues = data.flatMap((d) => [d.lastWeek, d.thisWeek]);
  const max = getRoundedMax(allValues);

  return (
    <div className="w-full h-full @container [&_*:focus-visible]:outline-none">
      <ResponsiveContainer height="100%" width="100%">
        <BarChart
          barGap={8}
          data={data}
          margin={{ bottom: 10, left: 0, right: 10, top: 20 }} // 막대 사이의 간격
        >
          <CartesianGrid stroke={COLORS.CARTESIAN} strokeDasharray="3 3" vertical={false} />

          <XAxis
            axisLine={false}
            dataKey="label"
            dy={10}
            tick={{ fill: COLORS.TEXT_SECONDARY, fontSize: '12px' }}
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
            content={<BarChartTooltipContent unit={unit} />}
            cursor={{ fill: COLORS.HOVER || '#f1f5f9', opacity: 0.4 }}
          />

          <Legend height={36} iconType="circle" verticalAlign="bottom" />

          {/* 지난주 막대 */}
          <Bar
            barSize={20}
            dataKey="lastWeek"
            fill={LAST_WEEK_COLOR}
            name="지난주" // 상단 모서리만 둥글게
            radius={[4, 4, 0, 0]}
          />

          {/* 이번주 막대 */}
          <Bar
            barSize={20}
            dataKey="thisWeek"
            fill={THIS_WEEK_COLOR}
            name="이번주"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
});

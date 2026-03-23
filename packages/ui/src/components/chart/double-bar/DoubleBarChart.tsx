/** biome-ignore-all lint/suspicious/noExplicitAny: legend payload용 */
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
import { getResponsiveRoundedMax } from '../../../lib';
import { COLORS } from '../../../lib/interpolateColor';
import { ChartTooltip } from '../tooltip/ChartTooltip';

export interface BarChartDataProps {
  label: string; // '월', '화' 또는 '1주', '2주'
  lastWeek: number;
  thisWeek: number;
}

export interface UsageBarChartProps {
  data: BarChartDataProps[];
  unit?: string;
}

interface DoubleBarChartTooltipPayload {
  label: string;
  lastWeek: number;
  thisWeek: number;
}
interface DoubleBarChartTooltipContentProps {
  active?: boolean;
  payload?: Array<{ payload: DoubleBarChartTooltipPayload }>;
  unit: string;
}

const BarChartTooltipContent = ({ active, payload, unit }: DoubleBarChartTooltipContentProps) => {
  if (!(active && payload?.length)) return null;
  const data = payload[0]?.payload;
  if (!data) return null;

  return (
    <ChartTooltip
      header={`${data.label} 사용량 비교`}
      sections={[
        {
          title: '지난주',
          unit,
          value: data.lastWeek.toFixed(2),
        },
        {
          dividerTop: true,
          title: '이번주',
          unit,
          value: data.thisWeek.toFixed(2),
        },
      ]}
    />
  );
};

type LegendEntry = { dataKey?: string; color?: string; value?: string };
const CustomLegend = ({ payload = [] }: { payload?: LegendEntry[] }) => {
  const sortedPayload = [...payload].sort((a, b) => {
    if (a.dataKey === 'lastWeek') return -1;
    if (b.dataKey === 'lastWeek') return 1;
    return 0;
  });

  return (
    <div className="flex justify-center gap-24 mt-16">
      {sortedPayload.map((entry, index: number) => (
        <div className="flex items-center gap-8" key={`item-${index}`}>
          <div className="w-12 h-12 rounded-full" style={{ backgroundColor: entry.color }} />
          <span className="text-sm font-medium text-gray-600">{entry.value}</span>
        </div>
      ))}
    </div>
  );
};

//차트 레이아웃 상수
const CHART_LAYOUT = {
  BAR_GAP: 2,
  BAR_SIZE: 20,
  RADIUS: [4, 4, 0, 0] as [number, number, number, number],
  Y_AXIS_WIDTH: 50,
};

export const DoubleBarChart = memo(({ data, unit = 'GB' }: UsageBarChartProps) => {
  const LAST_WEEK_COLOR = COLORS.SECONDARY_PALE || '#9DE693';
  const THIS_WEEK_COLOR = COLORS.PRIMARY || '#8556E3';

  const allValues = data.flatMap((d) => [d.lastWeek, d.thisWeek]);
  const max = getResponsiveRoundedMax(allValues);

  return (
    <div className="w-full h-full @container [&_*:focus-visible]:outline-none [&_*:focus]:outline-none">
      <ResponsiveContainer height="100%" width="100%">
        <BarChart
          barGap={CHART_LAYOUT.BAR_GAP}
          data={data}
          margin={{ bottom: 10, left: 0, right: 10, top: 20 }}
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
            width={CHART_LAYOUT.Y_AXIS_WIDTH}
          />

          <Tooltip
            content={<BarChartTooltipContent unit={unit} />}
            cursor={{ fill: COLORS.HOVER || '#f1f5f9', opacity: 0.1 }}
          />

          <Legend content={<CustomLegend />} verticalAlign="bottom" />

          <Bar
            barSize={CHART_LAYOUT.BAR_SIZE}
            dataKey="lastWeek"
            fill={LAST_WEEK_COLOR}
            name="지난주"
            radius={CHART_LAYOUT.RADIUS}
          />

          <Bar
            barSize={CHART_LAYOUT.BAR_SIZE}
            dataKey="thisWeek"
            fill={THIS_WEEK_COLOR}
            name="이번주"
            radius={CHART_LAYOUT.RADIUS}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
});

'use client';

import { useMemo } from 'react';
import { Pie, PieChart, ResponsiveContainer, Sector } from 'recharts';
import { COLORS, interpolateColor } from '../../lib/interpolateColor';

export interface DonutChartDataProps {
  name: string;
  value: number;
}

export interface DonutChartProps {
  data: DonutChartDataProps[];
  total: number;
}

interface SectorProps {
  cx: number;
  cy: number;
  innerRadius: number;
  outerRadius: number;
  startAngle: number;
  endAngle: number;
  fill?: string;
}

export const DonutChart = ({ data, total }: DonutChartProps) => {
  const totalUsed = data.reduce((acc, cur) => acc + cur.value, 0);
  const remaining = Math.max(0, total - totalUsed);
  const viewTotalUsed = Math.ceil(totalUsed * 10) / 10;
  const PERCENTAGE_DECIMAL = 100;
  const percentage = Math.ceil((totalUsed / total) * PERCENTAGE_DECIMAL);

  const chartData = useMemo(() => {
    const coloredData = data.map((item, index) => {
      const factor = data.length > 1 ? index / (data.length - 1) : 0;
      return {
        ...item,
        fill: interpolateColor(factor),
      };
    });
    return [{ fill: COLORS.REMAINING, name: '잔여', value: remaining }, ...coloredData];
  }, [data, remaining]);

  const renderCustomSector = (props: SectorProps) => {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props;
    const overlap = 4;

    return (
      <g>
        <Sector
          cornerRadius={20}
          cx={cx}
          cy={cy}
          endAngle={endAngle + overlap}
          fill={fill}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle - overlap}
          stroke={COLORS.STROKE}
          strokeWidth={2}
        />
      </g>
    );
  };

  return (
    <div className="w-full h-full min-w-37.5 min-h-37.5 aspect-square relative @container">
      <ResponsiveContainer height="100%" width="100%">
        <PieChart>
          <Pie
            cx="50%"
            cy="50%"
            data={chartData}
            dataKey="value"
            endAngle={90}
            innerRadius="70%"
            isAnimationActive={true}
            outerRadius="80%"
            shape={renderCustomSector}
            startAngle={-270}
            stroke="none"
          />
        </PieChart>
      </ResponsiveContainer>

      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <span className="text-gray-400 font-medium leading-none text-[6cqi]">총 사용</span>
        <div className="flex items-baseline my-[1%]">
          <span className="font-bold text-black text-[13cqi]">{viewTotalUsed}</span>
          <span className="font-semibold text-black ml-[0.5cqi] text-[8cqi]">GB</span>
        </div>
        <span className="text-gray-400 font-medium leading-none text-[6cqi] ">{percentage}%</span>
      </div>
    </div>
  );
};

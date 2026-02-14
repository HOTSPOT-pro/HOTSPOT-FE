'use client';
import { useState } from 'react';
import { Pie, PieChart, ResponsiveContainer, Sector } from 'recharts';

interface DonutChartProps {
  data: DonutChartContentProps[];
  innerRadius?: number;
  outerRadius?: number;
}
interface DonutChartContentProps {
  name: string;
  value: number;
  fill?: string;
}

//예비 색상
const DEFAULT_COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

export const DonutChart = ({ data, innerRadius = 60, outerRadius = 80 }: DonutChartProps) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const renderShape = (props: any) => {
    const { cx, cy, innerRadius: iR, outerRadius: oR, startAngle, endAngle, fill, index } = props;
    const isSelected = index === activeIndex;
    return (
      <g>
        <Sector
          cx={cx}
          cy={cy}
          endAngle={endAngle}
          fill={fill}
          innerRadius={iR}
          outerRadius={isSelected ? oR + 8 : oR}
          startAngle={startAngle}
          style={{ cursor: 'pointer', outline: 'none', transition: 'all 0.3s ease' }}
        />
      </g>
    );
  };

  const chartData = data.map((entry, index) => ({
    ...entry,
    fill: entry.fill || DEFAULT_COLORS[index % DEFAULT_COLORS.length],
  }));

  return (
    <div className="w-64 h-64">
      <ResponsiveContainer className="w-64 h-64">
        <PieChart className="w-64 h-46">
          <Pie
            cx="50%"
            cy="50%"
            data={chartData}
            dataKey="value"
            innerRadius={innerRadius}
            onMouseEnter={(_, index) => setActiveIndex(index)}
            onMouseLeave={() => setActiveIndex(null)}
            outerRadius={outerRadius}
            paddingAngle={5}
            shape={renderShape}
            stroke="none"
            tabIndex={activeIndex ?? undefined}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

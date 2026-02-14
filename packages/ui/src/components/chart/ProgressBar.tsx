'use client';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import { COLORS } from '../../lib/interpolateColor';

interface ProgressBarProps {
  label: string;
  value: number;
  total: number;
}

export const ProgressBar = ({ label, value, total }: ProgressBarProps) => {
  const chartData = [{ displayValue: value, name: label }];

  return (
    <div className="w-full h-3">
      <ResponsiveContainer className="w-full h-full">
        <BarChart
          data={chartData}
          layout="vertical"
          margin={{ bottom: 0, left: 0, right: 0, top: 0 }}
        >
          <XAxis domain={[0, total]} hide type="number" />
          <YAxis dataKey="name" hide type="category" />
          <Bar
            background={{ fill: COLORS.REMAINING, radius: 10 }}
            barSize={10}
            dataKey="displayValue"
            fill={COLORS.START}
            isAnimationActive={true}
            radius={[10, 10, 10, 10]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

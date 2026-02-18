'use client';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import { COLORS } from '../../../lib/interpolateColor';

interface ProgressBarProps {
  label: string;
  value: number;
  total: number;
  color: string;
}

const PROGRESS_BAR_STYLE = {
  RADIUS: 10,
  SIZE: 10,
} as const;

export const ProgressBar = ({ label, value, total, color }: ProgressBarProps) => {
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
            background={{ fill: COLORS.REMAINING, radius: PROGRESS_BAR_STYLE.RADIUS }}
            barSize={PROGRESS_BAR_STYLE.SIZE}
            dataKey="displayValue"
            fill={color}
            isAnimationActive={true}
            radius={PROGRESS_BAR_STYLE.RADIUS}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

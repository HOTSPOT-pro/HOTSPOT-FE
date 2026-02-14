'use client';

import { memo, useCallback, useMemo, useState } from 'react';
import { Pie, PieChart, ResponsiveContainer, Sector } from 'recharts';

export interface DonutChartDataProps {
  name: string;
  value: number;
  fill?: string;
}

export interface DonutChartProps {
  data: DonutChartDataProps[];
  total: number;
  totalUsed: number;
  remaining: number;
}
interface SectorProps {
  startAngle: number;
  endAngle: number;
  fill?: string;
  index?: number;
}

export const DonutChart = memo(({ data, total, totalUsed }: DonutChartProps) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const onMouseEnter = useCallback((_: any, index: number) => {
    setActiveIndex(index);
  }, []);

  const onMouseLeave = useCallback(() => {
    setActiveIndex(null);
  }, []);

  const displayContent = useMemo(() => {
    if (activeIndex !== null && data[activeIndex]) {
      const activeData = data[activeIndex];
      const ratio = total > 0 ? ((activeData.value / total) * 100).toFixed(1) : '0';
      return {
        isHovered: true,
        label: activeData.name,
        percent: `${ratio}%`,
        value: activeData.value.toFixed(1),
      };
    }
    const totalPercentage = total > 0 ? Math.ceil((totalUsed / total) * 100) : 0;
    return {
      isHovered: false,
      label: '총 사용',
      percent: `${totalPercentage}%`,
      value: totalUsed.toFixed(1),
    };
  }, [activeIndex, data, total, totalUsed]);

  const renderCustomSector = useCallback(
    (props: SectorProps) => {
      const { startAngle, endAngle, fill, index } = props;
      const overlap = 4;

      const isHovered = index === activeIndex;

      return (
        <g className="cursor-pointer outline-none">
          <Sector
            {...props}
            cornerRadius={20}
            endAngle={endAngle + overlap}
            fill={isHovered ? 'bg-black' : fill}
            startAngle={startAngle - overlap}
            strokeWidth={2}
          />
        </g>
      );
    },
    [activeIndex],
  );

  return (
    <div className="w-full h-full min-w-37.5 min-h-37.5 aspect-square relative @container">
      <ResponsiveContainer className="w-full h-full">
        <PieChart>
          <Pie
            cx="50%"
            cy="50%"
            data={data}
            dataKey="value"
            endAngle={90}
            innerRadius="70%"
            isAnimationActive={true}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            outerRadius="80%"
            shape={renderCustomSector}
            startAngle={-270}
            stroke="none"
          />
        </PieChart>
      </ResponsiveContainer>

      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none">
        <span className="text-gray-400 font-medium leading-none text-[6cqi]">
          {displayContent.label}
        </span>
        <div className="flex items-baseline my-[1%]">
          <span className="font-bold text-black text-[13cqi]">{displayContent.value}</span>
          <span className="font-semibold text-black text-[8cqi]">GB</span>
        </div>
        <span className={`font-medium leading-none text-[6cqi] transition-colors text-gray-400`}>
          {displayContent.percent}
        </span>
      </div>
    </div>
  );
});

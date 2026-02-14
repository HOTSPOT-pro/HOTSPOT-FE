import { cn } from '../../lib/cssMerge';
import { COLORS, interpolateColor } from '../../lib/interpolateColor';
import { DonutChart, type DonutChartProps } from './DonutChart';

interface DonutChartContainerProps extends DonutChartProps {
  type?: 'WEB' | 'MOBILE';
}

export const DonutChartContainer = ({ data, total, type = 'MOBILE' }: DonutChartContainerProps) => {
  const isWeb = type === 'WEB';
  const totalUsed = data.reduce((acc, cur) => acc + cur.value, 0);
  const remaining = Math.max(0, total - totalUsed);

  return (
    <div className={cn(`flex items-center gap-10 p-4`, isWeb ? 'flex-col' : 'flex-row')}>
      <DonutChart data={data} total={total} />

      <div
        className={`flex flex-wrap justify-center ${isWeb ? 'flex-row gap-3' : 'flex-col gap-3'}`}
      >
        {data.map((item, index) => (
          <div className="flex items-center px-3 py-1.5 rounded-full" key={item.name}>
            <div
              className="w-2.5 h-2.5 rounded-full mr-2"
              style={{
                backgroundColor: interpolateColor(data.length > 1 ? index / (data.length - 1) : 0),
              }}
            />
            <span className="text-sm font-medium text-gray-700 whitespace-nowrap">{item.name}</span>
            <span className="text-xs text-gray-400 ml-1.5 whitespace-nowrap">{item.value}GB</span>
          </div>
        ))}
        <div className="flex items-center px-3 py-1.5 rounded-full" key={'remaining'}>
          <div
            className="w-2.5 h-2.5 rounded-full mr-2"
            style={{
              backgroundColor: COLORS.REMAINING,
            }}
          />
          <span className="text-sm font-medium text-gray-700 whitespace-nowrap">잔여</span>
          <span className="text-xs text-gray-400 ml-1.5 whitespace-nowrap">{remaining}GB</span>
        </div>
      </div>
    </div>
  );
};

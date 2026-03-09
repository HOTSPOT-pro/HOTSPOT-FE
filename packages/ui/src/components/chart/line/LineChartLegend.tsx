/** biome-ignore-all lint/suspicious/noExplicitAny: <LegendProps에서 payload 못 불러옴> */
import { LegendItem } from '../legend/LegendItem';

export const LineChartLegend = (props: any) => {
  const { payload } = props;
  if (!payload) return null;

  const sortedPayload = [...payload].sort((a, b) => {
    if (a.value === '전체 사용량') return -1;
    if (b.value === '전체 사용량') return 1;
    return 0;
  });

  return (
    <div className="flex justify-center gap-5 mt-7.5">
      {sortedPayload.map((entry: any, index: number) => (
        <LegendItem
          className="justify-start"
          color={entry.color}
          key={`legend-${index}`}
          name={entry.value}
        />
      ))}
    </div>
  );
};

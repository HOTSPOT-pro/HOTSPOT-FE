/** biome-ignore-all lint/suspicious/noExplicitAny: <LegendProps에서 payload 못 불러옴> */
import { LegendItem } from '../legend/LegendItem';

export const LineChartLegend = (props: any) => {
  const { payload } = props;
  if (!payload) return null;

  return (
    <div className="flex justify-center gap-5 mt-7.5">
      {payload.map((entry: any, index: number) => (
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

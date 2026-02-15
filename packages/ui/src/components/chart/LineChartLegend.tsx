/** biome-ignore-all lint/suspicious/noExplicitAny: <explanation> */
export const LineChartLegend = (props: any) => {
  const { payload } = props;
  if (!payload) return null;

  return (
    <div className="flex justify-center gap-5 mt-7.5">
      {payload.map((entry: any, index: number) => (
        <div className="flex items-center gap-2" key={`legend-${index}`}>
          <div
            className="w-4 h-1 rounded-full"
            style={{
              backgroundColor: entry.color,
              height: '4px',
            }}
          />
          <span className="text-sm font-medium text-gray-600">{entry.value}</span>
        </div>
      ))}
    </div>
  );
};

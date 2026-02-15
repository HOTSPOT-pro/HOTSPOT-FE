// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const LineChartTooltip = ({ active, payload, unit, dateUnit }: any) => {
  if (active && payload && payload.length) {
    const { date, total, totalRatio, personal, personalRatio } = payload[0].payload;
    const hasPersonal = personal !== undefined && personal !== null;

    const formattedDate = `${date}${dateUnit}`;

    return (
      <div className="bg-white p-3 shadow-lg rounded-xl border border-gray-100 flex flex-col gap-1">
        <span className="text-xs text-gray-500 font-medium">{formattedDate} 전체 사용량</span>

        <div className="flex items-baseline gap-1 justify-between">
          <div className="flex items-baseline gap-1">
            <span className="text-lg font-bold text-black">{total}</span>
            <span className="text-xs font-semibold text-black">{unit}</span>
          </div>
          <span className="ml-2 text-purple-500 text-xs font-bold">{totalRatio}%</span>
        </div>

        {hasPersonal ? (
          <div className="pt-1 border-t border-dotted border-gray-100 flex flex-col">
            <span className="text-xs text-gray-500 font-medium">개별 사용량</span>
            <div className="flex items-baseline gap-1 justify-between">
              <div className="flex items-baseline gap-1">
                <span className="text-md font-semibold text-black">{personal}</span>
                <span className="text-xs font-semibold text-black">{unit}</span>
              </div>
              <span className="ml-2 text-purple-500 text-xs font-bold">{personalRatio}%</span>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
  return null;
};

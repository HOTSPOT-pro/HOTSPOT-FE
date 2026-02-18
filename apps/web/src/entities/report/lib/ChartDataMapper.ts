export const getChartData = (totalUsage: number[], personalUsage: number[]) => {
  return totalUsage.map((totalValue, index) => {
    const personalValue = personalUsage[index] || 0;

    return {
      date: String(index + 1),
      personal: personalValue,
      personalRatio: personalValue,
      total: totalValue,
      totalRatio: totalValue,
    };
  });
};

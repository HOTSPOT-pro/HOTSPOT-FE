export const getRoundedMax = (values: number[]): number => {
  if (!values.length) return 10;

  const max = Math.max(...values);
  const rounded = Math.ceil(max / 10) * 10;

  if (max > 0 && max % 10 === 0) {
    return max + 10;
  }

  return rounded === 0 ? 10 : rounded;
};

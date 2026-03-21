export const getRoundedMax = (values: number[]): number => {
  if (!values.length) return 10;

  const max = Math.max(...values);
  const rounded = Math.ceil(max / 10) * 10;

  if (max > 0 && max % 10 === 0) {
    return max + 10;
  }

  return rounded === 0 ? 10 : rounded;
};

export const getResponsiveRoundedMax = (values: number[]): number => {
  const finiteValues = values.filter(Number.isFinite);
  const max = Math.max(...finiteValues, 0);
  if (max === 0) return 1;
  const magnitude = 10 ** Math.floor(Math.log10(max));
  const bufferedMax = max * 1.2;
  let step: number;
  if (magnitude < 1) {
    step = magnitude / 2;
  } else if (magnitude < 10) {
    step = 1;
  } else {
    step = magnitude / 2;
  }
  return Math.ceil(bufferedMax / step) * step;
};

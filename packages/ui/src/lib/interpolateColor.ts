import { interpolateRgb } from 'd3-interpolate';

export const COLORS = {
  CARTESIAN: '#f0f0f0',
  END: '#d9c9ff',
  HOVER: '#141414',
  REMAINING: '#E5E7EB',
  SECONDARY: '#5BDD6A',
  START: '#4F46E5',
  STROKE: '#FFFFFF',
  TEXT_SECONDARY: '#777777',
} as const;

export const interpolateColor = (factor: number): string => {
  const colorInterpolator = interpolateRgb(COLORS.START, COLORS.END);
  return colorInterpolator(factor);
};

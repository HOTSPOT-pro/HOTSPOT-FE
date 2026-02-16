import { interpolateRgb } from 'd3-interpolate';
import { DESIGN_TOKENS } from '../styles/tokens';

const { graph } = DESIGN_TOKENS.colors;

export const COLORS = {
  END: graph.end,
  HOVER: graph.hover,
  REMAINING: graph.remaining,
  START: graph.start,
  STROKE: graph.stroke,
} as const;

export const interpolateColor = (factor: number): string => {
  const colorInterpolator = interpolateRgb(COLORS.START, COLORS.END);
  return colorInterpolator(factor);
};

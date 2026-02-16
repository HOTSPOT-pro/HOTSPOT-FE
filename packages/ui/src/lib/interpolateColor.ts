import { interpolateRgb } from 'd3-interpolate';
import { DESIGN_TOKENS } from '../styles/tokens';

const { graph } = DESIGN_TOKENS.colors;

export const COLORS = {
  CARTESIAN: graph.cartesian,
  END: graph.end,
  HOVER: graph.hover,
  REMAINING: graph.remaining,
  SECONDARY: graph.secondary,
  START: graph.start,
  STROKE: graph.stroke,
  TEXT_SECONDARY: graph.gray600,
} as const;

export const interpolateColor = (factor: number): string => {
  const colorInterpolator = interpolateRgb(COLORS.START, COLORS.END);
  return colorInterpolator(factor);
};

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
  // hex 파싱 로직 (이전과 동일)
  const hexToRgb = (hex: string) => ({
    b: parseInt(hex.slice(5, 7), 16),
    g: parseInt(hex.slice(3, 5), 16),
    r: parseInt(hex.slice(1, 3), 16),
  });

  const start = hexToRgb(COLORS.START);
  const end = hexToRgb(COLORS.END);

  const r = Math.round(start.r + factor * (end.r - start.r));
  const g = Math.round(start.g + factor * (end.g - start.g));
  const b = Math.round(start.b + factor * (end.b - start.b));

  const toHex = (c: number) => c.toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};

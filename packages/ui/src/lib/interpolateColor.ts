export const COLORS = {
  END: '#d9c9ff',
  REMAINING: '#E5E7EB',
  START: '#4F46E5',
  STROKE: '#FFFFFF',
} as const;

export const interpolateColor = (factor: number): string => {
  const r1 = parseInt(COLORS.START.slice(1, 3), 16);
  const g1 = parseInt(COLORS.START.slice(3, 5), 16);
  const b1 = parseInt(COLORS.START.slice(5, 7), 16);

  const r2 = parseInt(COLORS.END.slice(1, 3), 16);
  const g2 = parseInt(COLORS.END.slice(3, 5), 16);
  const b2 = parseInt(COLORS.END.slice(5, 7), 16);

  const r = Math.round(r1 + factor * (r2 - r1));
  const g = Math.round(g1 + factor * (g2 - g1));
  const b = Math.round(b1 + factor * (b2 - b1));

  const toHex = (c: number) => c.toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};

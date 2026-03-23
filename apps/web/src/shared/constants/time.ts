/** biome-ignore-all lint/style/noMagicNumbers: stale time 상수 모음 */
export const STALE_TIME = {
  INSTANT: 0,
  LONG: 1000 * 60 * 60,
  NORMAL: 1000 * 60 * 30,
  SHORT: 1000 * 60 * 5,
  STATIC: Infinity,
} as const;

export const GC_TIME = {
  LONG: 1000 * 60 * 120,
  NORMAL: 1000 * 60 * 60,
  SHORT: 1000 * 60 * 10,
  STATIC: Infinity,
};

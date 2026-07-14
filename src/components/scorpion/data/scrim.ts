export type ScrimEntry = {
  team: string;
  points: number;
  scrims: number;
  /** Optional rank change vs previous week: positive = up, negative = down, 0 = stable */
  change?: number;
};

/**
 * Central Scrim leaderboard data source.
 * Leave empty until the first official Scorpion scrim season starts.
 * When populated, ranking, stats and status auto-update.
 */
export const SCRIM_ENTRIES: ScrimEntry[] = [];

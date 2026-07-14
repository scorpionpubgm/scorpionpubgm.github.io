export type EventStatus = "Hamarosan" | "Jelentkezés nyitva" | "Élő" | "Lezárult";

export type ScorpionEvent = {
  type: string;
  title: string;
  date?: string;
  time?: string;
  description?: string;
  status: EventStatus;
  link?: string;
};

/**
 * Central Scorpion events data source.
 * Leave empty to keep the current "Hamarosan" placeholder state.
 */
export const EVENTS: ScorpionEvent[] = [];

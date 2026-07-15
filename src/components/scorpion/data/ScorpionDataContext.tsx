import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

/* ============= Types ============= */

export type TeamTier = "leader" | "leadership" | "admin" | "member";

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  tier: TeamTier;
  badge?: string;
  avatar?: string;
};

export type EventStatus = "Hamarosan" | "Jelentkezés nyitva" | "Élő" | "Lezárult";

export type ScorpionEvent = {
  id: string;
  type: string;
  title: string;
  date?: string;
  time?: string;
  description?: string;
  status: EventStatus;
  link?: string;
};

export type MediaKind = "youtube" | "tiktok" | "audio" | "other";

export type MediaItem = {
  id: string;
  kind: MediaKind;
  url: string;
  title?: string;
};

export type Sponsor = {
  id: string;
  name: string;
  logo: string;
  url?: string;
};

export type Application = {
  id: string;
  createdAt: string;
  playerName: string;
  age: string;
  activity: string;
  rank: string;
  playingSince: string;
  discord: string;
  reason: string;
};

/* ============= Built-in avatar presets ============= */

export const AVATAR_PRESETS: { label: string; url: string }[] = [
  {
    label: "PUBG Warrior",
    url: "https://unsplash.com",
  },
];

/* ============= Defaults ============= */

const DEFAULT_TEAM: TeamMember[] = [
  { id: "leader-1", name: "〆SCP×Zs99×", role: "Tulajdonos • Tulajdonos", tier: "leader", avatar: "https://unsplash.com" },

  { id: "lead-1", name: "〆SCPSwanJack", role: "Vezetőség • Vezetőség", tier: "leadership", avatar: "https://unsplash.com" },
  { id: "lead-2", name: "〆SCPCsernobil", role: "Vezetőség • Vezetőség", tier: "leadership", avatar: "https://unsplash.com" },
  { id: "lead-3", name: "〆SCPOlivér", role: "Vezetőség • Vezetőség", tier: "leadership", avatar: "https://unsplash.com" },

  { id: "adm-1", name: "〆SCPNoname", role: "Vezetőség • Vezetőség", tier: "admin", avatar: "https://unsplash.com" },
  { id: "adm-2", name: "〆SCPSword", role: "Admin • Admin • Trainer ...", tier: "admin", avatar: "https://unsplash.com" },
  { id: "adm-3", name: "〆SCPÆTØM×͜×", role: "Admin • Admin", tier: "admin", avatar: "https://unsplash.com" },
  { id: "adm-4", name: "〆SCPLaca", role: "Admin • Admin • Szerve...", tier: "admin", avatar: "https://unsplash.com" },
  { id: "adm-5", name: "〆SCP×ROYALK9×", role: "Admin • Admin", tier: "admin", avatar: "https://unsplash.com" },

  { id: "mem-1", name: "〆SCPEszkobar", role: "Tag • Scorpion Tag", tier: "member", avatar: "https://unsplash.com" },
  { id: "mem-2", name: "〆SCPBandy", role: "Scorpion Tag", tier: "member", avatar: "https://unsplash.com" },
  { id: "mem-3", name: "〆SCPMark", role: "Scorpion Tag", tier: "member", avatar: "https://unsplash.com" },
  { id: "mem-4", name: "〆SCPENDLucifer", role: "Scorpion Tag", tier: "member", avatar: "https://unsplash.com" },
  { id: "mem-5", name: "〆SCP『CinThia』", role: "Scorpion Tag", tier: "member", avatar: "https://unsplash.com" },
  { id: "mem-6", name: "〆SCPHUNLucifer", role: "Scorpion Tag", tier: "member", avatar: "https://unsplash.com" },
  { id: "mem-7", name: "〆SCP《MT》DOBY", role: "Scorpion Tag", tier: "member", avatar: "https://unsplash.com" },
];

const DEFAULT_EVENTS: ScorpionEvent[] = [];
const DEFAULT_MEDIA: MediaItem[] = [];
const DEFAULT_SPONSORS: Sponsor[] = [];
const DEFAULT_APPLICATIONS: Application[] = [];

/* ============= Context ============= */

type Ctx = {
  team: TeamMember[];
  events: ScorpionEvent[];
  media: MediaItem[];
  sponsors: Sponsor[];
  applications: Application[];

  addTeam: (m: Omit<TeamMember, "id">) => void;
  removeTeam: (id: string) => void;

  addEvent: (e: Omit<ScorpionEvent, "id">) => void;
  removeEvent: (id: string) => void;

  addMedia: (m: Omit<MediaItem, "id" | "kind"> & { kind?: MediaKind }) => void;
  removeMedia: (id: string) => void;

  addSponsor: (s: Omit<Sponsor, "id">) => void;
  removeSponsor: (id: string) => void;

  addApplication: (a: Omit<Application, "id" | "createdAt">) => void;
  removeApplication: (id: string) => void;
};

const ScorpionDataCtx = createContext<Ctx | null>(null);

const KEYS = {
  team: "scorpion.team.v1_final_style", // Ismét új kulcs, hogy biztosan kitörölje a színes karaktereket
  events: "scorpion.events.v1",
  media: "scorpion.media.v1",
  sponsors: "scorpion.sponsors.v1",
  applications: "scorpion.applications.v1",
};

function loadLS<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    return parsed as T;
  } catch {
    return fallback;
  }
}

function saveLS<T>(key: string, value: T) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* ignore */
  }
}

function uid(prefix: string) {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}

export function detectMediaKind(url: string): MediaKind {
  const u = url.toLowerCase();
  if (u.includes("youtube.com") || u.includes("youtu.be")) return "youtube";
  if (u.includes("tiktok.com")) return "tiktok";
  if (/\.(mp3|wav|ogg|m4a)(\?.*)?$/.test(u)) return "audio";
  return "other";
}

export function ScorpionDataProvider({ children }: { children: ReactNode }) {
  const [hydrated, setHydrated] = useState(false);
  const [team, setTeam] = useState<TeamMember[]>(DEFAULT_TEAM);
  const [events, setEvents] = useState<ScorpionEvent[]>(DEFAULT_EVENTS);
  const [media, setMedia] = useState<MediaItem[]>(DEFAULT_MEDIA);
  const [sponsors, setSponsors] = useState<Sponsor[]>(DEFAULT_SPONSORS);
  const [applications, setApplications] = useState<Application[]>(DEFAULT_APPLICATIONS);

  // Hydrate from localStorage after mount (avoids SSR mismatch)
  useEffect(() => {
    setTeam(loadLS(KEYS.team, DEFAULT_TEAM));
    setEvents(loadLS(KEYS.events, DEFAULT_EVENTS));
    setMedia(loadLS(KEYS.media, DEFAULT_MEDIA));
    setSponsors(loadLS(KEYS.sponsors, DEFAULT_SPONSORS));
    setApplications(loadLS(KEYS.applications, DEFAULT_APPLICATIONS));
    setHydrated(true);
  }, []);

  useEffect(() => { if (hydrated) saveLS(KEYS.team, team); }, [team, hydrated]);
  useEffect(() => { if (hydrated) saveLS(KEYS.events, events); }, [events, hydrated]);
  useEffect(() => { if (hydrated) saveLS(KEYS.media, media); }, [media, hydrated]);
  useEffect(() => { if (hydrated) saveLS(KEYS.sponsors, sponsors); }, [sponsors, hydrated]);
  useEffect(() => { if (hydrated) saveLS(KEYS.applications, applications); }, [applications, hydrated]);

  const value: Ctx = {
    team, events, media, sponsors, applications,

    addTeam: (m) => setTeam((t) => [...t, { ...m, id: uid("mem") }]),
    removeTeam: (id) => setTeam((t) => t.filter((x) => x.id !== id)),

    addEvent: (e) => setEvents((es) => [...es, { ...e, id: uid("evt") }]),
    removeEvent: (id) => setEvents((es) => es.filter((x) => x.id !== id)),

    addMedia: (m) =>
      setMedia((ms) => [
        ...ms,
        { title: m.title, url: m.url, kind: m.kind ?? detectMediaKind(m.url), id: uid("med") },
      ]),
    removeMedia: (id) => setMedia((ms) => ms.filter((x) => x.id !== id)),

    addSponsor: (s) => setSponsors((ss) => [...ss, { ...s, id: uid("spn") }]),
    removeSponsor: (id) => setSponsors((ss) => ss.filter((x) => x.id !== id)),

    addApplication: (a) =>
      setApplications((as) => [
        { ...a, id: uid("app"), createdAt: new Date().toISOString() },
        ...as,
      ]),
    removeApplication: (id) => setApplications((as) => as.filter((x) => x.id !== id)),
  };

  return <ScorpionDataCtx.Provider value={value}>{children}</ScorpionDataCtx.Provider>;
}

export function useScorpionData() {
  const ctx = useContext(ScorpionDataCtx);
  if (!ctx) throw new Error("useScorpionData must be used within ScorpionDataProvider");
  return ctx;
}

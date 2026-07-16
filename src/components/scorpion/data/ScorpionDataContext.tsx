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
  pubgId?: string;

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
  { id: "leader-1", name: "〆SCP×Zs99×", role: "Tulajdonos • Tulajdonos", tier: "leader", pubgId: "5123456789", avatar: "/file_00000000834c71f4bb75170d271bd4e4.png" },

  { id: "lead-1", name: "〆SCP•SwanJack•", role: "Vezetőség • Vezetőség", tier: "leadership", pubgId: "5123456790", avatar: "/file_00000000820871f48aa3d33f7a0125a7.png" },
  { id: "lead-2", name: "〆SCP•Csernobil•", role: "Vezetőség • Vezetőség", tier: "leadership", pubgId: "5123456791", avatar: "/file_0000000053e871f4b9c1f7a6718ec8ec.png" },
  { id: "lead-3", name: "〆SCP•Olivér•", role: "Vezetőség • Vezetőség", tier: "leadership", pubgId: "5123456792", avatar: "/file_00000000c3b071f4b0d6ff51e4ed01c6.png" },

  { id: "adm-1", name: "〆SCP•Noname•", role: "Admin • Vezetőség", tier: "admin", pubgId: "5123456793", avatar: "/file_00000000b5f071f49e2e77a5185dbc7c.png" },
  { id: "adm-2", name: "〆SCP•Sword•", role: "Admin • Admin • Trainer ...", tier: "admin", pubgId: "5123456794", avatar: "/file_00000000f9d4724681677cca65a96a9e.png" },
  { id: "adm-3", name: "〆SCP•ÆTØM×͜×•", role: "Admin • Admin", tier: "admin", pubgId: "5123456795", avatar: "/file_00000000e32471f48b49fb998724ea85.png" },
  { id: "adm-4", name: "〆SCP•Laca•", role: "Admin • Admin • Szerve...", tier: "admin", pubgId: "5123456796", avatar: "/file_00000000ec7471f496c855cae3d16b89.png" },
  { id: "adm-5", name: "〆SCP×ROYALK9×", role: "Admin • Admin", tier: "admin", pubgId: "5123456797", avatar: "/file_00000000d6e47246b8f2b38ddff25a1c.png" },

  { id: "mem-1", name: "〆SCP•Eszkobar•", role: "Tag • Tag • Scorpion Tag", tier: "member", pubgId: "5123456798", avatar: "/file_000000009a547246bf185f93e1441dc2.png" },
  { id: "mem-2", name: "〆SCP•Bandy•", role: "Scorpion Tag", tier: "member", pubgId: "5123456799", avatar: "/file_000000005cc072468007fee3b1f9ed0d.png" },
  { id: "mem-3", name: "〆SCP•Mark•", role: "Scorpion Tag", tier: "member", pubgId: "5123456800", avatar: "/file_0000000070a87246b0e50a8b926329df.png" },
  { id: "mem-4", name: "〆SCP•ENDLucifer•", role: "Scorpion Tag", tier: "member", pubgId: "5123456801", avatar: "/file_00000000a17472468097338596561a7b.png" },
  { id: "mem-5", name: "〆SCP『CinThia』", role: "Scorpion Tag", tier: "member", pubgId: "5123456802", avatar: "/file_00000000d3307246bd6e9d4d8e79c51f.png" },
  { id: "mem-7", name: "〆SCP《MT》DOBY", role: "Scorpion Tag", tier: "member", pubgId: "5123456803", avatar: "/file_0000000030a472468f2b44a5b1305fed.png" },
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
  team: "scorpion.team.v1_all_user_custom_png_images_v4_perfect_names", // Új kulcs a pontos nevek miatti tiszta frissítéshez
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
